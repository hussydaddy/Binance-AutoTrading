import axios from 'axios';

async function futureOrderPlaced({
  accountAlias,
  asset,
  balance,
  crossWalletBalance,
  crossUnPnl,
  availableBalance,
  maxWithdrawAmount,
  marginAvailable,
}) {
  await axios.post(
    'https://discord.com/api/webhooks/1134102789744762921/h6835JUzq6ZWDOTorvPGazj3aivj2ep1plpZNwLx1opACJmH5WFXkSt2qCE7P1v8_qVl',
    {
      username: 'Alfiera Notifications',
      avatar_url:
        'https://cdn.discordapp.com/attachments/1135281238475812976/1135281673060237482/4.png?width=604&height=605',
      embeds: [
        {
          title: 'Futures Order Placed',

          description: `Balance details After order Placement`,
          color: 3535616,
          fields: [
            {
              name: 'accountAlias',
              value: `${accountAlias}`,
              inline: false,
            },
            {
              name: 'asset',
              value: `${asset}`,
              inline: false,
            },
            {
              name: 'balance',
              value: `${balance}`,
              inline: false,
            },
            {
              name: 'crossWalletBalance',
              value: `${crossWalletBalance}`,
              inline: false,
            },
            {
              name: 'crossUnPnl',
              value: `${crossUnPnl}`,
              inline: false,
            },
            {
              name: 'availableBalance',
              value: `${availableBalance}`,
              inline: false,
            },
            {
              name: 'maxWithdrawAmount',
              value: `${maxWithdrawAmount}`,
              inline: false,
            },
            {
              name: 'marginAvailable',
              value: `${marginAvailable}`,
              inline: false,
            },
          ],

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

export default futureOrderPlaced;
