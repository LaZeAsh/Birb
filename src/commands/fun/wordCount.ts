import { CommandProps, Command } from "../../@types";
import { colors, deleteMsg } from '../../index'

export = {
  name: "wordcount",
  category: "fun",
  aliases: ["word"],
  description: "Find the wordcount of your message!",
  usage: "b!wordcount <text>",
  run: function(e: CommandProps) {
    const {
      message,
      args,
      client
    } = e
    message.delete()
    message.channel.createMessage({
      embed: {
        title: `Wordcount of ${message.author.username}'s Message!`,
        description: `The wordcount of your text is **${args.slice(0).join(" ").split(" ").length}** characters`,
        color: colors.theme
      }
    })
  } 
} as Command