const fetch = require('node-fetch')

module.exports = (client, irc, from, to, message) => {
  const arg = Number(message[1])
  if (arg > 0) {
    fetch(`https://ctftime.org/api/v1/events/${message[1]}/`).then(response => {
      return response.json()
    }).then(result => {
      client.say(to, JSON.stringify(result))
    })
  } else {
    client.say(to, irc.colors.wrap('dark_red', `Dear ${from}, Argument for command ${message[0]} should *NOT* be: ${message[1]}... ಠ_ಠ`))
  }
}
