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

// Receive Order from Webhook
app.post('/webhook', async (req, res) => {
  const alert = req.body;
  console.log('----RECEIVING order----');
  console.log('alert', alert);
  if (!alert.symbol) {
    return res.json({ message: 'ok' });
  }

  try {
    // Fetch balance before placing order
    const balanceBefore = await client.futuresAccountBalance();
    const usdtBalanceBefore = balanceBefore.find((b) => b.asset === 'USDT');
    console.log('USDT balance before trade:', usdtBalanceBefore);

    // Place new order
    const payload = {
      symbol: alert.symbol,
      side: alert.side,
      type: 'MARKET',
      quantity: alert.quantity,
      timestamp: alert.time,
      positionSide: alert.positionside,
    };
    const order = await client.futuresOrder(payload);
    console.log('----FUTURES order executed----');

    // Balance after the Order is Executed
    const balanceAfter = await client.futuresAccountBalance();
    const usdtBalanceAfter = balanceAfter.find((b) => b.asset === 'USDT');
    console.log('USDT balance after trade:', usdtBalanceAfter);

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
