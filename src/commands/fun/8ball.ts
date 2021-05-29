import { CommandProps, Command } from "../../@types";
import { colors, deleteMsg } from '../../index'

export = {
  name: "8ball",
  category: "fun",
  aliases: ["fate"],
  description: "Ask 8ball your questions!",
  usage: "b!8ball <question>",
  run: function(e: CommandProps) {
    const {
      message,
      args,
      client
    } = e
    const question: string = args.slice(0).join(" ")
    if(!question) return message.channel.createMessage(`🐦 is angy! Please enter a question for the birball to answer! \`\`\`${this.description}\`\`\``)
    if(question.length > 800) return message.channel.createMessage(`🐦 is sad! Please ask a question whose length is shorter than 800 characters \`\`\`b!8ball <question>\`\`\``)
    const responses: string[] = [
      "Birb is sleeping ask again 💤",
      "🎵 *Chirp~* sure why not",
      "You got food?",
      "Nooo Birbie likes his food!"
    ]
    
    for (const response of responses) {
      console.log(response)
    }
    message.channel.createMessage({
      embed: {
        title: `🎱 Birball response!`,
        description: `**${message.author.username}** asked: ${question} \n 🐦 Birb says 🎱: **${responses[Math.floor(Math.random() * responses.length)]}**`,
        footer: {
          text: `Asked by ${message.author.username}`,
          icon_url: `${message.author.avatarURL}`
        },
        color: colors.theme
      }
    })
  } 
} as Command