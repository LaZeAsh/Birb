import { CommandProps, Command } from "../../@types";
import { colors, deleteMsg } from '../../index'

export = {
  name: "",
  category: "",
  aliases: [],
  description: "",
  usage: "",
  run: function(e: CommandProps) {
    const {
      message,
      args,
      client
    } = e
  } 
} as Command