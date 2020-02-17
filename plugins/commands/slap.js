module.exports = (client, from, to, message) => {
  client.say(to, `${from} slaps ${message[1]}`)
}
