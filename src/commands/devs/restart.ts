import { CommandProps, Command } from "../../@types";
import { colors, deleteMsg } from '../../index'

export = {
  name: "restart",
  category: "dev",
  aliases: [],
  description: "Restart Birb!",
  usage: "b!restart",
  run: function(e: CommandProps) {
    const{
      message,
      args,
      client
    } = e
    if(message.author.id !== "376041476917821441" && message.author.id !== "411573682067210240" && message.author.id !== "522460966202507275") return message.channel.createMessage(`Ha you aren't my master`).then((msg: any) => {
      deleteMsg(msg, 5000)
      deleteMsg(message, 5500)
    })

    message.channel.createMessage(`🐦 Birb is going to sleep! Goodnight!`).then(() => process.exit())
  }
} as Command