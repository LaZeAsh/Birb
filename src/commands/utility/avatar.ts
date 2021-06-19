import { colors } from "../..";
import { CommandProps, Command } from "../../@types";

export = {
  name: "avatar",
  category: "util",
  aliases: ["av"],
  description: "View mentioned member's avatar",
  usage: "b!avatar",
  run: async function (e: CommandProps) {
    const {
      message,
      args,
      client
    } = e
    let guild = client.guilds.get(message.guildID as string)
    let avatarUser = args[0] || message.mentions[0]
    try {
      let type: any
      let memberInfo = client.getRESTUser(avatarUser as string);
      if((await memberInfo).avatarURL.includes('jpg')) {
        type = "png"
      } else {
        type = "gif"
      }
      message.channel.createMessage({
        embed: {
          title: `${(await memberInfo).username}'s Avatar`,
          image: {
            url: `${(await memberInfo).dynamicAvatarURL(type, 4096)}`
          },
          color: colors.theme
        }
      })
    } catch (error) {
      let type: any
      let avatarUser
      if(message?.mentions[0] === undefined) { avatarUser = message.author } else { avatarUser = message?.mentions[0] }
      if(avatarUser.avatarURL.includes('jpg')) {
        type = "png"
      } else {
        type = "gif"
      }
      message.channel.createMessage({
        embed: {
          title: `${avatarUser.username}'s Avatar`,
          image: {
            url: `${avatarUser.dynamicAvatarURL(type, 4096)}`
          },
          color: colors.theme
        }
      })
    }
  }
} as Command
