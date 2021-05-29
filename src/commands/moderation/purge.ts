import Eris from "eris";
import { CommandProps, Command } from "../../@types";
import { colors, deleteMsg } from '../../index'

export = {
  name: "purge",
  category: "moderation",
  aliases: ["clear"],
  description: "Bulk Delete messages in a channel",
  usage: "b!purge <amount>",
  permissions: ["manageMessages"],
  run: function(e: CommandProps) {
    const {
      message,
      args,
      client
    } = e
    if(!message.member?.permissions.has("manageMessages")) return message.channel.createMessage(`🐦 is sad! You do not have **Manage Messages** permissions to execute **${this.name}** command!`).then((msg) => {
      deleteMsg(msg, 5000)
      deleteMsg(message, 5000)
    })
    let amountToBePurged = parseInt(args[0])
    if(!amountToBePurged) return message.channel.createMessage(`🐦 is angy! Please enter an amount to purge \`\`\`b!purge <amount>\`\`\``)
    let reason: string = args.slice(1).join(" ")
    const channel = message.channel as Eris.TextChannel
    channel.purge(amountToBePurged + 1).then((num) => {
      message.channel.createMessage({
        embed: {
          description: `🐦 Successfully purged ${num - 1} messages!`,
          color: colors.success
        }
      }).then((msg) => {
        deleteMsg(msg, 5000)
      }) 
    }).catch(error => {
      message.channel.createMessage({
        embed: {
          title: `Error`,
          description: `🐦 is sad! Make sure the messages you are trying to purge aren't older than 14 days!`,
          color: colors.error
        }
      }).then((msg) => {
        deleteMsg(msg, 5000)
      })
    })
  }
} as Command