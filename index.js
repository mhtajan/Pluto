const Discord = require('discord.js');
const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs')
const {prefix, token, id, secret} = require('./config.json')


const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,] });
client.commands = new Discord.Collection(); // Accessing commands collection
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles){
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
}

client.on('messageCreate', async message =>{
    if(!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).split(/ +/); // Spillting up Arguments
    const commandName = args.shift().toLowerCase(); // Converting to Lowercase
    const command = client.commands.get(commandName)
    || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName)); //Accessing Command from Command Collection in #14
if (!command) return;

try{
    command.execute(message,args,client);
}catch(err){
    console.log(err)
}
})
client.once('ready', () => {
    console.log('Bot is online');
});
client.login(token)