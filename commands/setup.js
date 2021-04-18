const Discord = require('discord.js');
const package = require('../package.json');
const fs = require('fs');
var language = require('../data/langue.json');

function addLanguage(guild, lang) {
    var newLang = language;
    if(!newLang[guild.id]){
        newLang[guild.id] = {
            Language: lang
        };
    }
    newLang[guild.id].Language = lang;
    fs.writeFileSync("./data/langue.json", JSON.stringify(newLang, null, 2), function(error){
        if(error) console.log(error);
    });
}


module.exports.run = async (client, message) => {

    let choice = ["france", "english"];
    let messageArray = message.content.split(' ');
    var newLang = language;
    
    if(!messageArray[1] || !choice.includes((messageArray[1]).toLowerCase())){
        message.channel.send({
            embed: {
                color: 'ff0000',
                title: '➤ Error',
                description: `:flag_fr: **Choisissez une langue, pour le français faite :** ${package.prefix}setup france\n:flag_au: **Choose a language, for English made :** ${package.prefix}setup english`,
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
        return;
    }
    addLanguage(message.guild, messageArray[1].toLowerCase())

    setTimeout(function(){
        if(newLang[message.guild.id].Language == choice[0]) return message.channel.send(`:thumbsup: Le serveur à bien été setup en language : :flag_fr:`)
        if(newLang[message.guild.id].Language == choice[1]) return message.channel.send(`:thumbsup: The server has been successfully setup in language : :flag_au:`)
    }, 1000)
}

module.exports.help = {
    name: 'setup'
}