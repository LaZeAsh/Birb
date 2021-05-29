import { CommandProps, Command } from "../../@types";
import { colors, deleteMsg } from '../../index'

export = {
  name: "mock",
  category: "fun",
  aliases: ["imitate", "mocking"],
  description: "Mock someone!",
  usage: "b!mock <text>",
  run: function(e: CommandProps) {
    const {
      message,
      args,
      client
    } = e
    let letters = args.join(' ').toLowerCase().split('');
    if(letters.join('').length > 800) return message.channel.createMessage(`🐦 is sad! Please enter a text to mock less than 800 characters!`)
    if(!letters.join('')) return message.channel.createMessage(`🐦 is angy! Insufficent arguments please enter a text for me to mock! \`\`\`${this.usage}\`\`\``)
    for (let i = 0; i < letters.length; i += Math.floor(Math.random() * 4)) {
      letters[i] = letters[i].toUpperCase();
    }
    message.channel.createMessage({
      embed: {
        title: `Mocking`,
        description: `🐦 **${message.author.username}** is mocking! \n\n${letters.join('')}`,
        color: colors.theme
      }
    })
  } 
} as Command