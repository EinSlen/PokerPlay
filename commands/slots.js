const Discord = require('discord.js')
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
    var newBank = bank;
    var newcash = cash;
    var newLang = lang;

   if(newLang[message.guild.id] == undefined) return message.channel.send(`:flag_fr: Le serveur n'est pas setup !\n:flag_au: The server is not setup !\n>Command ${package.prefix}setup`);
    
    addMoney(Number(0), message.author, message.member, true);
    addcash(Number(0), message.author, message.member, true);

    if(newBank[message.author.id].money >= 100) {
        let slots = ["🍎", "🍊", "🍓"];
        let result1 = Math.floor((Math.random() * slots.length));
        let result2 = Math.floor((Math.random() * slots.length));
        let result3 = Math.floor((Math.random() * slots.length));

        let resultX = Math.floor((Math.random() * slots.length));
        let resultY = Math.floor((Math.random() * slots.length));
        let resultZ = Math.floor((Math.random() * slots.length));

        if(result1 === result2 && result1 === result3) {
            addMoney(Number(500), message.author, message.member, true);
            if(newLang[message.guild.id].Language == package.langue[0]) {
                message.channel.send({
                    embed: {
                        color: 'f7f41b',
                        title: '➤ Slots',
                        description: `🎰 Le joueur ${message.author} vient de **GAGNÉ** à la machine à sous.\n⤷ Voici le résultat de la Machine : >**\n${slots[resultX]} | ${slots[resultY]} | ${slots[resultZ]}\n➣ ${slots[result1]} | ${slots[result2]} | ${slots[result3]}\n> ${slots[resultZ]} | ${slots[resultY]} | ${slots[resultX]}\n\n**➣ VOS RÉCOMPENSES :\n>💳 Vous avez gagné(e) : _500€._\n>💰 Votre compte s'estime à _${newBank[message.author.id].money}€_`,
                        thumbnail: {
                            url: 'https://roulette.be/wp-content/uploads/2017/09/slot-machine-GR.jpg'
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
                        color: 'f7f41b',
                        title: '➤ Slots',
                        description: `🎰 Player ${message.author} has just **WON** at the slot machine. \n⤷ Here is the result of the Machine: > ** \n${slots[resultX]} | ${slots[resultY]} | ${slots[resultZ]} \n➣ ${slots[result1]} | ${slots[result2]} | ${slots[result3]} \n> ${slots[resultZ]} | ${slots[resultY]} | ${slots[resultX]} \n\n** ➣ YOUR REWARDS: \n> 💳 You won: _500€._ \n> 💰 Your account is valued at _ ${newBank[message.author .id].money}€_`,
                        thumbnail: {
                            url: 'https://roulette.be/wp-content/uploads/2017/09/slot-machine-GR.jpg'
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
                        description: `>💵 : **${Number(500 / 3)}€**\n⤷ : _${newcash[message.author.id].cash} / 3x_`,
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
                addMoney(Number(500 / 3), message.author, message.member, true);
            }
            if(newcash[message.author.id].cash == 2){
                message.channel.send({
                    embed: {
                        color: "fac30b",
                        title: '➤ Multiplication',
                        description: `>💵 : **${Number(500 / 2)}€**\n⤷ : _${newcash[message.author.id].cash} / 3x_`,
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
                addMoney(Number(500 / 2), message.author, message.member, true);
            }
            if(newcash[message.author.id].cash == 3){
                message.channel.send({
                    embed: {
                        color: "fac30b",
                        title: '➤ Multiplicateur',
                        description: `>💵 : **${Number(500)}€**\n⤷ : _${newcash[message.author.id].cash} / 3x_`,
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
                addMoney(Number(500), message.author, message.member, true);
            }
        } else {
            removeMoney(Number(100), message.author, message.member, true);
            if(newLang[message.guild.id].Language == package.langue[0]) {
                message.channel.send({
                    embed: {
                        color: 'ff0555',
                        title: '➤ Slots',
                        description: `🎰 Le joueur ${message.author} vient de **PERDRE** à la machine à sous.\n⤷ Voici le résultat de la Machine :  > ** \n${slots[resultX]} | ${slots[resultY]} | ${slots[resultZ]}\n➣ ${slots[result1]} | ${slots[result2]} | ${slots[result3]}\n> ${slots[resultZ]} | ${slots[resultY]} | ${slots[resultX]}\n\n**➣ VOS RÉCOMPENSES :\n>💳 Vous avez perdu(e) : _100€._\n>💰 Votre compte s'estime à _${newBank[message.author.id].money}€_`,
                        thumbnail: {
                            url: 'https://roulette.be/wp-content/uploads/2017/09/slot-machine-GR.jpg'
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
                        color: 'ff0555',
                        title: '➤ Slots',
                        description: `🎰 Player ${message.author} has just **LOSE** at the slot machine. \n⤷ Here is the result of the Machine : > ** \n ${slots[resultX]} | ${slots[resultY]} | ${slots[resultZ]} \n➣ ${slots[result1]} | ${slots[result2]} | ${slots[result3]} \n> ${slots[resultZ]} | ${slots[resultY]} | ${slots[resultX]} \n\n**➣ YOUR REWARDS: \n> 💳 You lost: _100€._ \n> 💰 Your account is valued at _ ${newBank[message.author.id].money}€_`,
                        thumbnail: {
                            url: 'https://roulette.be/wp-content/uploads/2017/09/slot-machine-GR.jpg'
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
    name: 'slots'
}