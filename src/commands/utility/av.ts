import Eris from "eris";
import { CommandProps, Command } from "../../@types";
import { colors, deleteMsg } from '../../index'

export = {
  name: "ov",
  category: "",
  aliases: [],
  description: "",
  usage: "",
  run: async function(e: CommandProps) {
    const {
      message,
      args,
      client
    } = e
    let guild = client.guilds.get(message.guildID as string)
    if(!guild) return
    let ID: string = ""
    if(message?.mentions[0] === undefined && args[0]) {
      ID = args[0]
    } else if(message?.mentions[0] !== undefined && args[0]) {
      ID = message?.mentions[0].id
    } else {
      return message.channel.createMessage(`No Args lol`)
    }
    console.log(`ID of the user is ${ID}`)
    let user: Eris.User | Eris.Member | null = null
    try {
      user = (await guild.fetchMembers({ userIDs: [ID], limit: 1 }))[0]
      // console.log(user)
      console.log(`Guild`)
      console.log(user.id)
    } catch (error) {
      try {
        console.log(`Rest`)
        // user = await client.getRESTUser(ID)
        // client.requestHandler.request("GET", `/users/${ID}`, true).then((users: any) => {
        //   console.log(users)
        //   user = new Eris.User(users, client)
        // })
        let info = await getUserID(client, ID)
        console.log(info)
        // console.log(user)
        // if(!user) return
        // console.log(user.id)
      } catch (error) {
        message.channel.createMessage(`The user doesn't exist lul`)
      }
    }
  }
} as Command

async function getUserID(client: Eris.Client, ID: string) {
  await client.requestHandler.request("GET", `/users/${ID}`, true).then(async (users: any) => {
    // console.log(users)
    console.log(users.id)
    let user = new Eris.User(users, client)
    return user
  })
}