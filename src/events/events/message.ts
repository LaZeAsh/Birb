import { Message } from 'eris'
import { client, prefix, commands, aliases, deleteMsg, colors } from '../../index'
import { afk } from '../../database'
export async function message(message: Message) {
  if(message.content === `<@!${client.user.id}>` || message.content === `<@${client.user.id}>`) {
    client.createMessage(message.channel.id, `Hey my name is Birb my prefix is \`${prefix}\` and I like to Chirp! 🎶`).then((msg) => {
      deleteMsg(msg, 5000).catch((error: any) => {
        client.createMessage(process.env.errorChannel as string, {
          embed: {
            title: `Error`,
            description: `Safe catch couldn't delete a message`,
            color: colors.theme
          }
        })
      })
      deleteMsg(message, 6000).catch((error: any) => {
        client.createMessage(process.env.errorChannel as string, {
          embed: {
            title: `Error`,
            description: `Safe catch couldn't delete a message`,
            color: colors.theme
          }
        })
      })
    })
  }
  if(!message.mentions[0] === undefined) {
    const mainIDs = afk.findOne({ userID: `${message.mentions[0]?.id}-${message.guildID}`})
    console.log(mainIDs)
  }
  if(!message.content.toLowerCase().startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).split(/ +/), command = args.shift()?.toLowerCase();
  if(!command || !commands.has(command) && !aliases.get(command))return;
  const cmd = commands.get(command) || aliases.get(command);
  if(!cmd)return;
  await cmd.run({ client, message, args });
}