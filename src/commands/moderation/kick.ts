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
    let ID = "  "
  } 
} as Command