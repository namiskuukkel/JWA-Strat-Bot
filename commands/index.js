const fs = require('fs');
const settings = require('../default_settings');

// get all commands from files
const commands = [];
fs.readdir('./commands', (err, files) => {
    files.forEach((file) => {
        if (file !== 'add_dino.js' || !file.endsWith('.js') || file === 'index.js') return
        commands.push(require(`./${file}`))
    })
})

module.exports = async (msg, client) => {
    const sender = msg.author;
    // try {
    // console.log(msg.guild);
    // console.log(msg.guild.name);
    // } catch(er) {

    // }
    for (let command of commands) {
        console.log(msg.content);
        const regex = command.regex(settings);
        const match = regex.exec(msg.content);
        console.log(match);
        if (match) {
            console.log("It's a match");

            const senderIsAdmin =
                msg.guild &&
                msg.guild.member(msg.author) &&
                msg.guild.member(msg.author).permissions.has('BAN_MEMBERS'); // was 'ADMINISTRATOR', sneakily switched
            
            console.log(senderIsAdmin);
            
            if (
                command.adminOnly === true &&
                !command.ignoreAdminOnly &&
                !senderIsAdmin
            ) {
                send(
                    msg,
                    `This command is currently disabled for non-admins.`,
                    false
                )
                return true
            }
            if (command.admin && !senderIsAdmin) {
                send(
                    msg,
                    `That command is only available to server admins.`,
                    false
                )
                return true
            }

            // execute command
            await command.action({
                msg,
                match,
                dbClient,
                settings
            })
        } else {
            console.log("No match!");
        }
    }
}
