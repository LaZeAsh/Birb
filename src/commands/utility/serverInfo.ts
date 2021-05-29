import { CommandProps, Command } from "../../@types";
import { colors } from '../../index'
import moment from 'moment'
export = {
  name: "serverinfo",
  category: "util",
  aliases: [],
  description: "Get information about a server!",
  usage: "b!serverinfo",
  run: function(e: CommandProps) {
    
    const {
      message,
      args,
      client
    } = e
    let guild_id = message.guildID
    if(!guild_id) return;
    let guild = client.guilds.get(guild_id)
    if(!guild) return
    message.channel.createMessage({
      embed: {
        title: `${guild.name} : (${guild.id})`,
        description: `🐦 A Small Birbscription of ${guild.name}`,
        fields: [
          {
            name: `🙇 Owner`,
            value: `<@!${guild.ownerID}>`,
            inline: true
          },
          {
            name: `🫂 Members`,
            value: `${guild.memberCount}`,
            inline: true
          },
          {
            name: `🏳️ Region`,
            value: `${guild.region}`,
            inline: true
          },
          {
            name: `🔵 Roles`,
            value: `${guild.roles.size - 1}`,
            inline: true
          },
          {
            name: `🐦 Emojis`,
            value: `${guild.emojis.length}`,
            inline: true
          },
          {
            name: `🎚️ Boost Level`,
            value: `${guild.premiumTier}`,
            inline: true
          },
          {
            name: `🕰️ Created At`,
            value: `${moment(new Date(guild.createdAt).toISOString()).format("dddd, MMMM Do YYYY")}`
          }
        ],
        thumbnail: {
          url: `${guild.iconURL}`
        },
        color: colors.theme
      } 
    })
  } 
} as Command