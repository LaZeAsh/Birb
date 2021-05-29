import { CommandProps, Command } from "../../@types";
import { colors, deleteMsg } from '../../index'
import { commands, aliases } from '../../index'
import fs from 'fs'
import path from 'path'
import * as log from 'fancy-log'


export = {
  name: "resetandler",
  category: "dev",
  aliases: ["resetcommands", "reload"],
  description: "Reload the commands",
  usage: "b!resethandler",
  run: function(e: CommandProps) {
    const {
      message,
      args,
      client
    } = e
    commands.clear()
    console.log(`Cleared commands array`)
    aliases.clear()
    console.log(`Cleared aliases array`)
    
    const commandFolder = fs.readdirSync(path.resolve(__dirname, `../../commands`))
    for (const folder of commandFolder) {
      const commandFile = fs.readdirSync(path.resolve(__dirname, `../../commands/${folder}`)).filter(file => file.endsWith('.ts'));
      for (const file of commandFile) {
        const cmd = require(`../../commands/${folder}/${file}`) as Command;
        commands.set(cmd.name, cmd);
        if(!cmd.aliases)continue;
        if(cmd.aliases.length > 0)for(const alias of cmd.aliases){aliases.set(alias, cmd); }
      }
    }
  } 
} as Command