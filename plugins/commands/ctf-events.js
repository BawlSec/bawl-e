const fetch = require('node-fetch')

module.exports = (client, irc, to) => {
  const now = Math.floor(Date.now() / 1000)
  const future = now + (((60 * 60) * 24) * 365)
  const url = `https://ctftime.org/api/v1/events/?limit=5&start=${now}&finish=${future}`

  fetch(url).then((response) => {
    return response.json()
  }).then(result => {
    client.say(to, irc.colors.wrap('magenta', '##### UPCUMMING 5 EVENTS #####'))
    for (const item in result) {
      const parsed = result[item]
      client.say(to, irc.colors.wrap('light_green', `${parsed.id} | ${parsed.title}(${parsed.url}) starts at ${parsed.start} and ends at ${parsed.finish}(days: ${parsed.duration.days} and hours:${parsed.duration.hours})`))
    }
    client.say(to, irc.colors.wrap('magenta', '##### USE: "!ctf-info <ctf_id>" for more info (without quotes, you dummy) #####'))
  })
}
