import { CommandProps, Command } from "../../@types";
import { colors, deleteMsg } from '../../index'

export = {
  name: "coinflip",
  category: "fun",
  aliases: ["flipcoin", "birbflip", "birdflip"],
  description: "Flip a coin!",
  usage: "b!coinflip",
  run: function(e: CommandProps) {
    const {
      message,
      args,
      client
    } = e
    let coinFlip = Math.round(Math.random() * 100)
    let value: string
    if(coinFlip <= 50) {
      value = "heads"
    } else {
      value = "tails"
    }
    message.channel.createMessage({
      embed: {
        title: "Birbflip",
        description: `🪙 **${message.author.username}** has flipped a ${value} congrats!`,
        color: colors.theme
      }
    })
  } 
} as Command