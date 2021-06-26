import { CommandProps, Command } from "../../@types"
import { colors, deleteMsg } from '../../index'
import { welcome } from '../../database/index'
import { Model } from 'mongoose'


export = {
  name: "setwelcomechannel",
  category: "admin",
  aliases: ["setwelcome", "swelcome"],
  description: "Set the Birb Welcome Channel",
  usage: "b!setlog <channel-mention/channel-id>",
  run: async function(e: CommandProps) {
    const {
      message,
      args,
      client
    } = e
    let channel: string
    let guild = client.guilds.get(message.guildID as string)
    if(!guild) return
    let author = guild.members.get(message.author.id)
    if(!author?.permissions.has('administrator')) return message.channel.createMessage(``)
    try {
      //Checking for args and returning channel ID if any
      if(!args[0] && message?.channelMentions[0] === undefined) {
        return message.channel.createMessage(`🐦 is sad! Please mention a channel or input a valid channel ID to set the logs channel to!`)
      } else if (args[0] && message?.channelMentions[0] !== undefined) {
        channel = message?.channelMentions[0]
      } else {
        let channelChecking = guild.channels.get(args[0])?.id
        if(channelChecking === undefined) {
          return message.channel.createMessage(`Invalid ID`)
        } else {
          channel = args[0]
        }
      }

      //Find stuff in DB
      try {
        if(await welcome.exists({ guildID: message.guildID })) {
          let oldChannelID: string | any
          welcome.findOne({ guildID: message.guildID }).then((doc) => {
            oldChannelID = doc?.channelID
          })
          return message.channel.createMessage({
            embed: {
              title: `Log Channel Updating`,
              description: `Logging channel is updating`,
              fields: [
                {
                  name: `New Channel`,
                  value: `<#${channel}>`
                },
                {
                  name: `Old Channel ID`,
                  value: `${oldChannelID}`
                },
                {
                  name: `Status`,
                  value: `Saving!`
                }
              ],
              color: colors.medium
            }
          }).then(async (msg) => {
            await welcome.updateOne({ guildID: message.guildID }, { channelID: channel })
            msg.edit({
              embed: {
                title: `Log Channel Updated`,
                description: `Logging Channel is Updated`,
                fields: [
                  {
                    name: `New Channel`,
                    value: `<#${channel}>`,
                  },
                  {
                    name: `Old Channel`,
                    value: `${oldChannelID}`
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
        return message.channel.createMessage({
          embed: {
            title: `Creating Welcome Channel!`,
            description: `Welcome channel has been set to <#${channel}>`,
            fields: [
              {
                name: `New Channel`,
                value: `<#${channel}>`,
              },
              {
                name: `Old Channel`,
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
          await (await welcome.create({ guildID: message.guildID, channelID: channel })).save()
          msg.edit({
            embed: {
              title: `Welcome Channel Created!`,
              description: `Welcome channel has been set to <#${channel}>`,
              fields: [
                {
                  name: `New Channel`,
                  value: `<#${channel}>`
                },
                {
                  name: `Old Channel`,
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
        
      } catch (error) {
        message.channel.createMessage(`🐦 is sad! There was a problem while trying to complete your request!`)
      }
    } catch (error) {
      client.createMessage(process.env.errorChannel as string, {
        embed: {
          title: `Unhandled Error`,
          description: `${error}`,
          color: colors.error
        }
      })
      message.channel.createMessage({
        embed: {
          title: `Unhandled Error`,
          description: `Unhandled Error the devs are looking into it!`,
          footer: {
            text: `Please report this in my support server b!invite for more info!`
          }
        }
      })
    }
  }
} as Command