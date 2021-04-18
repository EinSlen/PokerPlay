const Discord = require('discord.js');
const package = require('../package.json');
const fs = require('fs');

var bank = require('../data/bank.json');
var lang = require('../data/langue.json');

//SYSTEM FUNCTION MONEY ADD
function addMoney(ammount, member, author, check) {
    if(!check){
        if(!author.hasPermission('ADMINISTRATOR')) return;
    }
    if(isNaN(ammount)) return;
    var newBank = bank;
    if(!newBank[member.id]){
        newBank[member.id] = {
            money: 100
        };
    }
    newBank[member.id].money += Number(ammount);
    fs.writeFileSync("./data/bank.json", JSON.stringify(newBank, null, 2), function(error){
        if(error) console.log(error);
    });
}

//SYSTEM FUNCTION MONEY REMOVE
function removeMoney(ammount, member, author, check) {
    if(!check){
        if(!author.hasPermission('ADMINISTRATOR')) return;
    }
    if(isNaN(ammount)) return;
    var newBank = bank;
    if(!newBank[member.id]){
        newBank[member.id] = {
            money: 100
        };
    }
    newBank[member.id].money -= Number(ammount);
    fs.writeFileSync("./data/bank.json", JSON.stringify(newBank, null, 2), function(error){
        if(error) console.log(error);
    });
}

module.exports.run = async (client, message) => {
    
    let messageArray = message.content.split(' ');
    var newBank = bank;
    var newLang = lang;

  if(newLang[message.guild.id] == undefined) return message.channel.send(`:flag_fr: Le serveur n'est pas setup !\n:flag_au: The server is not setup !\n>Command ${package.prefix}setup`);
    
    if(!messageArray[1] || !messageArray[2] || !message.mentions.members.first()) {
        if(newLang[message.guild.id].Language == package.langue[0]){
            message.channel.send({
                embed: {
                    color: 2552550,
                    title: '➤ Donnation',
                    description: `⛔ Commande invalide, il faut respecter les arguments.\n\n⤿ *Exemple de commande* : \n\`\`\`✪ ${package.prefix}donate Ami#0001 [MONTANT]\`\`\``,
                    thumbnail: {
                        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcgHhtrXo0rk4Xw6wTHB68xo6aWrMSXbLWuw&usqp=CAU'
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
                    color: 2552550,
                    title: '➤ Donnation',
                    description: `⛔ Invalid command, the arguments must be respected. \n\n⤿ * Example of command *: \n \`\`\`✪ $ {package.prefix}donate Friend#0001 [AMMONT]\`\`\``,
                    thumbnail: {
                        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcgHhtrXo0rk4Xw6wTHB68xo6aWrMSXbLWuw&usqp=CAU'
                    },
                    timestamp: new Date(),
                    footer: {
                    icon_url: client.user.avatarURL,
                    text: "© Made by " + package.author
                    }   
                }
            });
        }
        return;
    }
    var newBank = bank
    addMoney(Number(0), message.author, message.member, true);

    if(newBank[message.author.id].money >= messageArray[2]){

        addMoney(Number(messageArray[2]), message.mentions.members.first(), message.member, true);
        removeMoney(Number(messageArray[2]), message.author, message.member, true);

        if(newLang[message.guild.id].Language == package.langue[0]) {
            message.channel.send({
                embed: {
                    color: '967dea',
                    title: '➤ Donnation',
                    description: `Le joueur **${message.author}** vient de donner *${Number(messageArray[2])}€* à **${message.mentions.members.first().toString()}.**\n\n⤿ Voici le capital de ses joueurs :\n➝ ${message.author} à un capital de *${newBank[message.author.id].money}€.*\n➝ ${message.mentions.members.first().toString()} à un capital de *${newBank[message.mentions.members.first().id].money}€.*`,
                    thumbnail: {
                        url: 'https://www.shipping-lab.com/wp-content/uploads/donation-coin.png',
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
                    color: '967dea',
                    title: '➤ Donnation',
                    description: `Player **${message.author}** has just given * ${Number(messageArray[2])}€ * to ** ${message.mentions.members.first().toString ()}. ** \ n \ n⤿ Here is the capital of its players: \n➝ ${message.author} with a capital of * ${newBank[message.author.id].money} €. * \n➝ ${message.mentions.members.first().toString()} with a capital of * ${newBank[message.mentions.members.first().id].money}€. *`,
                    thumbnail: {
                        url: 'https://www.shipping-lab.com/wp-content/uploads/donation-coin.png',
                    },
                    timestamp: new Date(),
                    footer: {
                        icon_url: client.user.avatarURL,
                        text: "© Made by " + package.author
                    }
                }
            });
        }
        return;
    } else {
        if(newLang[message.guild.id].Language == package.langue[0]) {
            message.channel.send({
                embed: {
                    color: 'ff0000',
                    title: '➤ Erreur',
                    description: `**Désolé celà n'a pas fonctionné, vous n'avez pas assez d'argent !**\n\n⤿ _Vous pouvez vérifier votre argent grâce à la commande_ : __${package.prefix}compte__`,
                    thumbnail: {
                        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcgHhtrXo0rk4Xw6wTHB68xo6aWrMSXbLWuw&usqp=CAU'
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
                    color: 'ff0000',
                    title: '➤ Error',
                    description: `**Sorry it didn't work, you don't have enough money! ** \n \n⤿ _You can verify your money through the command_: __ ${package.prefix}compte__`,
                    thumbnail: {
                        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcgHhtrXo0rk4Xw6wTHB68xo6aWrMSXbLWuw&usqp=CAU'
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
}

module.exports.help = {
    name: 'donate'
}