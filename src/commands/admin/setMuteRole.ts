import { CommandProps, Command } from "../../@types";
import { colors, deleteMsg } from '../../index'
import { muteRole } from '../../database/models'
export = {
  name: "setmuterole",
  category: "admin",
  aliases: ["role"],
  description: "",
  usage: "b!setmuterole <role-mention/role-id>",
  run: function(e: CommandProps) {
    const {
      message,
      args,
      client
    } = e
    let role: any
    let guild = client.guilds.get(message.guildID as string)
    if(!guild) return
    try {
      if(!args[0] && message.roleMentions[0] === undefined) {
        return message.channel.createMessage(`Enter Role Stupid`)
      } else if(args[0] && message.roleMentions[0] !== undefined) {
        role = message.roleMentions[0]
      } else {
        let inGuild = guild.roles.get(args[0])
        if(inGuild === undefined) return message.channel.createMessage(`Invalid Role ID`)
        if(inGuild !== undefined) role = args[0]
      }

      // Saving into the DB
      try {
        if(muteRole.exists({ guildID: message.guildID })) {
          muteRole.findOne()
        } else {

        }
      } catch (error) {

      }
    } catch (error) {
      message.channel.createMessage({
        embed: {
          title: `Unhandled Error`,
          description: `Unhandled Error the devs are looking into it`,
          footer: {
            text: `Please report this in our support server b!invite for the invite!`
          },
          color: colors.error
        }
      })
      client.createMessage(process.env.errorChannel as string, {
        embed: {
          title: `Unhandled Error`,
          description: `${error}`,
          color: colors.error
        }
      })
    }
  } 
} as Command