const { Client } = require('discord.js');
const { Pool, Client: DbClient } = require('pg');
const runCommand = require('./events');

const client = new Client();
let dbClient = null;

client.on('ready', () => {
    console.log('I am ready!');
    dbClient = new DbClient({
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        }
    });
    dbClient.connect();
});

client.on('message', message => {
    if (!message.author || message.author.id === process.env.BOT_ID  || message.author.bot)
        return;
    // Private message or something; either way, not from channel!
    if (!message.guild || !message.guild.available) return;

    runCommand(message, dbClient)
    // const regEx = new RegExp(`^${prefix}(?:set|s)`);
    // if (regEx.exec(message.content)) {
    //     console.log(message.attachments);
    //     const attachment = 'https://www.memesmonkey.com/images/memesmonkey/61/615cd9d3019c217931a3b167f05c5308.jpeg';
    //     // Send the attachment in the message channel
    //     message.channel.send("Shut the ... up!", {
    //         file: attachment });
    // }  
});

client.login(process.env.BOT_TOKEN);