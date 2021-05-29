import { CommandProps, Command } from "../../@types";
import { colors, deleteMsg } from '../../index'

export = {
  name: "hack",
  category: "fun",
  aliases: ["hacking", "hacker", "hacks", ],
  description: "To hack someone (this is a joke lmao)",
  usage: "b!hack [mention]",
  run: function(e: CommandProps) {
    const {
      message,
      args,
      client
    } = e
    let msgMention: any
    if(message.mentions[0] === undefined) {msgMention = message.author} else { msgMention = message.mentions[0]}
    message.channel.createMessage({
      embed: {
        title: `Birbing ${msgMention}`,
        fields: [
          {
            name: `Hacking <:troll:845490416430219294>`,
            value: `Hacking ${msgMention}`
          }
        ]
      }
    }).then((msg: any) => {
      setTimeout(() => {
        msg.edit({
          embed: {
            title: `Birbing ${msgMention}`,

          }
        })
      }, 1500)
    })
  }
} as Command