import { CommandProps, Command } from "../../@types";
import { colors, deleteMsg } from '../../index'

export = {
  name: "",
  category: "",
  aliases: [],
  description: "",
  usage: "",
  run: function(e: CommandProps) {
    const {
      message,
      args,
      client
    } = e
    message.channel.createMessage({
      embed: {
        title: `World Clock!`,
        fields: [
          {
            name: ``,
            value: ``
          },
          {
            name: ``,
            value: ``
          },
          {
            name: ``,
            value: ``
          },
          {
            name: ``,
            value: ``
          },
        ],
        color: colors.theme
      }
    }) 
  }
} as Command

function fetchTimes(timezone: string) {
  let currentTime = Date.now()
  let currentTimezoneTime = new Date(currentTime).toLocaleString(timezone, { month: "long", weekday: "long", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric", second: "numeric", timeZoneName: "short"})
  return currentTimezoneTime
}