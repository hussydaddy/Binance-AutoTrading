import express from 'express';
import bodyParser from 'body-parser';
import Binance from 'binance-api-node';
import axios from 'axios'; // Import axios library
import dotenv from 'dotenv'; // Import dotenv library to load environment variables

import currentBalance from './discord-webhook/current_balance.js';
import futureOrderPlaced from './discord-webhook/future_placed.js';
import errorBalanceWebhook from './discord-webhook/error_balance.js';
import closingPosition from './discord-webhook/close_position.js';

const port = 3000;
const app = express();

app.use(bodyParser.json());

// Load environment variables from .env file
dotenv.config();

const client = Binance.default({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
  httpFutures: process.env.HTTP_FUTURES === 'true', // Convert string to boolean
});

// Function to get the Binance server time
async function getServerTime() {
  try {
    const response = await axios.get('https://api.binance.com/api/v3/time');
    return response.data.serverTime;
  } catch (error) {
    console.log('Error getting server time:', error.message);
    throw error;
  }
}

app.get('/', async (req, res) => {
  console.log('root route working');
  res.send('root route working');
});

app.post('/webhook', async (req, res) => {
  const alert = req.body;
  console.log('----RECEIVING order----');
  console.log('alert', alert);
  if (!alert.symbol) {
    errorBalanceWebhook('Receiving Orders');
    return res.json({ message: 'ok' });
  }

  try {
    // Close existing positions
    const positions = await client.futuresPositionRisk();
    for (const position of positions) {
      if (
        position.symbol === alert.symbol &&
        parseFloat(position.positionAmt) !== 0.0
      ) {
        console.log(position);
        const closePayload = {
          symbol: alert.symbol,
          side: parseFloat(position.positionAmt) > 0 ? 'SELL' : 'BUY',
          type: 'MARKET',
          quantity: Math.abs(parseFloat(position.positionAmt)), // Convert positionAmt to a decimal
          positionSide: position.positionSide,
        };
        await client.futuresOrder(closePayload);
        console.log('----Closing existing position----');
        console.log('Symbol:', alert.symbol);
        console.log('Side:', closePayload.side);
        console.log('Quantity:', closePayload.quantity);
        const dSymbol = alert.symbol;
        const dSide = closePayload.side;
        const dQuantity = closePayload.quantity;
        closingPosition(dSymbol, dSide, dQuantity);
      }
    }

    // Get Binance server time
    const serverTime = await getServerTime();

    // Calculate the correct timestamp for the order
    const adjustedTimestamp = serverTime - 1000; // Adjusted by 1000 milliseconds (1 second)

    // Place new order with the correct timestamp
    const payload = {
      symbol: alert.symbol,
      side: alert.side.toUpperCase(),
      type: 'MARKET',
      quantity: parseFloat(alert.quantity), // Convert to floating-point decimal
      timestamp: adjustedTimestamp,
      positionSide: alert.positionside.toUpperCase(),
    };

    const order = await client.futuresOrder(payload);
    console.log('----FUTURES order executed----');
    const balance = await client.futuresAccountBalance();
    const usdtBalance = balance.find((b) => b.asset === 'USDT');
    console.log('USDT balance:', usdtBalance);
    futureOrderPlaced(usdtBalance);
    return res.json({ message: 'ok' });
  } catch (e) {
    console.log('error', e);
    errorBalanceWebhook('Error Placing Order or Closing Position');
    return res.json({ message: e });
  }
});

app.listen(port, async () => {
  console.log('Server listening on port ' + port);
  try {
    const balance = await client.futuresAccountBalance();
    const usdtBalance = balance.find((b) => b.asset === 'BUSD');
    console.log('----CURRENT USDT BALANCE----');
    console.log(usdtBalance);
    currentBalance(usdtBalance);
  } catch (e) {
    console.log('Error retrieving USDT balance:', e);
    errorBalanceWebhook('Error retrieving USDT balance');
  }
});
