const irc = require('irc-upd')
const settings = require('./settings')

const client = new irc.Client(settings.server, settings.nickname, {
  port: settings.port,
  password: settings.password,
  channels: settings.channels,
  secure: settings.secure,
  floodProtection: settings.floodProtection,
  floodProtectionDelay: settings.floodProtectionDelay,
  debug: settings.debug,
  showErrors: settings.showErrors
})

const commands = {
  test: (from, to) => require('./plugins/commands/test')(client, from, to),
  slap: (from, to, message) => require('./plugins/commands/slap')(client, from, to, message),
  'ctf-info': (from, to, message) => require('./plugins/commands/ctf-info')(client, irc, from, to, message),
  'ctf-events': (to) => require('./plugins/commands/ctf-events')(client, irc, to)
}

function executeCommand (from, to, message) {
  const command = message[0].slice(1)
  if (commands[command]) {
    commands[command](from, to, message)
  } else {
    client.say(to, `Sorry ${from}, this command "${message[0]}" is unknown to me ;_;`)
  }
}

client.addListener('message', function (from, to, message) {
  console.log(from + ' => ' + to + ': ' + message)
  if (message.charAt(0) === '!') {
    executeCommand(from, to, message.split(' '))
  }
})

client.addListener('error', function (message) {
  console.log('error: ', message)
})
