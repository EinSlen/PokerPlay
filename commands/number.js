const Discord = require('discord.js');
const package = require('../package.json');
const fs = require('fs');

//VARIABLE SOUS
var guesses;
var num = 0;

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
    var newcash = cash;
    var newBank = bank;
    var newLang = lang;

if(newLang[message.guild.id] == undefined) return message.channel.send(`:flag_fr: Le serveur n'est pas setup !\n:flag_au: The server is not setup !\n>Command ${package.prefix}setup`);
    
    if(messageArray[1] == `start`){
        if(newLang[message.guild.id].Language == package.langue[0]) {
            message.channel.send({
                embed: {
                    color: 2552550,
                    title: '➤ Nombre',
                    description: `> Le joueur ${message.author} vient de lancer la partie !\n⤷ Essayez de retrouver le nombre pour gagné la partie **(Nombre entre 0 et 100)** ! Bonne chance !`,
                    thumbnail: {
                        url: 'https://img.over-blog-kiwi.com/1/81/80/03/20180924/ob_0a570f_147-et-le-carre-des-nombres.png'
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
                    title: '➤ Number',
                    description: `> The player ${message.author} has just started the game! \n⤷ Try to find the number to win the game **(Number between 0 and 100)**! Good luck !`,
                    thumbnail: {
                        url: 'https://img.over-blog-kiwi.com/1/81/80/03/20180924/ob_0a570f_147-et-le-carre-des-nombres.png'
                    },
                    timestamp: new Date(),
                    footer: {
                    icon_url: client.user.avatarURL,
                    text: "© Made by " + package.author
                    }  
                }
            });
        }
        num = Math.floor((Math.random() * 100) + 1);
        client.channels.cache.get('792126225111973898').send(`Une partie de nombre à été lancer, le nombre : ${num}`);
        guesses = 0;
    }
    if(num == 0){
        if(newLang[message.guild.id].Language == package.langue[0]) {
            message.channel.send({
                embed: {
                    color: 541140,
                    title: '➤ Nombre',
                    description: `> Aucune partie n'a été lancer !⤷ Faîte donc la commande \`${package.prefix}number start\`\n⤷ Puis ensuite trouvez le nombre grâce à la commande \`${package.prefix}number [nombre]\`\n⤷ Ou alors stopper la partie grâce à \`${package.prefix}number stop\` `,
                    thumbnail: {
                        url: 'https://img.over-blog-kiwi.com/1/81/80/03/20180924/ob_0a570f_147-et-le-carre-des-nombres.png'
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
                    color: 541140,
                    title: '➤ Number',
                    description: `> No game has been started! ⤷ So do the command \`${package.prefix}number start \`\n⤷ Then find the number using the command \`${package.prefix}number [number] \`\n⤷ Or stop the game with \` ${package.prefix}number stop\``,
                    thumbnail: {
                        url: 'https://img.over-blog-kiwi.com/1/81/80/03/20180924/ob_0a570f_147-et-le-carre-des-nombres.png'
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
    else if(messageArray[1] == null){
        if(newLang[message.guild.id].Language == package.langue[0]) {
            message.channel.send({
                embed: {
                    color: 2552550,
                    title: '➤ Nombre',
                    description: `⛔ Commande invalide, il faut respecter les arguments.\n\n⤿ *Exemple de commande* : \n\`\`\`✪ ${package.prefix}number start\n✪ ${package.prefix}number [nombre]\`\`\``,
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
                    title: '➤ Number',
                    description: `⛔ Invalid command, the arguments must be respected. \n\n⤿ * Example of command *: \n \`\`\`✪ ${package.prefix}number start \n✪ ${package.prefix}nombre [number] \`\`\``,
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
    else if(messageArray[1] == num){
        guesses++;
        addMoney(Number(200), message.author, message.member, true);
        addcash(Number(0), message.author, message.member, true);
        if(newLang[message.guild.id].Language == package.langue[0]) {
            message.channel.send({
                embed: {
                    color: 2552550,
                    title: `➤ Nombre`,
                    description: `> Le joueur ${message.author} vient de **GAGNÉ** la partie avec *${guesses}* essaye !\n\n➣ VOS RÉCOMPENSES :\n>💳 Vous avez gagné(e) : _${Number(200)}€_\n>💰 Votre compte s'estime à _${newBank[message.author.id].money}€_`,
                    thumbnail: {
                        url: 'https://img.over-blog-kiwi.com/1/81/80/03/20180924/ob_0a570f_147-et-le-carre-des-nombres.png'
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
                    title: `➤ Number`,
                    description: `> Player ${message.author} has just **WON** the game with *${guesses}* try! \n\n➣ YOUR REWARDS: \n> 💳 You won: _ ${Number(200)}€_ \n> 💰 Your account is valued at _ ${newBank[message.author.id].money}€ _`,
                    thumbnail: {
                        url: 'https://img.over-blog-kiwi.com/1/81/80/03/20180924/ob_0a570f_147-et-le-carre-des-nombres.png'
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
                    description: `>💵 : **${Number(200 / 3)}€**\n⤷ : _${newcash[message.author.id].cash} / 3x_`,
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
            addMoney(Number(200 / 3), message.author, message.member, true);
        }
        if(newcash[message.author.id].cash == 2){
            message.channel.send({
                embed: {
                    color: "fac30b",
                    title: '➤ Multiplication',
                    description: `>💵 : **${Number(200 / 2)}€**\n⤷ : _${newcash[message.author.id].cash} / 3x_`,
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
            addMoney(Number(200 / 2), message.author, message.member, true);
        }
        if(newcash[message.author.id].cash == 3){
            message.channel.send({
                embed: {
                    color: "fac30b",
                    title: '➤ Multiplication',
                    description: `>💵 : **${Number(200)}€**\n⤷ : _${newcash[message.author.id].cash} / 3x_`,
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
            addMoney(Number(200), message.author, message.member, true);
        }
        num = Math.floor((Math.random() * 100) + 1);
        guesses = 0;
    }
    else if(messageArray[1] < num){
        if(newLang[message.guild.id].Language == package.langue[0]) message.channel.send("➤ Le nombre : " + messageArray[1] + " est beaucoup trop **PETIT** !")
        if(newLang[message.guild.id].Language == package.langue[1]) message.channel.send("➤ The number : " + messageArray[1] + " is much too **SMALL** !")
        guesses++;
        return;
    }
    else if(messageArray[1] > num){
        if(newLang[message.guild.id].Language == package.langue[0]) message.channel.send("➤ Le nombre : " + messageArray[1] + " est beaucoup trop **GRAND** !")
        if(newLang[message.guild.id].Language == package.langue[1]) message.channel.send("➤ The number : " + messageArray[1] + " is much too **BIG** !")
        guesses++;
        return;
    }
    if(num != 0){
        if(messageArray[1] == `stop`){
            if(newLang[message.guild.id].Language == package.langue[0]) {
                message.channel.send({
                    embed: {
                        color: 2552550,
                        title: '➤ Nombre',
                        description: `Le joueur ${message.author} vient d'arrêter la partie !\n⤷ Vous pouvez la relancer à tout moment grâce à la commande \`${package.prefix}number start\``,
                        thumbnail: {
                            url: 'https://img.over-blog-kiwi.com/1/81/80/03/20180924/ob_0a570f_147-et-le-carre-des-nombres.png'
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
                        title: '➤ Number',
                        description: `The player ${message.author} has just stopped the game! \n⤷ You can restart it at any time with the command \`${package.prefix}number start\``,
                        thumbnail: {
                            url: 'https://img.over-blog-kiwi.com/1/81/80/03/20180924/ob_0a570f_147-et-le-carre-des-nombres.png'
                        },
                        timestamp: new Date(),
                        footer: {
                        icon_url: client.user.avatarURL,
                        text: "© Made by " + package.author
                        }  
                    }
                });
            }
            num = 0;
            guesses = 0;
        }
    }

}

module.exports.help = {
    name: 'number'
}