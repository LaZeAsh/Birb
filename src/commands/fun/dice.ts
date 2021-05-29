import { CommandProps, Command } from "../../@types";
import { colors, deleteMsg } from '../../index'

export = {
  name: "dice",
  category: "fun",
  aliases: ["dicey"],
  description: "",
  usage: "",
  run: function(e: CommandProps) {
    const {
      message,
      args,
      client
    } = e
    let diceResult: number = Math.round(Math.random() * 6)
    message.channel.createMessage({
      embed: {
        title: "Dice",
        description: `You have rolled a ${diceResult} congrats ${message.author.username}`,
        color: colors.theme,
      }
    })
  }
} as Command