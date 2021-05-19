import { CommandProps, Command } from "../../@types";
import mongoose from 'mongoose'
import { colors } from '../../index'

import { Shard } from 'eris'
import { message } from "../../events";

export = {
  name: "ping",
  category: "utility",
  aliases: ["ping-pong", "pong"],
  description: "Find Birb's Ping!",
  usage: "b!ping",
  run: async function(e: CommandProps) {
    const {
      message,
      args,
      client
    } = e
    
    const time = Date.now(); 
    await mongoose.connection.db.admin().ping().then(p => {
    let pong = Date.now() - time


    message.channel.createMessage({
      embed:{
        title: "Pinging!",
        description: `🐦 No Worries! Mr. Birb Man is finding your ping! Also can birbs even play ping-pong?`,
        color: colors.theme
      }
    }).then((msg) => msg.edit({
      embed: {
        title: 'Birb\'s Ping',
        description: `**Ping**\n${msg.createdAt - message.createdAt}ms\n\n**Database**\n${pong}ms`,
        color: colors.theme
      }
    }))
    })
  }
  
} as Command