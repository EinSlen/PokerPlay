const Discord = require('discord.js');
const package = require('../package.json');
const fs = require('fs');

var bank = require('../data/bank.json');
var cash = require('../data/cash.json');
var lang = require('../data/langue.json');

//SYSTEM FUNCTION MONEY ADD
function addMoney(ammount, member, author, check) {
    if (!check) {
        if (!author.hasPermission('ADMINISTRATOR')) return;
    }
    if (isNaN(ammount)) return;
    var newBank = bank;
    if (!newBank[member.id]) {
        newBank[member.id] = {
            money: 100
        };
    }
    newBank[member.id].money += Number(ammount);
    fs.writeFileSync("./data/bank.json", JSON.stringify(newBank, null, 2), function (error) {
        if (error) console.log(error);
    });
}

//SYSTEM CASH ADD
function addcash(ammount, member, author, check) {
    if (!check) {
        if (!author.hasPermission('ADMINISTRATOR')) return;
    }
    if (isNaN(ammount)) return;
    var newcash = cash;
    if (!newcash[member.id]) {
        newcash[member.id] = {
            cash: 0
        };
    }
    newcash[member.id].cash += Number(ammount);
    fs.writeFileSync("./data/cash.json", JSON.stringify(newcash, null, 2), function (error) {
        if (error) console.log(error);
    })
}

module.exports.run = async (client, message) => {

    let messageArray = message.content.split(' ');

    var newBank = bank;
    var newcash = cash;
    var newLang = lang;

 if(newLang[message.guild.id] == undefined) return message.channel.send(`:flag_fr: Le serveur n'est pas setup !\n:flag_au: The server is not setup !\n>Command ${package.prefix}setup`);
    
    if (!messageArray[1]) {
        addMoney(Number(0), message.author, message.member, true);
        addcash(Number(0), message.author, message.member, true);
        if(newLang[message.guild.id].Language == package.langue[0]) {
            message.channel.send({
                embed: {
                    color: 'c604f6',
                    title: '➤ Compte Bancaire',
                    description: `Vous consultez le compte de ${message.author}.\n(_Numéro client : ${message.author.id}_)\n\n💰 . __Espèce :__ ${newBank[message.author.id].money}€\n\n💎 . __Multiplication :__ ${newcash[message.author.id].cash} / 3x`,
                    thumbnail: {
                        url: 'https://blog.joypixels.com/content/images/2019/12/money_with_wings.gif',
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
                    color: 'c604f6',
                    title: '➤ Bank account',
                    description: `You are viewing the account of ${message.author}. \n (_Customer number: ${message.author.id}_) \n\n💰. __Species: __ ${newBank[message.author.id].money}€ \n\n💎. __Multiplication: __ ${newcash[message.author.id].cash} / 3x`,
                    thumbnail: {
                        url: 'https://blog.joypixels.com/content/images/2019/12/money_with_wings.gif',
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
    if (message.mentions.members.first()) {
        addMoney(Number(0), message.mentions.members.first(), message.member, true);
        addcash(Number(0), message.mentions.members.first(), message.member, true);
        if(newLang[message.guild.id].Language == package.langue[0]) {
            message.channel.send({
                embed: {
                    color: 'c604f6',
                    title: '➤ Compte Bancaire',
                    description: `Vous consultez le compte de ${message.mentions.members.first().toString()}.\n(_Numéro client : ${message.mentions.members.first().id}_)\n\n💰 . __Espèce :__ ${newBank[message.mentions.members.first().id].money}€\n\n💎 . __Multiplication :__ ${newcash[message.mentions.members.first().id].cash} / 3x`,
                    thumbnail: {
                        url: 'https://blog.joypixels.com/content/images/2019/12/money_with_wings.gif',
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
                    color: 'c604f6',
                    title: '➤ Bank account',
                    description: `You are viewing the account of ${message.mentions.members.first().toString()}. \n (_Customer number: ${message.mentions.members.first().id} _) \n\n💰. __Species: __ ${newBank[message.mentions.members.first().id].money}€ \n\n💎. __Multiplication: __ ${newcash[message.mentions.members.first().id].cash} / 3x`,
                    thumbnail: {
                        url: 'https://blog.joypixels.com/content/images/2019/12/money_with_wings.gif',
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
}

module.exports.help = {
    name: 'account'
}