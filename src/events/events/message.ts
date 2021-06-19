import { Message } from 'eris'
import { client, commands, aliases, deleteMsg, colors } from '../../index'
import { afk } from '../../database'
export async function message(message: Message) {
  let prefix: string = "b!"
  if(message.content === `<@!${client.user.id}>` || message.content === `<@${client.user.id}>`) {
    client.createMessage(message.channel.id, `Hey my name is Birb my prefix is \`${prefix}\`, <@!${client.user.id}> and I like to Chirp! 🎶`).then((msg) => {
      deleteMsg(msg, 5000)
      deleteMsg(message, 5500)
    })
  }
  if(!message.content.toLowerCase().startsWith(prefix)) prefix = `<@!${client.user.id}> `
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