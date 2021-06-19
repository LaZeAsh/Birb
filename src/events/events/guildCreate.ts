import Eris from 'eris'
import { client, colors } from '../../index'
export async function guildCreate(guild: Eris.Guild) {
  client.createMessage(`855274125714128896`, {
    embed: {
      title: `Joined a server`,
      description: `Joined **${guild.name}** with **${guild.memberCount}** members`,
      color: colors.success
    }
  })
}