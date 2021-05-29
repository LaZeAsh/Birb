import { CommandProps, Command } from "../../@types";

export = {
  name: "dare",
  category: "fun",
  aliases: [],
  description: "Get a fun Dare!",
  usage: "b!dare",
  run: function(e: CommandProps) {
    const {
      message,
      args,
      client
    } = e
    JSON.parse(`../../../JSON/dare.json`).then((data: any) => {
      console.log(data.dare)
    })
  } 
} as Command