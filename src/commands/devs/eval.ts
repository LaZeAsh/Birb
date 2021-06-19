import { CommandProps, Command } from "../../@types";
import { colors, deleteMsg } from '../../index'

export = {
  name: "eval",
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
    let Devs: string[] = ["376041476917821441", "411573682067210240", "522460966202507275"]
    if(message.author.id !== Devs[0] && message.author.id !== Devs[1] && message.author.id !== Devs[2]) return
    let evalMessage = args.slice(0).join(" ")
    if(!evalMessage) return message.channel.createMessage(`Enter a message to eval`)
    try {
      let evaled: string = eval(evalMessage)
      message.channel.createMessage({
        embed: {
          title: `Evaled`,
          description: `\`\`\`${evaled}\`\`\``,
          footer: {
            text: `Jack is still stupid`
          },
          color: colors.theme
        }
      }).then(() => {
        try {
          client.createMessage(`776894703554920458`, {
            embed: {
              title: `Eval was used`,
              description: `${message.author.username} evaled \`\`\`${evaled}\`\`\``,
              color: colors.theme
            }
          })
        } catch (error) {
          console.log(error)
        }
      })
    } catch (error) {
      message.channel.createMessage({
        embed: {
          title: `Results`,
          description: `\`\`\`${error}\`\`\``,
          footer: {
            text: `Jack is stupid lol`
          },
          color: colors.error
        }
      }).then(() => {
        client.createMessage(`776894703554920458`, {
          embed: {
            title: `An attempt was made`,
            description: `${message.author.username} evaled \`\`\`${args.slice(0).join(" ")}\`\`\``,
            color: colors.error
          }
        })
      })
    }
  }
} as Command