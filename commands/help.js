const Discord = require('discord.js');
const package = require('../package.json');

var lang = require('../data/langue.json');


module.exports.run = async (client, message) => {
    var newLang = lang;

    if(newLang[message.guild.id] == undefined) return message.channel.send(`:flag_fr: Le serveur n'est pas setup !\n:flag_au: The server is not setup !\n\nCommand: ${package.prefix}setup [language]`);

    if(newLang[message.guild.id].Language == package.langue[0]) {
        message.channel.send({
            embed: {
                color: 3447043,
                title: `➤ HELP`,
                description: `🧵 > Pour plus d'information contactez via le [support](https://discord.gg/UcJkEPWA7y).\n⤷ Mon prefix est \`${package.prefix}\`\n➠ __Soutenir ${client.user.username}__ : [Voter](https://top.gg/bot/724926316859621427/vote) | [déposer un avis](https://top.gg/bot/724926316859621427)`,
                fields: [{
                    name: `➡️ Utilité (4)`,
                    value: `🏹 ${package.prefix}help\n⤷ Utilisation : *Permet de savoir toutes les commandes.*\n\n🏹 ${package.prefix}setup\n⤷ Utilisation : *Permet de setup la langue*\n⤷ Exemple : ${package.prefix}setup [langue]\n\n🏹 ${package.prefix}info\n⤷ Utilisation : *Permet de savoir les informations.*\n\n🏹 ${package.prefix}invite\n⤷ Utilisation : *Toutes les informations d'invitation.*`,
                    inline: true
                },
                {
                    name: `➡️ Jeux (6)`,
                    value: `🎲 ${package.prefix}roulette\n⤷ Utilisation : *Jeux de roulette adepte*\n⤷ Exemple : ${package.prefix}roulette [couleur] [montant]\n\n🎲 ${package.prefix}coinflip\n⤷ Utilisation : *Jeux de flip avec une pièce*\n⤷ Exemple : ${package.prefix}coinflip [face] [montant]\n\n🎲 ${package.prefix}table\n⤷ Utilisation : *Jeux de doublance sur une table*\n⤷ Exemple : ${package.prefix}table [doubler] [montant]\n\n🎲 ${package.prefix}rps\n⤷ Utilisation : *Jeux de pierre, papier et ciseaux*\n⤷ Exemple : ${package.prefix}rps [objet]\n\n🎲 ${package.prefix}slots\n⤷ Utilisation : *Jeux de machine à sous*\n\n🎲 ${package.prefix}number\n⤷ Utilisation : *Trouvez le nombre défendu*\n⤷ Exemple : ${package.prefix}number [nombre]`,
                    inline: true
                },
                {
                    name: `➡️ Économie (5)`,
                    value: `💴 ${package.prefix}account\n⤷ Utilisation : *Pour regarder l'état de votre compte*\n\n💴 ${package.prefix}shop\n⤷ Utilisation : *Pour acheter des multiplicateurs.*\n⤷ Exemple : ${package.prefix}shop buy\n\n💴 ${package.prefix}work\n⤷ Utilisation : *Permet de travailler toutes les 15 minutes et de gagner de l'argent*\n\n💴 ${package.prefix}daily\n⤷ Utilisation : *À l'abordageeee ! toutes les 24h vous obtenez de l'argent*\n\n💴 ${package.prefix}donate\n⤷ Utilisation : *Permet de donner de l'argent à qui vous voulez.*\n⤷ Exemple : ${package.prefix}donate Ami#0001 [montant]`,
                    inline: true
                }],
                thumbnail: {
                    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnpFDmd_-Naf6egY857lZ233rXOq_EZHc0jQ&usqp=CAU',
                },
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.avatarURL,
                    text: "© Made by " + package.author
                }
            }
        });
    }
    if(newLang[message.guild.id].Language == package.langue[1]) {
        message.channel.send({
            embed: {
                color: 3447043,
                title: `➤ HELP`,
                description: `🧵 > For more information contact via [support](https://discord.gg/UcJkEPWA7y). \n⤷ My prefix is ​​\`${package.prefix}\`\n➠ __Support ${client.user.username}__: [Vote](https://top.gg/bot/724926316859621427/vote) | [file a review](https://top.gg/bot/724926316859621427)`,
                fields: [{
                    name: `➡️ Utility (3)`,
                    value: `🏹 ${package.prefix}help \n⤷ Use: *Allows you to know all the commands. *\n\n🏹 ${package.prefix}setup \n⤷ Use: *To setup the language* \n⤷ Example: ${package.prefix}setup [language] \n\n🏹 ${package.prefix}info\n⤷ Usage: *Used to find out the information.* \n\n🏹 ${package.prefix}invite\n⤷ Usage: *All invitation information.*`,
                    inline: true
                },
                {
                    name: `➡️ Games (6)`,
                    value: `🎲 ${package.prefix}roulette \n⤷ Usage: *Adept roulette games*\n⤷ Example: ${package.prefix}roulette [color] [amount] \n\n🎲 ${package.prefix}coinflip \n⤷ Usage: *Flip games with a coin* \n⤷ Example: ${package.prefix}coinflip [face] [amount] \n\n🎲 ${package.prefix}table \n⤷ Usage: *Games of doubling on a table* \n⤷ Example: ${package.prefix}table [double] [amount] \n\n🎲 ${package.prefix}rps \n⤷ Usage: *Rock, paper and scissors games* \n⤷ Example: ${package.prefix}rps [object] \n\n🎲 ${package.prefix}slots \n⤷ Usage: *Slot machine games*\n\n🎲 ${package.prefix}number\n⤷ Usage: *Find the forbidden number* \n⤷ Example: ${package.prefix}number [number]`,
                    inline: true
                },
                {
                    name: `➡️ Économy (5)`,
                    value: `💴 ${package.prefix}account\n⤷ Usage: *To view your account status* \n\n💴 ${package.prefix}shop \n⤷ Usage: *To buy multipliers.* \n⤷ Example: ${package.prefix}shop buy \n\n💴 ${package.prefix}work\n⤷ Usage: *Allows to work every 15 minutes and earn money*\n\n💴 ${package.prefix}daily \n⤷ Usage: *Boarding! every 24h you get money*\n\n💴 ${package.prefix}donate \n⤷ Use: *Allows you to give money to whomever you want.* \n⤷ Example: ${package.prefix}donate Friend#0001 [amount]`,
                    inline: true
                }],
                thumbnail: {
                    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnpFDmd_-Naf6egY857lZ233rXOq_EZHc0jQ&usqp=CAU',
                },
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.avatarURL,
                    text: "© Made by " + package.author
                }
            }
        });
    }
}
module.exports.help = {
    name: 'help'
}