import { CommandProps, Command } from "../../@types";
import { colors } from '../../index'

export = {
  name: "id",
  category: "util",
  aliases: ["userid"],
  description: "Grab the ID of a mentioned user!",
  usage: "b!id <mention>",
  run: function(e: CommandProps) {
    const {
      message,
      args,
      client
    } = e
    if(message?.mentions[0] === undefined) return message.channel.createMessage(`🐦 is angy! Insufficent Arguments please mention someone! \`\`\`b!id <reason> \`\`\``)
    const members = message?.mentions[0].id
    const ID = message?.mentions[0].id.split(`User`)
    message.channel.createMessage({
      embed: {
        title: "ID",
        description: `ID of <@!${members}>: ${ID}`,
        color: colors.theme
      }
    })
  } 
} as Command
