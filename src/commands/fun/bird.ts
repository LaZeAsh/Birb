import { CommandProps, Command } from "../../@types";
import { colors, deleteMsg } from '../../index'

export = {
  name: "bird",
  category: "fun",
  aliases: ["birb"],
  description: "Bird",
  usage: "b!bird",
  run: function(e: CommandProps) {
    const {
      message,
      args,
      client
    } = e
    const birdArray: string[] = [
      "https://media1.tenor.com/images/880c540de5fee248f1b9c969dab660e4/tenor.gif?itemid=9606403",
      "https://media1.tenor.com/images/866eacabcbff61b2037a70ec6d0ad820/tenor.gif?itemid=5715274",
      "https://media.discordapp.net/attachments/752633457552654370/845462271462604820/unknown.png?width=1401&height=1051",
      "https://media.discordapp.net/attachments/798316818891931648/843719587736715264/20200901_104717.jpg?width=788&height=1051"
    ]
    message.channel.createMessage({
      embed: {
        title: `🐦 Birb`,
        image: {
          url: `${birdArray[Math.round(Math.random() * birdArray.length)]}`
        },
        color: colors.theme
      }
    })
  } 
} as Command