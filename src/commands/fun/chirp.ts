import { CommandProps, Command } from "../../@types";
import { colors } from '../../index'
export = {
  name: "chirp",
  category: "fun",
  aliases: ["sing", "singing"],
  description: "Get a chirp from birb!",
  usage: "b!chirp",
  run: function (e: CommandProps){
    const {
      message,
      client,
      args
    } = e
    const gifs: string[] = [
      "https://media1.tenor.com/images/84a574d2577b153d6e10a8338d530f3e/tenor.gif?itemid=4995179",
      "https://media1.tenor.com/images/33c581274765773058d46b9ef20d7b19/tenor.gif?itemid=11836249",
      "https://media1.tenor.com/images/b526a96f21078a1fc0c0589cedab2360/tenor.gif?itemid=10429963",
      "https://media1.tenor.com/images/18bb7e54c55c20134b570e2c95a1e7d1/tenor.gif?itemid=8694755",
      "https://media1.tenor.com/images/e257f00d7209e9f516f34f7b4fe3b62e/tenor.gif?itemid=12328963"
    ]
    message.channel.createMessage({
      embed: {
        title: `${message.author.username} has requested a chirp! 🎶`,
        image: {
          url: `${gifs[Math.floor(Math.random() * gifs.length)]}`
        },
        color: colors.theme
      }
    })
  }
} as Command
