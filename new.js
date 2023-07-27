import express from 'express';
import bodyParser from 'body-parser';
import Binance from 'binance-api-node';
import config from './config.js';

const app = express();
app.use(bodyParser.json());

const client = Binance.default({
  apiKey: config.apiKey,
  apiSecret: config.apiSecret,
  httpFutures: config.httpFutures, // For prod
});

app.post('/webhook', async (req, res) => {
  const alert = req.body;
  console.log('----RECEIVING order----');
  console.log('alert', alert);
  if (!alert.symbol) {
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
    return res.json({ message: 'ok' });
  } catch (e) {
    console.log('error', e);
    return res.json({ message: 'ok' });
  }
});

app.listen(3000, async () => {
  console.log('Server listening on port 3000.');
  try {
    const balance = await client.futuresAccountBalance();
    const usdtBalance = balance.find((b) => b.asset === 'USDT');
    console.log('----CURRENT USDT BALANCE----');
    console.log(usdtBalance);
  } catch (e) {
    console.log('Error retrieving USDT balance:', e);
  }
});
