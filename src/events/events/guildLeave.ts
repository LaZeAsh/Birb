import Eris from "eris";
import { client, colors } from '../../index'
export async function guildLeave(guild: Eris.Guild) {
  client.createMessage(`855274125714128896`, {
    embed: {
      title: `Left a Guild`,
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
      color: colors.error
    }
  })
}