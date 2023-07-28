import express from 'express';
import bodyParser from 'body-parser';
import Binance from 'binance-api-node';
import config from './config.js';
import currentBalance from './discord-webhook/current_balance.js'
import futureOrderPlaced from './discord-webhook/future_placed.js'
import errorBalanceWebhook from './discord-webhook/error_balance.js';
import closingPosition from './discord-webhook/close_position.js';



const port = 5002;
const app = express();

app.use(bodyParser.json());

const client = Binance.default({
  apiKey: config.apiKey,
  apiSecret: config.apiSecret,
  httpFutures: config.httpFutures, // For prod
});

app.get('/', async (req, res) => {
  console.log('root route working');
  res.send('root route working');
})

app.post('/webhook', async (req, res) => {
  const alert = req.body;
  console.log('----RECEIVING order----');
  console.log('alert', alert);
  if (!alert.symbol) {
    errorBalanceWebhook('Reciving Orders');
    return res.json({ message: 'ok' });
    
  }

  try {
    // Close existing positions
    const positions = await client.futuresPositionRisk();
    for (const position of positions) {
      if (position.symbol === alert.symbol && position.positionAmt !== '0.0') {
        console.log(position);
        const closePayload = {
          symbol: alert.symbol,
          side: parseFloat(position.positionAmt) > 0 ? 'SELL' : 'BUY',
          type: 'MARKET',
          quantity: Math.abs(parseFloat(position.positionAmt)),
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
        closingPosition(dSymbol,dSide,dQuantity);
      }
    }

    // Place new order
    const payload = {
      symbol: alert.symbol,
      side: alert.side.toUpperCase(),
      type: 'MARKET',
      quantity: alert.quantity,
      timestamp: alert.time,
      positionSide: alert.positionside.toUpperCase(),
    };

    const order = await client.futuresOrder(payload);
    console.log('----FUTURES order executed----');
    const balance = await client.futuresAccountBalance();
    const usdtBalance = balance.find((b) => b.asset === 'USDT');
    console.log('USDT balance:', usdtBalance);
    futureOrderPlaced(usdtBalance)
    return res.json({ message: 'ok' });
  } catch (e) {
    console.log('error', e);
    errorBalanceWebhook('Error Placing Order or Closing Position');
    return res.json({ message: e });
  }
});

app.listen(port, async () => {
  console.log('Server listening on port' + port);
  try {
    const balance = await client.futuresAccountBalance();
    const usdtBalance = balance.find((b) => b.asset === 'USDT');
    console.log('----CURRENT USDT BALANCE----');
    console.log(usdtBalance);
    currentBalance(usdtBalance);
  } catch (e) {
    console.log('Error retrieving USDT balance:', e);
    errorBalanceWebhook('Error retrieving USDT balance');
  }
});
