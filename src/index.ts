//Defining Basic dependencies and packages we are gonna be using
import dotenv from 'dotenv'
dotenv.config()
import Eris, { Client, Message } from 'eris'
import * as fs from 'fs'
import * as path from 'path'
const client = new Client(process.env.TOKEN as string, { autoreconnect: true, restMode: true })
const prefix: string = "b!"
import * as log from 'fancy-log'
import { Command, Constants } from './@types'

const colors: Constants = {
  error: 0xff0000, //#ff0000
  theme: 0x28eaff, //#28eaff
  success:0x00ff1c //#00ff1c
}
// Database 
import {
  mongo
} from './database'

//Executing the mongo function 
mongo()

// Command Handling \\
let commands: Map<string, any> = new Map()
let aliases: Map<string, any> = new Map()
//Reading Commands folder
const commandFolder = fs.readdirSync(path.resolve(__dirname, `./commands`))
for (const folder of commandFolder) {
  const commandFile = fs.readdirSync(path.resolve(__dirname, `./commands/${folder}`)).filter(file => file.endsWith('.ts'));
  for (const file of commandFile) {
    const cmd = require(`./commands/${folder}/${file}`) as Command;
    log.info(`${cmd.name} in ${folder}`);
    commands.set(cmd.name, cmd);
    if(!cmd.aliases)continue;
    if(cmd.aliases.length > 0)for(const alias of cmd.aliases){log.info(`${alias} configed to ${cmd.name}`); aliases.set(alias, cmd); }
  }
}

// Event Handling \\
import {
 message,
  ready
} from './events'

client.on('ready', ready)
client.on('messageCreate', message)
client.on('error', async(error) => {
  log.info(`Error event working`)
  client.createMessage(`820734674460213299`, {
    embed: {
      title: "Error",
      description: `\`${error}\``,
      color: colors.error
    }
  })
})
client.connect()

//Global Functions

function deleteMsg(message: Message, mili_seconds: number, reason?: string): any{
  if(!message || !mili_seconds)return console.log('Missing parameters');
  if(!reason)reason = 'No reason provided';
  setTimeout(() => message.delete(reason).catch((error: any) => {
    client.createMessage(process.env.errrorChannel as string, {
      embed: {
        title: `Error`,
        description: `Failed deleting a message`,
        color: colors.error
      }
    })
  }), mili_seconds)
}

function secondsToTimeV2(secs: number) {
  secs = Math.round(secs);
  let days = Math.floor(secs / 60 / 60 / 24), hours = Math.floor(secs / 60 / 60) % 24, minutes = Math.floor(secs / 60) % 60, seconds = secs % 60, obj = { "d": days, "h": hours, "m": minutes, "s": seconds };
  let time = '';
  if(obj.d)time += `${obj.d}${obj.d === 1 ? ' day' : 'days'} `;
  if(obj.h)time += `${obj.h}${obj.h === 1 ? ' h' : ' hrs'} `;
  if(obj.m)time += `${obj.m} m `;
  if(obj.s)time += `${obj.s} s`; 
  return time;
}


export { client, prefix, commands, aliases, colors, deleteMsg, secondsToTimeV2 }
