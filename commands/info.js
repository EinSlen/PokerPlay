const Discord = require('discord.js');
const package = require('../package.json');

//VARIABLE
let emojiNotPermission = "🤖",
    emojiwin = "🧠",
    emojihavePermission = "🌐",
    emojiperm = "📌",
    emojidata = "👾",
    emojiguild = "🥂",
    emojimember = "👋";

module.exports.run = async (client, message) => {

    message.channel.send({
        embed: {
            color: 'd68d17',
            title: emojiwin + ' - Server...',
            description: `\nReessayer, quelque chose s'est mal passée\n\`Commande: ${package.prefix}info\``,
            timestamp: new Date(),
            footer: {
                icon_url: client.user.avatarURL,
                text: "© Made by " + package.author
            }
        }
    }).then(m => {
        let ping = m.createdTimestamp - message.createdTimestamp
        let database = Math.floor((Math.random() + 1) * 5)
        if (message.author.id == '534435587076259861' || message.author.id == '271693708171280384') {
            perm = 'Developper'
        } else {
            perm = 'User'
        }
        if(ping <= 1000) {
            hebergeping = '🟠';
        }
        if(ping <= 500) {
            hebergeping = '🟢';
        }
        if(ping >= 1000) {
            hebergeping = '🔴';
        }
        
        m.edit({embed: {
            color: 'd68d17',
            title: emojiwin + ' - Server Info...',
            description: `\nPermission: \`${perm}\` ${emojiperm}\nLatence bot: \`${ping}\`ms ${emojiNotPermission}\nLatence API: \`${Math.round(client.ws.ping)}\`ms ${emojihavePermission}\nDataBase: \`${database}\`ms ${emojidata}\nServers: \`${client.guilds.cache.size}\` ${emojiguild}\nMembers: \`${client.users.cache.size}\` ${emojimember}\nLatence héberger: ${hebergeping}`,
            timestamp: new Date(),
            footer: {
                icon_url: client.user.avatarURL,
                text: "© Made by " + package.author
            }
        }}).then(message => {
             message.react('🇵');
    		 message.react('🇮');
    		 message.react('🇳');
    		 message.react('🇬');
        })
    });
}

module.exports.help = {
    name: 'info'
}