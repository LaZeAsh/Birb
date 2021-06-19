import { CommandProps, Command } from "../../@types";
import { colors } from '../../index'

export = {
  name: "say",
  category: "util",
  aliases: ["echo", "repeat"],
  description: "Make Birb repeat after yourself!",
  usage: "b!say <context>",
  permissions: ["administrator"],
  run: function(e: CommandProps) {
    const {
      message,
      args,
      client
    } = e
    console.log(this.permissions)
    if(!message.member?.permissions.has("administrator")) return client.createMessage(message.channel.id, `🐦 is angy! You do not have the right permissions to execute this command! \`\`\`Administrator permissions are required to execute this command!\`\`\``)
    const say: string = args.slice(0).join(" ")
    if(!say) return client.createMessage(message.channel.id, `🐦 is angy! Please input the right amount of arguments for me to execute this command! \`\`\`b!say <content>\`\`\``)
    client.createMessage(message.channel.id, {
      embed: {
        description: `${message.author.username} is chirping 🎵 \n \n **${say}**`,
        color: colors.theme
      }
    })
  }
} as Command