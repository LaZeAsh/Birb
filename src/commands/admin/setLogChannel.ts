import { CommandProps, Command } from "../../@types";
import { colors, deleteMsg } from '../../index'
import { logChannel } from '../../database'

export = {
  name: "setlogchannel",
  category: "admin",
  aliases: ["setlog"],
  description: "Set the guild's log channel!",
  usage: "b!setlog <channel-mention>",
  run: async function(e: CommandProps) {
    const {
      message,
      args,
      client
    } = e
    let channel: string
    if(message.channelMentions[0] === undefined) return message.channel.createMessage(`🐦 is angy! Insufficent arguments please mention a channel to set the log channel to! \`\`\`${this.usage}\`\`\``)
    channel = message.channelMentions[0]
    //Add mongo DB saving shit
    logChannel.find({ guildID: message.guildID })
    if(logChannel) {
      logChannel.findOneAndUpdate({ guildID: message.guildID }, async(doc: any) => {
        doc.channelID = channel
        doc.save().then(() => console.log(`Updated!`))
      })
    } else {
      
    }
    message.channel.createMessage({
      embed: {
        title: "Success!",
        description: `Birb successfully set the log channel to <#${logChannel}> all the logging messages will go there!`,
        color: colors.success
      }
    })
  } 
} as Command