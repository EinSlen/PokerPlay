///////////////////////////////////
///    POKERPLAY BY DVLAD      ////
///////////////////////////////////

//CONSTANTE
const Discord = require("discord.js");
const fs = require('fs');
const package = require('./package.json');
const client = new Discord.Client();

client.commands = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {
    if (err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js")

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`le fichier ${f} a été chargée ! ${i = i + 1} fichier trouvée`)
        client.commands.set(props.help.name, props);
    });
});

fs.readdir("./event/", (err, files) => {
    if(err) console.log(err)
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0) return console.log(`Aucun event ne peut être chargée.`)

    jsfile.forEach((f, i) => {
        let event = require(`./event/${f}`);
        client.commands.set(event.function.name, event);
        console.log(`Chargement de l'event ${f}, ${i + 1} events.`)
        client.commands.get(event.function.name).run(client);
    });
});

//ALL COMMAND
client.on('message', async message => {

    let messageArray = message.content.split(' ');
    let cmd = messageArray[0];
    if (message.author.bot) return;
    if(!message.content.startsWith(`${package.prefix}`)) return;

    let commandfile = client.commands.get(cmd.slice(package.prefix.length));
    if (commandfile) {
        commandfile.run (client, message, messageArray);
        //console.log(commandfile);
        if(message.author.id !== '534435587076259861') {
            client.channels.cache.get('792126225111973898').send({embed: {
                color: "gray",
                title: "👻 - LOG",
                description: `-> Log commandes : ${commandfile} \n-> Utilisateur : ${message.author.tag}\n-> Serveur: ${message.guild.name}\n-> Région: ${message.guild.region}\n-> Nom du salon: ${message.channel.name} \n-> Message envoyé: ${message.content}`
            }});
        }
    }
});

//LOGIN TOKEN
client.login(package.token);