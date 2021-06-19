import Eris, { OldMessage } from 'eris'
import { client, commands, aliases, deleteMsg, colors } from '../../index'


export async function messageUpdate(message: Eris.Message, oldMessage: OldMessage) {
  let now: number = Date.now()
  let timestamp = message.createdAt as number
  if(now - timestamp > 20000) return
  let prefix: string = "b!"
  if(!message.content.toLowerCase().startsWith(prefix)) prefix = `<@!${client.user.id}> `
  if(!message.content.toLowerCase().startsWith(prefix)) prefix = `<@${client.user.id}> `
  if(!message.content.toLowerCase().startsWith(prefix) || message.author.bot) return
  const args = message.content.slice(prefix.length).split(/ +/) 
  const command = args.shift()?.toLowerCase();
  if(!command || !commands.has(command) && !aliases.get(command))return
  const cmd = commands.get(command) || aliases.get(command);
  if(!cmd)return;
  try {
    await cmd.run({ client, message, args });
  } catch (error) {
    message.channel.createMessage({
      embed: {
        title: `Error`,
        description: `${error}`,
        footer: {
          text: `Please report this error in my support server b!invite for more information`
        }
      }
    })
  }
}