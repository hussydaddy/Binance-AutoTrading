import axios from 'axios';

async function successWebhook(usdtBalance) {
    
    await axios.post(
        "https://discord.com/api/webhooks/1134102789744762921/h6835JUzq6ZWDOTorvPGazj3aivj2ep1plpZNwLx1opACJmH5WFXkSt2qCE7P1v8_qVl",
        {
          username: "Binance Bot",
          avatar_url:
            "https://cdn.discordapp.com/attachments/1123534126566346772/1123537339105427456/bot.png",
          embeds: [
            {
              title: "Success",
              
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


export default  successWebhook;