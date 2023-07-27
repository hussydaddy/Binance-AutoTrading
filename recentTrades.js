import axios from 'axios';

async function fetchRecentTrades(symbol, limit = 10) {
  try {
    const response = await axios.get(
      `https://fapi.binance.com/fapi/v1/trades?symbol=${symbol}&limit=${limit}`
    );
    const recentTrades = response.data;
    console.log('Recent Trades:', recentTrades);
  } catch (error) {
    console.log('Error fetching recent trades:', error);
  }
}

// Usage example
const symbol = 'XRPUSDT';

fetchRecentTrades(symbol);
