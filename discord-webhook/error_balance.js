import axios from 'axios';

async function errorBalanceWebhook(errorstr) {
  await axios.post(
    'https://discord.com/api/webhooks/1134102897085386793/6F0tecZ9zUOfFg7LcTi6KGujWkSnb4jwO_eTIfTKFlcvetBh_8Y6AHjiTteXp78kVjHL',
    {
      username: 'Alfiera Notifications',
      avatar_url:
        'https://cdn.discordapp.com/attachments/1135281238475812976/1135281673060237482/4.png?width=604&height=605',
      embeds: [
        {
          title: '🔴 Error',

          description: `${errorstr}`,
          color: 3535616,

          footer: {
            text: 'Powered by ViraLabs',
            icon_url:
              'https://cdn.discordapp.com/attachments/1135281238475812976/1135281673597112462/3.png',
          },
        },
      ],
    },

    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}

export default errorBalanceWebhook;
