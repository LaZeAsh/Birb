import { CommandProps, Command } from "../../@types";
import { colors, secondsToTimeV2 } from '../../index'
import moment from 'moment'

export = {
  name: "uptime",
  category: "util",
  aliases: ["running"],
  description: "Get the Uptime of Birb!",
  usage: "b!uptime",
  run: function(e: CommandProps) {
    const {
      message,
      args,
      client
    } = e
    message.channel.createMessage({
      embed: {
        title: `🐦 I have been flying for`,
        description: `**${secondsToTimeV2(Math.round(process.uptime()))}**`,
        color: colors.theme
      }
    })
  } 
} as Command