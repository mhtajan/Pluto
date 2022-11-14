const {EmbedBuilder} = require('discord.js')

module.exports = {
    name: `hello`,
    async execute(message,args){
        
        const embed = new EmbedBuilder()
        .setColor("ff4b5c")
        .setDescription(`Hello`)
        .setTimestamp()

        message.channel.send({embeds: [embed]})
    }
}