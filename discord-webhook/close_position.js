import axios from 'axios';

async function closingPosition(dSymbol, dSide, dQuantity) {

    await axios.post(
        "https://discord.com/api/webhooks/1134102789744762921/h6835JUzq6ZWDOTorvPGazj3aivj2ep1plpZNwLx1opACJmH5WFXkSt2qCE7P1v8_qVl",
        {
            username: "Hussy Bot",
            avatar_url:
        "https://media.discordapp.net/attachments/896704667952758838/1134105136051015770/cb.jpg?width=604&height=605",
            embeds: [
                {
                    title: "Closing Position",

                    description: `Closing Existing Position`,
                    color: 3535616,

                    fields: [
                        {
                            name: "Symbol",
                            value: `${dSymbol}`,
                            inline: false,
                        },
                        {
                            name: "Side",
                            value: `${dSide}`,
                            inline: false,
                        },
                        {
                            name: "Quantity",
                            value: `${dSidQuantityde}`,
                            inline: false,
                        },
                    ],

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


export default closingPosition;