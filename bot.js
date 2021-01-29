const { Client } = require('discord.js');
const { Pool, Client: DbClient } = require('pg');

const client = new Client();
const dbClient = new DbClient();

const prefix = '!sb';

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', message => {
    if (!message.author || message.author.id === process.env.BOT_ID  || message.author.bot)
        return;
    const regEx = new RegExp(`^${prefix}(?:set|s)`);
    if (regEx.exec(message.content)) {
        console.log(message.attachments);
        const attachment = 'https://www.memesmonkey.com/topic/do+not+disturb';
        // Send the attachment in the message channel
        message.channel.send("Shut the ... up!", {
            file: attachment });
    }
});

client.login(process.env.BOT_TOKEN);