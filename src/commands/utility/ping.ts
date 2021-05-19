import { CommandProps, Command } from "../../@types";
import mongoose from 'mongoose'
import { colors } from '../../index'
export = {
  name: "ping",
  category: "utility",
  aliases: ["ping-pong", "latency"],
  description: "Find Birb's Ping!",
  usage: "b!ping",
  run: function(e: CommandProps) {
    async function mongoPing() {
      const latency: any = await mongoose.connection.db.admin().ping()
      const returnedTime: any = Date.now() - latency
      return returnedTime
    }
    let ping: string;
    const {
      message,
      args,
      client
    } = e
    
    client.createMessage(e.message.channel.id, {
      embed: {
        title: "Pinging!",
        description: `🐦 No Worries! Mr.Birb Man is finding your ping!`,
        color: colors.theme
      }
    }).then((msg) => msg.edit({
      embed: {
        title: `${client.user.username}'s Ping`,
        fields: [
          {
            name: `Ping`,
            value: `${Date.now() - message.createdAt}ms`
          }
        ],
        color: colors.theme
      }
    }))
  }
} as Command
