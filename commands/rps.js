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


//SYSTEM FUNCTION MONEY REMOVE
function removeMoney(ammount, member, author, check) {
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
    newBank[member.id].money -= Number(ammount);
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
    const chooseArr = ["rock", "paper", "scissors"];
    var newBank = bank;
    var newcash = cash;
    var newLang = lang;

    if(newLang[message.guild.id] == undefined) return message.channel.send(`:flag_fr: Le serveur n'est pas setup !\n:flag_au: The server is not setup !\n>Command ${package.prefix}setup`);
    
    if(!messageArray[1]) {
        if(newLang[message.guild.id].Language == package.langue[0]) {
            message.channel.send({
                embed: {
                    color: 2552550,
                    title: '➤ RPS',
                    description: `⛔ Commande invalide, il faut respecter les arguments.\n\n⤿ *Exemple de commande* : \n\`\`\`✪ ${package.prefix}rps rock\n✪ ${package.prefix}rps paper\n✪ ${package.prefix}rps scissors\`\`\``,
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
                    title: '➤ RPS',
                    description: `⛔ Invalid command, the arguments must be respected. \n\n⤿ * Example of command *: \n \`\`\`✪ ${package.prefix}rps rock\n✪ ${package.prefix}rps paper\n✪ ${package.prefix}rps scissors\`\`\``,
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

    if (chooseArr.includes((messageArray[1]).toLowerCase())) {
        addMoney(Number(0), message.author, message.member, true);
        addcash(Number(0), message.author, message.member, true);
        if (newBank[message.author.id].money >= 100) {
            let number = Math.floor(Math.random() * 3);
            if (number == 1) {
                if(newLang[message.guild.id].Language == package.langue[0]) {
                    message.channel.send({
                        embed: {
                            color: 'ffffff',
                            title: '➤ RPS',
                            description: `Le joueur ${message.author} vient de faire **ÉGALITÉ** avec ${client.user.username}\nVous avez fait **${messageArray[1].toUpperCase()}.**\n\n➣ VOS RÉCOMPENSES :\n>💳 _Aucune._\n>💰 Votre compte s'estime à _${newBank[message.author.id].money}€_`,
                            thumbnail: {
                                url: 'https://images-eu.ssl-images-amazon.com/images/I/51V-YSNt-iL.png'
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
                            color: 'ffffff',
                            title: '➤ RPS',
                            description: `Player ${message.author} just did **TIE** with ${client.user.username} \nYou did ** ${messageArray[1].toUpperCase()}. ** \n\n➣ YOUR REWARDS :\n> 💳 _No ._ \n> 💰 Your account is valued at _ ${newBank[message.author.id].money}€_`,
                            thumbnail: {
                                url: 'https://images-eu.ssl-images-amazon.com/images/I/51V-YSNt-iL.png'
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
            if (number == 2) {
                removeMoney(Number(100), message.author, message.member, true);
                ClientUseWin = messageArray[1].toLowerCase()
                if (messageArray[1].toLowerCase() == `rock`) ClientUseWin = 'PAPER'
                if (messageArray[1].toLowerCase() == `paper`) ClientUseWin = 'SCISSORS'
                if (messageArray[1].toLowerCase() == `scissors`) ClientUseWin = 'ROCK'

                if(newLang[message.guild.id].Language == package.langue[0]) {
                    message.channel.send({
                        embed: {
                            color: 'f71b1b',
                            title: '➤ RPS',
                            description: `Le joueur ${message.author} vient de **PERDRE** contre ${client.user}\nVous auriez dû faire **${ClientUseWin}.**\n\n➣ VOS RÉCOMPENSES :\n>💳 Vous avez perdu(e) : _${Number(100)}€_\n>💰 Votre compte s'estime à _${newBank[message.author.id].money}€_`,
                            thumbnail: {
                                url: 'https://images-eu.ssl-images-amazon.com/images/I/51V-YSNt-iL.png'
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
                            color: 'f71b1b',
                            title: '➤ RPS',
                            description: `Player ${message.author} just **LOSE** against ${client.user}\nYou should have made** ${ClientUseWin}.** \n\n➣ YOUR REWARDS: \n> 💳 You got lost:_ ${Number(100)}€ _ \n> 💰 Your account is valued at _ ${newBank[message.author.id].money}€_`,
                            thumbnail: {
                                url: 'https://images-eu.ssl-images-amazon.com/images/I/51V-YSNt-iL.png'
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
            if (number == 0) {
                addMoney(Number(100), message.author, message.member, true);
                if(newLang[message.guild.id].Language == package.langue[0]){
                    message.channel.send({
                        embed: {
                            color: '83f927',
                            title: '➤ RPS',
                            description: `Le joueur ${message.author} vient de **GAGNÉ** contre ${client.user}\nVous avez gagné en fessant **${messageArray[1].toUpperCase()}.**\n\n➣ VOS RÉCOMPENSES :\n>💳 Vous avez gagné(e) : _${Number(100)}€_\n>💰 Votre compte s'estime à _${newBank[message.author.id].money}€_`,
                            thumbnail: {
                                url: 'https://images-eu.ssl-images-amazon.com/images/I/51V-YSNt-iL.png'
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
                            color: '83f927',
                            title: '➤ RPS',
                            description: `Player ${message.author} just **WON** against ${client.user}\nYou won by spanking** ${messageArray[1].toUpperCase()}.** \n\n➣ YOUR REWARDS: \n> 💳 You have won: _ ${Number(100)}€_\n> 💰 Your account is valued at _ ${newBank[message.author.id].money}€_`,
                            thumbnail: {
                                url: 'https://images-eu.ssl-images-amazon.com/images/I/51V-YSNt-iL.png'
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
                            description: `>💵 : **${Number(100 / 3)}€**\n⤷ : _${newcash[message.author.id].cash} / 3x_`,
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
                    addMoney(Number(100 / 3), message.author, message.member, true);
                }
                if(newcash[message.author.id].cash == 2){
                    message.channel.send({
                        embed: {
                            color: "fac30b",
                            title: '➤ Multiplication',
                            description: `>💵 : **${Number(100 / 2)}€**\n⤷ : _${newcash[message.author.id].cash} / 3x_`,
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
                    addMoney(Number(100 / 2), message.author, message.member, true);
                }
                if(newcash[message.author.id].cash == 3){
                    message.channel.send({
                        embed: {
                            color: "fac30b",
                            title: '➤ Multiplication',
                            description: `>💵 : **${Number(100)}€**\n⤷ : _${newcash[message.author.id].cash} / 3x_`,
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
                    addMoney(Number(100), message.author, message.member, true);
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
    } else {
        if(newLang[message.guild.id].Language == package.langue[0]) {
            message.channel.send({
                embed: {
                    color: 2552550,
                    title: '➤ RPS',
                    description: `⛔ Commande invalide, il faut respecter les arguments.\n\n⤿ *Exemple de commande* : \n\`\`\`✪ ${package.prefix}rps pierre\n✪ ${package.prefix}rps papier\n✪ ${package.prefix}rps ciseaux\`\`\``,
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
                    title: '➤ RPS',
                    description: `⛔ Invalid command, the arguments must be respected. \n\n⤿ * Example of command *: \n \`\`\`✪ ${package.prefix}rps pierre \n✪ ${package.prefix}rps papier \n✪ ${package.prefix}rps ciseaux\`\`\``,
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
    name: 'rps'
}