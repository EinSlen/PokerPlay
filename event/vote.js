const package = require('../package.json');
const DBL = require('dblapi.js');
const Discord = require('discord.js');

const dbl = new DBL(`${package.tokenapi}`, { webhookPort: package.webhookport, webhookAuth: `${package.tokenapi}` });

module.exports.run = async (client) => {
    
    dbl.webhook.on('ready', hook => {
        console.log(`Webhook démarré à : http://${hook.hostname}:${hook.port}${hook.path}`);
    });  

    dbl.webhook.on('vote', vote => {
        client.users.fetch(vote.user).then(userr => {
                dbl.getUser(vote.user).then(user => {
                    dbl.getBot("724926316859621427").then(bot => {
                    const embedVote = new Discord.MessageEmbed()
                    .setColor("RED")
                    .setTitle("Top.gg | Discord Bot List")
                    .setDescription(`:arrow_up: • \`${user.username}#${user.discriminator}\` a voté pour \`POKERPLAY\`, Merci infiniment ! (+ 5000$)\n\n__Total ce mois-ci__ : **${bot.monthlyPoints} votes**\n\n[Votez vous aussi !](https://top.gg/bot/724926316859621427/vote)`)
                    .setFooter(user.username, userr.displayAvatarURL())
                    .setTimestamp()
                    client.channels.cache.get("736165989204361236").send(embedVote).then(r => {r.react('❤️')});
                });
            })
            .catch(error => console.log(error))
        });
    });
}

module.exports.function = {
    name: 'vote'
}
