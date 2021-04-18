const Discord = require('discord.js');
const package = require('../package.json');
const fs = require('fs');

//VARIABLE SUP
var bank = require('../data/bank.json');
var cash = require('../data/cash.json');
var lang = require('../data/langue.json');

let cooldown = new Set();
let cdseconds = 3600 / 4;
let moneywork = 250;


//SYSTEM FUNCTION MONEY ADD
function addMoney(ammount, member, author) {
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

//SYSTEM CASH ADD
function addcash(ammount, member, author){
    if(isNaN(ammount)) return;
    var newcash = cash;
    if(!newcash[member.id]){
        newcash[member.id] = {
            cash: 0
        };
    }
    newcash[member.id].cash += Number(ammount);
    fs.writeFileSync("./data/cash.json", JSON.stringify(newcash, null, 2), function(error){
        if(error) console.log(error);
    })
}

module.exports.run = async (client, message) => {
    var newcash = cash;
    var newLang = lang;
    var newBank = bank;

    if(newLang[message.guild.id] == undefined) return message.channel.send(`:flag_fr: Le serveur n'est pas setup !\n:flag_au: The server is not setup !\n>Command ${package.prefix}setup`);

    addMoney(Number(0), message.author, message.member);
    addcash(Number(0), message.author, message.member);

    if(cooldown.has(message.author.id)){
        if(newLang[message.guild.id].Language == package.langue[0]) {
            message.channel.send({
                embed: {
                    color: "dce33f",
                    title: '➤ ARGENT',
                    description: `🔴 Vous n'avez pas la permissions de refaire cette commande !\nRéessayer dans 15 minutes !`,
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
                    color: "dce33f",
                    title: '➤ MONEY',
                    description: `🔴 You do not have permission to redo this command! \nTry again in 15 minutes!`,
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
     var newcash = cash;
     addcash(Number(0), message.author, message.member);
    var newBank = bank
    addMoney(Number(0), message.author, message.member);
    if(newLang[message.guild.id].Language == package.langue[0]) {
        message.channel.send({
            embed: {
                color: "dce33f",
                title: '➤ ARGENT',
                description: `> Vous venez de travailler dur comme fer pour avoir cette argent !\n⤿ Revenez dans 15 minutes pour refaire la commande.\n\n ➣ VOS RÉCOMPENSES :\n>💳 Vous avez gagné(e) : _${Number(moneywork)}€_\n>💰 Votre compte s'estime à _${newBank[message.author.id].money}€_`,
                thumbnail: {
                    url: 'https://www.neurosatis.fr/images/icones/argent_billets_pieces_logo.png',
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
                color: "dce33f",
                title: '➤ MONEY',
                description: `> You just worked hard to get that money! \n⤿ Come back in 15 minutes to redo the order. \n\n➣ YOUR REWARDS: \n> You won: _ ${Number(moneywork)}€_\n> 💰 Your account is valued at _ ${newBank[message.author.id].money}€_`,
                thumbnail: {
                    url: 'https://www.neurosatis.fr/images/icones/argent_billets_pieces_logo.png',
                },
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.avatarURL,
                    text: "© Made by " + package.author
                }
            }
        });
    }
    var newcash = cash;
     addcash(Number(0), message.author, message.member);
    var newBank = bank
    addMoney(Number(0), message.author, message.member);
    if(newcash[message.author.id].cash == 1){
        message.channel.send({
            embed: {
                color: "fac30b",
                title: '➤ Multiplication',
                description: `>💵 : **${Number(moneywork / 3)}€**\n⤷ : _${newcash[message.author.id].cash} / 3x_`,
                thumbnail: {
                    url: 'https://previews.123rf.com/images/stockphotoatinat/stockphotoatinat1705/stockphotoatinat170500011/77243525-multiplier-ic%C3%B4ne-de-multiplication.jpg',
                },
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.avatarURL,
                    text: "© Made by " + package.author
                }
            }
        });
        addMoney(Number(moneywork / 3), message.author, message.member, true);
    }
    if(newcash[message.author.id].cash == 2){
        message.channel.send({
            embed: {
                color: "fac30b",
                title: '➤ Multiplication',
                description: `>💵 : **${Number(moneywork / 2)}€**\n⤷ : _${newcash[message.author.id].cash} / 3x_`,
                thumbnail: {
                    url: 'https://previews.123rf.com/images/stockphotoatinat/stockphotoatinat1705/stockphotoatinat170500011/77243525-multiplier-ic%C3%B4ne-de-multiplication.jpg',
                },
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.avatarURL,
                    text: "© Made by " + package.author
                }
            }
        });
        addMoney(Number(moneywork / 2), message.author, message.member, true);
    }
    if(newcash[message.author.id].cash == 3){
        message.channel.send({
            embed: {
                color: "fac30b",
                title: '➤ Multiplication',
                description: `>💵 : **${Number(moneywork)}€**\n⤷ : _${newcash[message.author.id].cash} / 3x_`,
                thumbnail: {
                    url: 'https://previews.123rf.com/images/stockphotoatinat/stockphotoatinat1705/stockphotoatinat170500011/77243525-multiplier-ic%C3%B4ne-de-multiplication.jpg',
                },
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.avatarURL,
                    text: "© Made by " + package.author
                }
            }
        });
        addMoney(Number(moneywork), message.author, message.member, true);
    }
    addMoney(Number(moneywork), message.author, message.member, true);
    cooldown.add(message.author.id)
    setTimeout(() => {
        cooldown.delete(message.author.id)
    }, cdseconds * 1000)
}

module.exports.help = {
    name: 'work'
}