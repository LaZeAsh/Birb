import { CommandProps, Command } from "../../@types";
import { colors } from '../../index'



export = {
  name: "info",
  category: "util",
  aliases: ["information", "status"],
  description: "Information About Birb!",
  usage: "b!info",
  run: function(e: CommandProps) {
    const {
      message,
      args,
      client
    } = e
    message.channel.createMessage({
      embed: {
        title: `Information on ${client.user.username}`,
        description: `HAI here's a small birbscription of me! ❤️ 🐦 \n 
        \`\`\`nim
Information:

Devs: "Ashh#8675" ".nero#3887" "JackOutTheBox#6869"

Library: Eris

Ram Usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MBs of ram used!

Guilds: ${client.guilds.size}

Members: ${client.users.size}

Version: 1.2.0
        \`\`\``,
        color: colors.theme
      }
    })
  } 
} as Command