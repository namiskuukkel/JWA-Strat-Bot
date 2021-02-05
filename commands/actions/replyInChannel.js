module.exports = {
  send(msg, text, block = false, settings) {
    const messages = []
    const prefix = block === 'none' ? '' : block ? '```' : '`'
    if (typeof text === 'object') messages.push(text)
    else {
      let remainingText = text
      while (remainingText.length > 0) {
        messages.push(`${prefix}${remainingText.substring(0, 1990)}${prefix}`)
        remainingText = remainingText.substring(1990)
      }
    }
    for (let message of messages)
      msg.channel
        .send(message)
        .then((sentMsg) => {
          // console.log(
          //   msg.guild.name,
          //   settings && typeof settings.deleteResponse,
          //   settings && settings.deleteResponse,
          // )
        })
        .catch((err) => {
          console.error('Failed to send!', err.message)
        })
  },
  reply(msg, text) {
    const messages = []
    let remainingText = text
    while (remainingText.length > 0) {
      messages.push(remainingText.substring(0, 1998))
      remainingText = remainingText.substring(1998)
    }
    for (let message of messages)
      msg.channel.send(message).catch((err) => {
        
        console.error('Failed to reply!', err.message)
      })
  },
}