import { CommandProps, Command } from "../../@types";
import { colors, deleteMsg } from '../../index'
import { muteRole } from '../../database'
export = {
  name: "setmute",
  category: "admin",
  aliases: ["setmuterole", "silent"],
  description: "Set the mute role of your server!",
  usage: "b!setmute <role-mention>",
  permissions: ["administrator"],
  run: async function(e: CommandProps) {
    const {
      message,
      args,
      client
    } = e

    if(!message.member?.permissions.has('administrator')) return message.channel.createMessage(`🐦 is sad! You do not have administrator permissions to execute ${this.name} command! \`\`\`${this.usage}\`\`\``)
    if(message.roleMentions[0] === undefined) return message.channel.createMessage(`🐦 is angy! Insufficent arguments please mention a role for me to set it to the mute role! \`\`\`${this.usage}\`\`\``)
    let role = message.roleMentions[0]
    try {
    // muteRole.findOneAndUpdate({ guildID: message.guildID }, async(role: any) => {
    //   role.roleID = role
    //   return role.save()
    // }).then(() => { return console.log(`Updated`) })
    // if(muteRole.findOne({ guildID: message.guildID }))
    await muteRole.findOneAndUpdate(
      {
        guildID: message.guildID
      },
      {
        guildID: message.guildID,
        roleID: role
      },
      { upsert: true }
    ).then(() => {return console.log(`updated`)})
    await muteRole.create({
      guildID: message.guildID,
      roleID: role
    }).then(() => console.log(`Ha created it mfers`))
    } catch (err) {
      message.channel.createMessage({
        embed: {
          title: `Error`,
          description: `${err}`,
          color: colors.error
        }
      })
    }
  }
} as Command