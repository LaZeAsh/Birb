import { client } from '../../index'
import { ActivityPartial } from 'eris';
import { commands, aliases } from '../../index'
import * as log from 'fancy-log'
export function ready() {
  log.info(`${client.user.username} is now online`);
  let statuses = [{ name: 'Chirping Away!', type: 2 }, { name: `${commands.size} commands! and ${aliases.size} aliases!`, type: 0 }, { name: `over ${client.guilds.size} servers and ${client.users.size} users!`, type: 3}], idx = 0;
  setInterval(() => {
    statuses = [{ name: 'Chirping Away!', type: 2 }, { name: `${commands.size} commands! and ${aliases.size} aliases!`, type: 0 }, { name: `over ${client.guilds.size} servers and ${client.users.size} users!`, type: 3}], idx = 0;
  }, 1000*1620)
  client.editStatus('online', { name: `${commands.size} commands! and ${aliases.size} aliases!`, type: 0 });
  setInterval(() => {
    if(idx === statuses.length)idx = 0;
    client.editStatus('online', statuses[idx] as ActivityPartial);
    idx++;
  }, 1000*180);
}