const { send } = require('../actions/replyInChannel');

const allCommands = require('./index');
const {add_dino} = require('../db/commands');

module.exports = {
    regex(settings) {
        return new RegExp(`^${settings.prefix}\\s*(?:add\\s+dino|ad) (.*)$`, 'gi');
    },
    async action(message, match, dbClient, settings) {

        // In the second index there should be the second part defining the dino name
        if(!match[1]) {
            return send(
                message,
                `Use this command in the format ${settings.prefix}add dino/${settings.prefix}ad <dinosaur name> to add a new raid boss.`,
                false,
                settings,
              )
        }

        add_dino(match[1], message.guild.name, dbClient);
        // // admin accidentally used this command to try to set someone
        // const hasAt = match[1].indexOf('<@') >= 0
        // const hasSpaceAfterAt = match[1].lastIndexOf(' ') > hasAt
        // if (hasAt && hasSpaceAfterAt) {
        //   const commandRegex = new RegExp(`${settings.prefix}[^ ]* `, 'gi')
        //   msg.content = msg.content.replace(
        //     commandRegex,
        //     `${settings.prefix}setuser `,
        //   )
        //   return allCommands(msg, settings, client)
        // } else if (hasAt)
        //   return send(
        //     msg,
        //     `Use this command in the format ${settings.prefix}set <city or country name> to set your timezone.`,
        //     false,
        //     settings,
        //   )

        // console.log(
        //   `${
        //     msg.guild
        //       ? msg.guild.name.substring(0, 25).padEnd(25, ' ')
        //       : 'Private Message'
        //   }${msg.guild ? ` (${msg.guild.id})` : ''} - ${
        //     msg.author.username
        //   } > set to ${match[1]}`,
        // )

        // const foundTimezone = await getTimezoneFromLocation(match[1])
        // if (!foundTimezone)
        //   return send(
        //     msg,
        //     `Sorry, I couldn't find a timezone for ${match[1]}.`,
        //     false,
        //     settings,
        //   )
        // await db.updateUserInGuild({
        //   guildId: msg.guild.id,
        //   guildName: msg.guild.name,
        //   userId: msg.author.id,
        //   updatedInfo: foundTimezone,
        // })
        // const authorInGuild = await getUserInGuildFromId(msg.guild, msg.author.id)
        // send(
        //   msg,
        //   `Timezone for ${getLabelFromUser(
        //     authorInGuild,
        //   )} set to ${standardizeTimezoneName(
        //     foundTimezone.timezoneName,
        //   )}. (${getLightEmoji(foundTimezone.location)}${currentTimeAt(
        //     foundTimezone.location,
        //     false,
        //     settings.format24,
        //   )})` +
        //     (match[1].length <= 4 ||
        //     (match[1].length <= 7 && match[1].indexOf('+') > -1) ||
        //     (match[1].length <= 7 && match[1].indexOf('-') > -1) ||
        //     match[1].toLowerCase().indexOf(' time') > -1
        //       ? `\nBy the way, location names always work better than timezone codes/names!`
        //       : ''),
        //   false,
        //   settings,
        // )
    },
}
