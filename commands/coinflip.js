const Discord = require('discord.js');
const package = require('../package.json');
const fs = require('fs');

var bank = require('../data/bank.json');
var cash = require('../data/cash.json');
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
    newBank[member.id].money += Math.floor(Number(ammount));
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
    newBank[member.id].money -= Math.floor(Number(ammount));
    fs.writeFileSync("./data/bank.json", JSON.stringify(newBank, null, 2), function(error){
        if(error) console.log(error);
    });
}

//SYSTEM CASH ADD
function addcash(ammount, member, author, check){
    if(!check){
        if(!author.hasPermission('ADMINISTRATOR')) return;
    }
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

    let messageArray = message.content.split(' ');
    var slides = ["face", "pile"];
    var newBank = bank;
    var newcash = cash;
    var newLang = lang;

if(newLang[message.guild.id] == undefined) return message.channel.send(`:flag_fr: Le serveur n'est pas setup !\n:flag_au: The server is not setup !\n>Command ${package.prefix}setup`);
    
    if(!messageArray[1] || !messageArray[2] || !slides.includes((messageArray[1]).toLowerCase())) {
        if(newLang[message.guild.id].Language == package.langue[0]) {
            message.channel.send({
                embed: {
                    color: 2552550,
                    title: '➤ Coinflip',
                    description: `⛔ Commande invalide, il faut respecter les arguments.\n\n⤿ *Exemple de commande* : \n\`\`\`✪ ${package.prefix}coinflip pile [MONTANT]\n✪ ${package.prefix}coinflip face [MONTANT]\`\`\``,
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
                    title: '➤ Coinflip',
                    description: `⛔ Invalid command, you must respect the arguments. \n\n⤿ * Example of command *: \n \`\`\`✪ ${package.prefix}coinflip pile [AMOUNT] \n✪ ${package.prefix}coinflip face [AMOUNT] \`\`\``,
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
    addMoney(Number(0), message.author, message.member, true);
    if(newBank[message.author.id].money >= messageArray[2]){
        var side = -1;  
        var otherUserSide = -1;
        if(messageArray[1].toLowerCase() == "pile"){
            side = 0;
        } else {
            side = 1;
        }
        if(side == "face") {
            otherUserSide = 1;
        } else {
            otherUserSide = 0;
        }
        var mumber = Math.floor(Math.random() * 2);
        if(side == mumber) {
            addMoney(Number(messageArray[2]), message.author, message.member, true);
            addcash(Number(0), message.author, message.member, true);
            if(newLang[message.guild.id].Language == package.langue[0]) {
                message.channel.send({
                    embed: {
                        color: '55ff00',
                        title: '➤ Coinflip',
                        description: `> Le joueur ${message.author} vient de **GAGNÉ** la partie.\n⤷ La pièce était **${messageArray[1].toUpperCase()}.**\n\n➣ VOS RÉCOMPENSES :\n>💳 Vous avez gagné(e) : _${Number(messageArray[2])}€_\n>💰 Votre compte s'estime à _${newBank[message.author.id].money}€_`,
                        thumbnail: {
                            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPY4MwrP8DZKPs5qEOgMyDHZQlaIgHoPWU4A&usqp=CAU"
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
                        color: '55ff00',
                        title: '➤ Coinflip',
                        description: `> Player ${message.author} has just** WON **the game. \n⤷ The coin was ** ${messageArray[1].toUpperCase()}. ** \n\n➣ YOUR REWARDS: \n> 💳 You won: _ ${Number(messageArray[2])}€ _\n> 💰 Your account is valued at _ ${newBank[message.author.id].money}€_`,
                        thumbnail: {
                            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPY4MwrP8DZKPs5qEOgMyDHZQlaIgHoPWU4A&usqp=CAU"
                        },
                        timestamp: new Date(),
                        footer: {
                        icon_url: client.user.avatarURL,
                        text: "© Made by " + package.author
                        }  
                    }
                });
            }
            if(newcash[message.author.id].cash == 1){
                message.channel.send({
                    embed: {
                        color: "fac30b",
                        title: '➤ Multiplication',
                        description: `>💵 **${Number(messageArray[2] / 3)}€**\n⤷ : _${newcash[message.author.id].cash} / 3x_`,
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
                addMoney(Number(messageArray[2] / 3), message.author, message.member, true);
            }
            if(newcash[message.author.id].cash == 2){
                message.channel.send({
                    embed: {
                        color: "fac30b",
                        title: '➤ Multiplication',
                        description: `>💵 **${Number(messageArray[2] / 2)}€**\n⤷ : _${newcash[message.author.id].cash} / 3x_`,
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
                addMoney(Number(messageArray[2] / 2), message.author, message.member, true);
            }
            if(newcash[message.author.id].cash == 3){
                message.channel.send({
                    embed: {
                        color: "fac30b",
                        title: '➤ Multiplicateur',
                        description: `>💵 **${Number(messageArray[2])}€**\n⤷ : _${newcash[message.author.id].cash} / 3x_`,
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
                addMoney(Number(messageArray[2]), message.author, message.member, true);
            }
        } else {
            removeMoney(Number(messageArray[2]), message.author, message.member, true);
            if(newLang[message.guild.id].Language == package.langue[0]) {
                message.channel.send({
                    embed: {
                        color: "f95a27",
                        title: '➤ Coinflip',
                        description: `Le joueur ${message.author} vient de **PERDRE** la partie.\nLa pièce n'était pas **${messageArray[1].toUpperCase()}.**\n\n➣ VOS RÉCOMPENSES :\n>💳 Vous avez perdu(e) : _${Number(messageArray[2])}€_\n>💰 Votre compte s'estime à _${newBank[message.author.id].money}€_`,
                        thumbnail: {
                            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPY4MwrP8DZKPs5qEOgMyDHZQlaIgHoPWU4A&usqp=CAU',
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
                        color: "f95a27",
                        title: '➤ Coinflip',
                        description: `Player ${message.author} has just** LOSE **the game. \nThe coin was not ** ${messageArray[1].toUpperCase()}. ** \n \n➣ YOUR REWARDS: \n> 💳 You have lost: _ ${Number(messageArray[2])} € _ \n> 💰 Your account is valued at _ ${newBank[message.author.id].money}€ _`,
                        thumbnail: {
                            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPY4MwrP8DZKPs5qEOgMyDHZQlaIgHoPWU4A&usqp=CAU',
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
    name: 'coinflip'
}