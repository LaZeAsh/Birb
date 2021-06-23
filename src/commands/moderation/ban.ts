import { CommandProps, Command } from "../../@types";
import { colors, deleteMsg } from '../../index'
import Eris from 'eris'

export = {
  name: "ban",
  category: "mod",
  aliases: [],
  description: "",
  usage: "",
  run: async function(e: CommandProps) {
    const {
      message,
      args,
      client
    } = e
    let guild = client.guilds.get(message.guildID as string)
    if(!guild) return
    let ID = ""
    if(!args[0] && message?.mentions[0] === undefined) return message.channel.createMessage(`Mention a user stuff`)
    if(message?.mentions[0] === undefined && args[0]) {
      ID = args[0]
    } else if (message?.mentions[0] !== undefined && args[0]) {
      ID = message?.mentions[0].id
    }
    let member: Eris.Member | null
    try {
      let members = await guild.fetchMembers({userIDs: [ID], limit: 1})
      member = members[0]
    } catch (error) {
      member = null
    }
    if(!member) {
      try {
        let reason = args.slice(1).join(" ")
        if(!reason) reason = "Unknown"
        let memberInfo: Promise<Eris.User>
        try {
          memberInfo = client.getRESTUser(ID)
        } catch (error) {
          return message.channel.createMessage(`Stuff`)
        }
        guild.banMember(ID, 0)
        message.channel.createMessage({
          embed: {
            title: `${(await memberInfo).username} has been banned!`,
            description: `**${message.author.username}** has banned **${(await memberInfo).username}** from **${guild.name}**`,
            fields: [
              {
                name: `🐦 Birbbed User`,
                value: `<@!${(await memberInfo).id}> (ID: **${(await memberInfo).id})**`
              },
              {
                name: `Reason`,
                value: `${reason}`
              }
            ]
          }
        })
      } catch (error) {
        message.channel.createMessage(`member doesn't exist`)
      }
    } else {

    }
  } 
} as Command