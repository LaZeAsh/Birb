import { CommandProps, Command } from "../../@types";
import { colors } from '../../index'

export = {
  name: "dance",
  category: "fun",
  aliases: ["birbdance"],
  description: "Dancing with Birb!",
  usage: "b!dance",
  run: function(e: CommandProps) {
    const {
      message,
      args,
      client
    } = e
    const gifs = [
      "https://media1.tenor.com/images/f3343ebe8404dd462057cfe70e726957/tenor.gif?itemid=15846527",
      "https://media.tenor.com/images/7010409f20564cad2bb4a1f8da947c8f/tenor.gif",
      "https://media1.tenor.com/images/c7b35c7607aa51d1f2338dfbc76adb49/tenor.gif?itemid=8284701",
      "https://media1.tenor.com/images/565b3b4db8b83d24ee5db487fcc9c1bd/tenor.gif?itemid=7252432",
      "https://media1.tenor.com/images/4a1b7625e463f8f89ca42e4864aef105/tenor.gif?itemid=14237382",
      "https://media1.tenor.com/images/18f4a78b5540ea6267e41b685c6879b2/tenor.gif?itemid=9269725"
    ]
    message.channel.createMessage({
      embed: {
        title: `${client.user.username} Dancing!`,
        description: `${client.user.username} is dancing with **${message.author.username}**`,
        color: colors.theme,
        image: {
          url: `${gifs[Math.floor(Math.random() * gifs.length)]}`
        }
      }
    })
  } 
} as Command
