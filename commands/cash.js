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

    let messageArray = message.content.split(' ');

    var newBank = bank;
    var newcash = cash;
    var newLang = lang;

    if(newLang[message.guild.id] == undefined) return message.channel.send(`:flag_fr: Le serveur n'est pas setup !\n:flag_au: The server is not setup !\n>Command ${package.prefix}setup`);
    
    if(!messageArray[1]){
        addcash(Number(0), message.author, message.member, true);
        if(newLang[message.guild.id].Language == package.langue[0]) {
            message.channel.send({
                embed:{
                    color: '96f615',
                    title: '➤ Shop',
                    description: `_Votre multiplicateur d'argent est à ${newcash[message.author.id].cash} / 3x_\n\n**> Qu'es-ce qu'un Multiplicateur ?**\n⇢ Le multiplicateur sert à multiplier l'argent obtenu en jouant !\n⇢ Multiplicateur Niveau **1** : 1/3 de votre mise.\n⇢ Multiplicateur Niveau **2** : 2/3 de votre mise.\n⇢ Multiplicateur Niveau **3** : le double de votre mise. \n\n**> Vous voulez acheter un Multiplicateur ?**\n↳ __Commande__ : **${package.prefix}shop buy**`,
                    thumbnail: {
                        url: 'https://frebourg.es/wp-content/uploads/2021/01/shop.png'
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
                embed:{
                    color: '96f615',
                    title: '➤ Shop',
                    description: `_Your money multiplier is at ${newcash[message.author.id].cash} / 3x_ \n\n **> What is a Multiplier? ** \n⇢ The multiplier is used to multiply your money obtained by playing! \n⇢ Level multiplier ** 1 **: 1/3 of your stake. \n⇢ Level multiplier ** 2 **: 2/3 of your stake. \n⇢ Level multiplier ** 3 **: double your stake. \n\n **> Want to buy a Multiplier? ** \n↳ __Order__: ** ${package.prefix}shop buy **`,
                    thumbnail: {
                        url: 'https://frebourg.es/wp-content/uploads/2021/01/shop.png'
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
        if(messageArray[1] == `buy`){
            addcash(Number(0), message.author, message.member, true);
            addMoney(Number(0), message.author, message.member, true);
            if(newcash[message.author.id].cash < 3){
                if(newBank[message.author.id].money >= 10000){
                    removeMoney(Number(10000), message.author, message.member, true);
                    addcash(Number(1), message.author, message.member, true);
                    if(newLang[message.guild.id].Language == package.langue[0]) {
                        message.channel.send({
                            embed: {
                                color: 'f0c431',
                                title: '➤ Shop',
                                description: `➥ Vous venez d'acheter un **MULTIPLICATEUR** !\n⤷ Votre Multiplicateur est à _${newcash[message.author.id].cash} / 3x_`,
                                thumbnail: {
                                    url: 'https://frebourg.es/wp-content/uploads/2021/01/shop.png'
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
                            embed:{
                                color: '96f615',
                                title: '➤ Shop',
                                description: `_Your money multiplier is at ${newcash[message.author.id].cash} / 3x_ \n\n **> What is a Multiplier? ** \n⇢ The multiplier is used to multiply your money obtained by playing! \n⇢ Level multiplier ** 1 **: 1/3 of your stake. \n⇢ Level multiplier ** 2 **: 2/3 of your stake. \n⇢ Level multiplier ** 3 **: double your stake. \n\n **> Want to buy a Multiplier? ** \n↳ __Order__: ** ${package.prefix}shop buy **`,
                                thumbnail: {
                                    url: 'https://frebourg.es/wp-content/uploads/2021/01/shop.png'
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
                    return;
                }
            } else {
                if(newLang[message.guild.id].Language == package.langue[0]) {
                    message.channel.send({
                        embed: {
                            color: 'ff0000',
                            title: '➤ Erreur',
                            description: `**Désolé celà n'a pas fonctionné,\n vous êtes au niveau __MAXIMUM__ !**`,
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
                            description: `**Sorry that didn't work,\n you are at the __MAXIMUM__ level! **`,
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
        }
}

module.exports.help = {
    name: 'shop'
}