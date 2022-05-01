import { CommandProps, Command } from "../../@types";
import { colors, deleteMsg } from '../../index'
import { muteRole } from '../../database/models'
export = {
  name: "setmuterole",
  category: "admin",
  aliases: ["smrole"],
  description: "",
  usage: "b!setmuterole <role-mention/role-id>",
  run: async function(e: CommandProps) {
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
        let oldRoleID: string = ""
        if(await muteRole.exists({ guildID: message.guildID })) {
          muteRole.findOne({ guildID: message.guildID}).then((doc) => {
            if(!doc) return
            oldRoleID = doc?.roleID
          })
          console.log(oldRoleID)
          if(!oldRoleID) oldRoleID = "error"
          return message.channel.createMessage({
            embed: {
              title: `Mute Role Updating`,
              description: `Mute Role is Updating`,
              fields: [
                {
                  name: `New Role`,
                  value: `<@&${role}>`
                },
                {
                  name: `Old Role ID`,
                  value: `${oldRoleID}`
                },
                {
                  name: `Status`,
                  value: `Saving!`
                }
              ],
              color: colors.medium
            }
          }).then(async (msg) => {
            await muteRole.updateOne({ guildID: message.guildID }, { roleID: role })
            msg.edit({
              embed: {
                title: `Mute Role Updated!`,
                description: `Mute Role is Updated`,
                fields: [
                  {
                    name: `New Role`,
                    value: `<@&${role}>`
                  },
                  {
                    name: `Old Role ID`,
                    value: `${oldRoleID}`
                  },
                  {
                    name: `Status`,
                    value: `Saved!`
                  }
                ],
                color: colors.success
              }
            })
          })
        } else {
          return message.channel.createMessage({
            embed: {
              title: `Creating Mute Role`,
              description: `Mute Role is being created`,
              fields: [
                {
                  name: `New Role`,
                  value: `<@&${role}>`
                },
                {
                  name: `Old Role ID`,
                  value: `None`
                },
                {
                  name: `Status`,
                  value: `Saving!`
                }
              ],
              color: colors.medium
            }
          }).then(async (msg) => {
            await (await muteRole.create({ guildID: message.guildID, roleID: role })).save()
            msg.edit({
              embed: {
                title: `Created Mute Role`,
                description: `Mute Role has been created`,
                fields: [
                  {
                    name: `New Role`,
                    value: `<@&${role}>`
                  },
                  {
                    name: `Old Role ID`,
                    value: `None`
                  },
                  {
                    name: `Status`,
                    value: `Saved!`
                  }
                ],
                color: colors.success
              }
            })
          })
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