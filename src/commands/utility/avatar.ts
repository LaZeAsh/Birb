import { CommandProps, Command } from "../../@types";

export = {
  name: "avatar",
  category: "util",
  aliases: ["av"],
  description: "View mentioned member's avatar",
  usage: "b!avatar",
  run: function (e: CommandProps) {
    const {
      message,
      args,
      client
    } = e
    let avatarUser;
    if(message?.mentions[0] === undefined) { avatarUser = message.author } else { avatarUser = message?.mentions[0]}
    message.channel.createMessage({
      embed: {
        title: `${avatarUser.username}'s Avatar`,
        image: {
          url: `${avatarUser.avatarURL.split("128")}4096`
        }
      }
    })
  }
} as Command
