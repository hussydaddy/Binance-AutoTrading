import axios from 'axios';

async function errorWebhook(usdtBalance) {
    
    await axios.post(
        "https://discord.com/api/webhooks/1134102897085386793/6F0tecZ9zUOfFg7LcTi6KGujWkSnb4jwO_eTIfTKFlcvetBh_8Y6AHjiTteXp78kVjHL",
        {
          username: "Binance Bot",
          avatar_url:
            "https://cdn.discordapp.com/attachments/1123534126566346772/1123537339105427456/bot.png",
          embeds: [
            {
              title: "🛑 Error",
              
              description: `${usdtBalance}`,
              color: 3535616,
          
              
    
              footer: {
                text: "I am a chinal boy",
                icon_url:
                  "https://discord.com/channels/896704667952758834/896704667952758838/1134105136260714556",
              },
            },
          ],
        },
    
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
}


export default errorWebhook;