import { CommandProps, Command } from "../../@types";
import { colors, deleteMsg } from '../../index'

export = {
  name: "unban",
  category: "mod",
  aliases: [],
  description: "Unban a user!",
  usage: "b!unban mention/id",
  permissions: ["banMembers"],
  run: function(e: CommandProps) {
    const {
      message,
      args,
      client
    } = e
    if(!message.member?.permissions.has("banMembers")) return message.channel.createMessage(`🐦 is sad! You do not have sufficent permissions to unban a user! You can't fool Birb.`)
    let guild = client.guilds.get(message.guildID as string)
    const me = guild?.members.get(client.user.id)
    if(!me?.permissions.has(`banMembers`)) return message.channel.createMessage(`🐦 is sad! I do not have Ban Members permissions to use the command **${this.name}** command!`)
    let member = args[0]
    if(!args[0] && message.mentions[0] === undefined) return message.channel.createMessage(`🐦 is angy! Insufficent Arguments please mention a member to ban! \n \`\`\`${this.usage}\`\`\``)
    if(message.mentions[0] === undefined) member = args[0]
    if(!guild) return
    let memberInfo = client.getRESTUser(member)
    let reason: string = args.slice(1).join(" ")
    if(!reason) reason = "No reason specified"
    guild.unbanMember(member, reason).then(async () => {
      message.channel.createMessage({
        embed: {
          title: `${(await memberInfo).username} has been unbanned!`,
          description: `**${message.author.username}** has unbanned **${(await memberInfo).username}** from **${guild?.name}**`,
          fields: [
            {
              name: `🐦 Birbbed User`,
              value: `${(await memberInfo).username} (ID: **${(await memberInfo).id}**)`
            },
            {
              name: `Reason`,
              value: `${reason}`
            }
          ],
          color: colors.success
        }
      })
    })
  } 
} as Command