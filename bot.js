const Discord = require('discord.js');
const client = new Discord.Client();

const prefix = '!sb';

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', message => {
    console.log(message.author.id);
    if (!message.author || message.author.bot)
        return;
    const regEx = new RegExp(`^${prefix}(?:set|s)`);
    if (regEx.exec(message.content)) {
       message.reply("It's a match!");
    } else {
        message.reply("Que?");
    }

});

client.login(process.env.BOT_TOKEN);

