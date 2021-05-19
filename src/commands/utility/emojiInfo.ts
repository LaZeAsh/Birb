import { CommandProps, Command } from "../../@types";
import { colors } from '../../index'

export = {
  name: "emoteinfo",
  category: "util",
  aliases: ["emote"],
  description: "Information about an emote!",
  usage: "b!emoteinfo <id>",
  run: async function(e: CommandProps) { 
    const {
      message,
      args,
      client
    } = e
    let guild_id = message.guildID;
    if(!guild_id)return;
    let guild = client.guilds.get(guild_id);
    if(!guild)return;
    let emoji_id = args[0]?.replace('<', '').replace('>', '').split(':');
    if(!emoji_id)return;
    emoji_id.shift();
    let emoji = await guild.getRESTEmoji(emoji_id[1]);
    if(!emoji)return;
    message.channel.createMessage({
      embed: {
        title: `${emoji.name}`,
        description: `🐦 a small birbscription of ${emoji.name}`,
        fields: [
          {
            name: "📝 Name",
            value: `${emoji.name}`,
            inline: true
          },
          {
            name: "🆔 Emoji ID",
            value: `${emoji.id}`,
            inline: true
          },
          {
            name: `📰 Animated`,
            value: `${emoji.animated}`
          },
        ],
        thumbnail: {
          url: emoji?.icon
        },
        color: colors.theme
      }
    })
    return
  } 
} as Command