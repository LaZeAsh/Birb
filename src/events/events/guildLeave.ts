import Eris from "eris";
import { client, colors } from '../../index'
export async function guildLeave(guild: Eris.Guild) {
  client.createMessage(`855274125714128896`, {
    embed: {
      title: `Left a guild`,
      description: `Left **${guild.name}** with **${guild.memberCount}** members`,
      color: colors.error
    }
  })
}