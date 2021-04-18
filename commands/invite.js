const Discord = require('discord.js');
const package = require('../package.json');

module.exports.run = async (client, message) => {
    message.channel.send({
        embed: {
            color: 'ffffff',
            title: '➤ INVITE',
            fields: [{
                name: '💌 Invite',
                value: '[[Invite Bot]](https://discordapp.com/oauth2/authorize?client_id=724926316859621427&scope=bot&permissions=8)',
                inline: true
            },
            {
                name: '🤝 Server support',
                value: '[[Support server]](https://discord.gg/UcJkEPWA7y)',
                inline: true
            },
            {
                name: '🗳️ Vote',
                value: '[[Vote]](https://top.gg/bot/724926316859621427/vote)',
                inline: true
            },
            {
                name: '❤️ Web',
                value: '[[Site]](https://pokerplay.fr)',
                inline: true
            }],
            thumbnail: {
                url: 'https://cdn.iconscout.com/icon/free/png-256/invite-friend-1817172-1538040.png',
            },
            timestamp: new Date(),
            footer: {
                icon_url: client.user.avatarURL,
                text: "© Made by " + package.author
            }
        }
    });
}

module.exports.help = {
    name: 'invite'
}