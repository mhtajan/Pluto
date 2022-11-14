const Discord = require('discord.js');
const {prefix, token, id, secret} = require('./config.js')

const client = new Discord.Client({partials: ['MESSAGE', 'CHANNEL', 'REACTION','USER','GUILD_MEMBER'] }); // Creating a new Client
client.commands = new Discord.Collection(); // Accessing commands collection

for (const file of commandFiles){
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
}