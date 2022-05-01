import { CommandProps, Command } from "../../@types";
import { colors, deleteMsg } from '../../index'

export = {
  name: "kick",
  category: "mod",
  aliases: [],
  description: "",
  usage: "",
  run: function(e: CommandProps) {
    const {
      message,
      args,
      client
    } = e
    let guild = client.guilds.get(message.guildID as string)
    if(!guild) return
    let ID: string[] = []
    try {
      for (let mentions of message.mentions) {
        ID.push(mentions.id)
        console.log(mentions.id)
        console.log(ID)
      }
    } catch (error) {

    }
  } 
} as Command