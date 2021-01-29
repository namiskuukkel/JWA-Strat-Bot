const { Client, MessageAttachment } = require('discord.js');
const client = new Client();

const prefix = '!sb';

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', message => {
    console.log(message.author.id);
    console.log(message.author.id === process.env.BOT_ID);
    if (!message.author || message.author.id === process.env.BOT_ID  || message.author.bot)
        return;
    const regEx = new RegExp(`^${prefix}(?:set|s)`);
    if (regEx.exec(message.content)) {
        const attachment = 'https://i.imgur.com/w3duR07.png';
        // Send the attachment in the message channel
        message.channel.send("Here!", {
            file: attachment });
    }
});

client.login(process.env.BOT_TOKEN);