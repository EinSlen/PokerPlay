const package = require('../package.json');
const Topgg = require('@top-gg/sdk');

const api = new Topgg.Api(`${package.tokenapi}`);

module.exports.run = async (client) => {
    //SETSTATUS
    client.on('ready', async function () {
       	client.user.setStatus('online')
        console.log(" ");
        console.log("LE BOT '" + `${client.user.tag}` + "' EST PRET !")
        console.log(`Tous les serveurs : ${client.guilds.cache.size} | Tous les membres: ${client.users.cache.size}`)
        console.log(" ");
        
        //setTimeout(function(){ 
        //client.user.setActivity(package.prefix + 'setup [language]', { type: 'WATCHING'})
        //.then(console.log)
        //.catch(console.error);
        //}, 30000);
    });

    //ADDEMBEDNEWMEMBER
    client.on('guildCreate', async user =>  {
        client.channels.cache.get("729660592025239612").send({embed:{
            color: '1bf75e',
            title: '🏮 - NOUVEAU SERVEUR:',
            description: `\n->💚 SERVEUR: ${client.guilds.cache.size}\n->MEMBRES: ${client.users.cache.size}\n->MEMBRES DU SERVEUR: ${user.members.cache.size}\n->NOM DU SERVEUR: ${user.name}`
        }});
        await api.postStats({
            serverCount: client.guilds.cache.size,
            //shardId: client.shard.ids[0], // if you're sharding
            shardCount: client.options.shardCount
        });
          let canalServeur = client.channels.cache.get('802604039065305109');
        let canalUser = client.channels.cache.get('802604773953110095');
        canalServeur.setName(`📋SERVEURS : [${client.guilds.cache.size}]`);
        canalUser.setName(`👥 ONLINE : [${client.users.cache.size}]`);
    });

    
    //ADDEMBEDNEWMEMBER
    client.on('guildDelete', async user => {
        client.channels.cache.get("729660592025239612").send({embed:{
            color: 'f71b1b',
            title: '🏮 - SERVEUR RETIRER:',
            description: `\n->💚 SERVEUR: ${client.guilds.cache.size}\n->MEMBRES: ${client.users.cache.size}\n->MEMBRES DU SERVEUR: ${user.members.cache.size}\n->NOM DU SERVEUR: ${user.name}`
        }});
        await api.postStats({
            serverCount: client.guilds.cache.size,
            //shardId: client.shard.ids[0], // if you're sharding
            shardCount: client.options.shardCount
        });
          let canalServeur = client.channels.cache.get('802604039065305109');
        let canalUser = client.channels.cache.get('802604773953110095');
        canalServeur.setName(`📋SERVEURS : [${client.guilds.cache.size}]`);
        canalUser.setName(`👥 ONLINE : [${client.users.cache.size}]`);
    });
    
}

module.exports.function = {
    name: 'function'
}