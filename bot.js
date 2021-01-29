const Discord = require('discord.js');
const client = new Discord.Client();

const prefix = '!sb';

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', message => {
    const regEx = new RegExp(`^${prefix}(?:set|s)`);
    if (regEx.exec(message.content)) {
       message.reply("It's a match!");
    } else {
        message.reply("Que?");
    }

});

 

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret