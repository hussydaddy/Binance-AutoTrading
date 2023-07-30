## Binance Auto-Trading Bot #

<p>This is an auto-trading bot that integrates with Binance's API to execute trades automatically based on incoming webhooks. The bot listens for incoming trade alerts, closes existing positions if necessary, and places new trades accordingly.</p>
<br>

### Features #

* Automatic trade execution on Binance futures market based on incoming webhooks.
* Close existing positions before placing new trades to manage risk.
* Uses Discord webhooks for real-time notifications on position closures and order placements.
* Handles timestamp synchronization with Binance server time to avoid timestamp errors.
* Securely stores Binance API credentials using environment variables.
* Displays the current USDT balance of the Binance futures account.
<br>

### Requirements #

* Node.js (tested with version 14.0.0 and above)
* npm (Node Package Manager)
<br>

### Installation #

1. Clone the repository:

```
git clone https://github.com/your-username/binance-auto-trading-bot.git
cd binance-auto-trading-bot
```

2. Install dependencies:

```
npm install
```

3. Set up environment variables:

* Create a **.env** file in the project's root directory.
* Add your Binance API key and secret to the **.env** file:

```
API_KEY=your_binance_api_key
API_SECRET=your_binance_api_secret
HTTP_FUTURES=https://fapi.binance.com
```
Replace **your_binance_api_key** and **your_binance_api_secret** with your actual Binance API key and secret.

4. Start the bot:

```
npm start
```
<br>

### Usage #

1. Ensure the Binance API credentials are correctly set in the **'.env'** file.
2. Run the bot using **'npm start'**.
3. The bot will listen for incoming webhooks on the specified port (**3000** by default).
4. When a webhook is received, the bot will execute the trade based on the alert data.
5. The bot will send Discord webhooks for position closures and order placements.
6. Monitor the console for logs and notifications about executed trades and current USDT balance.
<br>

### Contributing #

<p> Contributions are welcome! If you find a bug or have an enhancement in mind, feel free to open an issue or submit a pull request. </p>
<br>

### License #
This project is licensed under the MIT License - see the LICENSE file for details.
<br>

### Disclaimer #

* Use this bot at your own risk. Trading involves financial risks, and the bot's performance is not guaranteed.
* The authors and maintainers of this project are not responsible for any financial losses incurred by using this bot.
<br>

### Acknowledgments #
This project uses the [Binance API](https://binance-docs.github.io/apidocs/spot/en/) for executing trades on the Binance exchange.
