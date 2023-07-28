import axios from 'axios';

async function errorBalanceWebhook(errorstr) {

  await axios.post(
    "https://discord.com/api/webhooks/1134102897085386793/6F0tecZ9zUOfFg7LcTi6KGujWkSnb4jwO_eTIfTKFlcvetBh_8Y6AHjiTteXp78kVjHL",
    {
      username: "Hussy Bot",
      avatar_url:
        "https://media.discordapp.net/attachments/896704667952758838/1134105136051015770/cb.jpg?width=604&height=605",
      embeds: [
        {
          title: "🔴 Error",

          description: `${errorstr}`,
          color: 3535616,
      
          footer: {
            text: "I am a chinal boy",
            icon_url:
              "https://media.discordapp.net/attachments/896704667952758838/1134105136051015770/cb.jpg?width=604&height=605",
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


export default errorBalanceWebhook;