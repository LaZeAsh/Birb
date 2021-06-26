import Eris from 'eris'
import { client, colors } from '../../index'
export async function guildCreate(guild: Eris.Guild) {
  client.createMessage(`855274125714128896`, {
    embed: {
      title: `Joined a server`,
      fields: [
        {
          name: `Guild`,
          value: `Name: ${guild.name} | ID: ${guild.id}`
        }, 
        {
          name: `Server Owner`,
          value: `${guild.ownerID}`
        },
        {
          name: `Member Count`,
          value: `${guild.memberCount}`
        }
      ],
      footer: {
        text: `Total Servers: ${client.guilds.size}`
      },
      color: colors.success
    }
  })
}