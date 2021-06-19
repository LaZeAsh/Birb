import Eris from "eris";
import { CommandProps, Command } from "../../@types";
import { colors, deleteMsg } from '../../index'

export = {
  name: "emote",
  category: "",
  aliases: [],
  description: "",
  usage: "",
  run: async function(e: CommandProps) {
    const {
      message,
      args,
      client
    } = e
    if(!args[0]) return
    let emoji_id = args[0]?.replace('<', '').replace('>', '').split(':')
    let emojiID = emoji_id[0]
    let guild = client.guilds.get(message.guildID as string)
    getEmojiGuild(emojiID)
    function getEmojiGuild(emojiID: string) {
      client.requestHandler.request("GET", `/emojis/${emojiID}/guild`, true).then((result: any) => {
        const guild = new Eris.Guild(result, client)
        client.getRESTGuildEmoji(guild.id, emojiID).then((emoji: Eris.Emoji) => {
          message.channel.createMessage({
            embed: {
              title: `Emoji Info`,
              fields: [
                {
                  name: `Name`,
                  value: `${emoji.name}`
                }
              ]
            }
          })
        })
      })
    }
  } 
} as Command