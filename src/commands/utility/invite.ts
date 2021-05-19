import { CommandProps, Command } from "../../@types";
import { colors } from '../../index'


export = {
  name: "invite",
  category: "util",
  aliases: ["inv"],
  description: "Get the invite to invite Birb!",
  usage: "b!invite",
  run: function (e: CommandProps) {
    e.client.createMessage(e.message.channel.id, {
      embed: {
        title: "Invite Link",
        description: "[birbcool/invite](https://discord.com/oauth2/authorize?client_id=824130482101944372&scope=bot&permissions=2013588598) \n [birbcool/support](https://discord.com/invite/vp4S5VRz8h) \n I am a cool Birb",
        color: colors.theme
      }
    })
  }
} as Command