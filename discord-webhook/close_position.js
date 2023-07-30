import axios from 'axios';

async function closingPosition(dSymbol, dSide, dQuantity) {
  await axios.post(
    'https://discord.com/api/webhooks/1134102789744762921/h6835JUzq6ZWDOTorvPGazj3aivj2ep1plpZNwLx1opACJmH5WFXkSt2qCE7P1v8_qVl',
    {
      username: 'Alfiera Notifications',
      avatar_url:
        'https://cdn.discordapp.com/attachments/1135281238475812976/1135281673060237482/4.png?width=604&height=605',
      embeds: [
        {
          title: 'Closing Position',
          description: `Closing Existing Position`,
          color: 3535616,
          fields: [
            {
              name: 'Symbol',
              value: `${dSymbol}`,
              inline: false,
            },
            {
              name: 'Side',
              value: `${dSide}`,
              inline: false,
            },
            {
              name: 'Quantity',
              value: `${dQuantity}`, // Corrected variable name to dQuantity
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

export default closingPosition;
