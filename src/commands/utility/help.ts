import { commands, prefix, aliases, colors } from '../../index'
import { CommandProps, Command } from "../../@types";
export = { 
  name: 'help', 
  category: 'util',
  description: 'Shows help page',
  usage: 'b!help [category]',
  run: function(e: CommandProps){
    const {
      message,
      args,
      client
    } = e
    if(!e.args[0]){
      // return e.client.createMessage(e.message.channel.id, { embed: { title: `Help page | Prefix: ${prefix}`, description: `**Possible categories:\n1. Util\n2. Moderation\n3. Fun**`, color: 1146986, footer: { icon_url: e.message.author.dynamicAvatarURL('jpg'), text: `ID: ${e.message.author.id}` } } });
      message.channel.createMessage({
        embed: {
          title: `🐦 Birbby Help Commands! | Prefix: ${prefix}`,
          description: `*Psst~* if you want to support us please go here! [birb/patreon](https://www.patreon.com/birbby) \nUsage: **b!help category/command**`,
          fields: [
            {
              name: `ℹ️ Utility`,
              value: `Commands that will help you!`,
            },
            {
              name: `🔨 Moderation`,
              value: `Commands that will keep your server safe!`,
            },
            {
              name: `🪅 Fun`,
              value: `Commands that will make your server more enjoyable`,
            },
            {
              name: `<:admin:858432071235141664> Admin`,
              value: `Admin Commands to set up certain features of Birb in your server!`
            }
          ],
          color: colors.theme
        }
      })
    }else{
      const cmd_name = e.args[0]?.toLowerCase();
      if(commands.has(cmd_name)){
        const cmd = commands.get(cmd_name);
        if(!cmd)return e.client.createMessage(e.message.channel.id, `Failed to grab command information`);
        return e.client.createMessage(e.message.channel.id, { embed: { title: `🐦 Birbby Help Commands! | Prefix: ${prefix}`, description: '**<> - Required | [] - Optional**\n', fields: [{ name: '\u200b', value: 'Command Name: `'+`${cmd.name}`+'`' }, { name: '\u200b', value: 'Command Description: `'+`${cmd?.description}`+'`'}, { name: '\u200b', value: 'Command Usage: `'+`${cmd?.usage}`+'`'}, { name: '\u200b', value: 'Command Aliases: `'+`${cmd?.aliases?.join(', ') === undefined ? 'No aliases' : cmd?.aliases?.join(', ')}`+'`'}], color: colors.theme, footer: { icon_url: e.message.author.dynamicAvatarURL('jpg'), text: `ID: ${e.message.author.id}` } } });
      }else if(aliases.has(cmd_name)){
        const aliasName = aliases.get(cmd_name);
        if(!aliasName)return e.client.createMessage(e.message.channel.id, `Failed to grab command information`);
        const cmd = commands.get(aliasName.name);
        if(!cmd)return e.client.createMessage(e.message.channel.id, `Failed to grab command information`);
        return e.client.createMessage(e.message.channel.id, { embed: { title: `🐦 Birbby Help Commands! | Prefix: ${prefix}`, description: '**<> - Required | [] - Optional**\n', fields: [{ name: '\u200b', value: 'Command Name: `'+`${cmd.name}`+'`' }, { name: '\u200b', value: 'Command Descritption: `'+`${cmd?.description}`+'`'}, { name: '\u200b', value: 'Command Usage: `'+`${cmd?.usage}`+'`'}, { name: '\u200b', value: 'Command Aliases: `'+`${cmd?.aliases?.join(', ') === undefined ? 'No aliases' : cmd?.aliases?.join(', ')}`+'`'}], color: colors.theme, footer: { icon_url: e.message.author.dynamicAvatarURL('jpg'), text: `ID: ${e.message.author.id}` } } });
      }else{
        if(cmd_name === 'moderation' || cmd_name === 'mod'){
          const cmds_text = get_cmds_from_category('moderation');
          return e.client.createMessage(e.message.channel.id, { embed: { title: `🐦 Birbby Help Commands! | Prefix: ${prefix}`, description: `**${cmds_text}**`, color: colors.theme }});
        }else if(cmd_name === 'utils' || cmd_name === 'utility'){
          const cmds_text = get_cmds_from_category('util');
          return e.client.createMessage(e.message.channel.id, { embed: { title: `🐦 Birbby Help Commands! | Prefix: ${prefix}`, description: `**${cmds_text}**`, color: colors.theme } });
        }else if(cmd_name === 'fun'){
          const cmds_text = get_cmds_from_category('fun');
          return e.client.createMessage(e.message.channel.id, { embed: { title: `🐦 Birbby Help Commands! | Prefix: ${prefix}`, description: `**${cmds_text}**`, color: colors.theme } });
        }else if(cmd_name === 'admin'){
          const cmds_text = get_cmds_from_category('admin')
          return e.message.channel.createMessage({ embed: { title: `🐦 Birbby Help Commands! | Prefix: ${prefix}`, description: `**${cmds_text}**`, color: colors.theme }})
        }else return e.client.createMessage(e.message.channel.id, { embed: { title: `🐦 Birbby Help Commands! | Prefix: ${prefix}`, description: `**Failed to find category or command name**`, color: colors.theme  }});
      }
    }
  }
} as Command

function get_cmds_from_category(category: string){
  const cmds: string[] = [];
  commands.forEach((e, name) => {
    if(e.category === category){
      cmds.push('`' + name + '`');
    }
  });
  return cmds.join(', ');
}