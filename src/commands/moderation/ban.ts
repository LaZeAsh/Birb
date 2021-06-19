import Eris, { User } from "eris";
import { CommandProps, Command } from "../../@types";
import { client, colors, deleteMsg } from '../../index'

export = {
  name: "ban",
  category: "mod",
  aliases: [],
  description: "Ban a User!",
  usage: "b!ban <user/tag> [reason]",
  permissions: ["banMembers"],
  run: async function(e: CommandProps) {
    const {
      message,
      args,
      client
    } = e
    if(!message.member?.permissions.has("banMembers")) return message.channel.createMessage(`🐦 is sad! You do not have sufficent permissions to ban a user! You can't fool Birb. \n \`\`\`${this.usage}\`\`\``)
    let guild = client.guilds.get(message.guildID as string)
    const me = guild?.members.get(client.user.id)
    if(!me?.permissions.has(`banMembers`)) return message.channel.createMessage(`🐦 is sad! I do not have Ban Members permissions to use the command **${this.name}** command! \n \`\`\`${this.usage}\`\`\``)
    let member: any = message?.mentions[0]
    if(!member) member = args[0]
    if(!args[0] && message.mentions[0] === undefined) return message.channel.createMessage(`🐦 is angy! Insufficent Arguments please mention a member to ban! \n \`\`\`${this.usage}\`\`\``)
    if(message.mentions[0] === undefined) member = args[0]
    if(!guild) return
    // let authorPosition = get_roles(guild, message.author)
    // let memberPosition = get_roles(guild, member)
    // if(!authorPosition || !memberPosition) return console.log(`Failed to grab positions in ban.ts line 29`)
    // if(memberPosition >= authorPosition) return message.channel.createMessage(`🐦 is angy! I cannot let you use this command! The person you are trying to ban has a higher role than you! \`\`\`${this.usage}\`\`\``)
    let memberInfo: Promise<User>
    if(guild.members.get(`${member}`)) {
      let reason = args.slice(1).join(" ")
      if(!reason) reason = "No reason specified"
      //Send member a message
      try {
        await client.getDMChannel(member.id as string).then((channel) => {
          channel.createMessage({
            embed: {
              title: `You have been banned!`,
              description: `You have been banned from **${guild?.name}**!`,
              fields: [
                {
                  name: `Guild Name`,
                  value: `${guild?.name}`,
                  inline: true
                },
                {
                  name: `Reason`,
                  value: `${reason}`,
                  inline: true
                }
              ],
              color: colors.error
            }
          })
        })
      } catch (error) {
        message.channel.createMessage(`🐦 is sad! I couldn't DM ${member.username}`)
      }
      guild.banMember(member, 0, `${reason}`).then(async () => {
        message.channel.createMessage({
          embed: {
            title: `${member.username} has been banned!`,
            description: `**${message.author.username}** has banned **${member.username}** from **${guild?.name}**`,
            fields: [
              {
                name: `🐦 Birbbed User`,
                value: `<@!${member.id}> (ID: **${member.id}**)`,
              },
              {
                name: `Reason`,
                value: `${reason}`,
              }
            ],
            color: colors.error
          }
        })
      })
    } else {
      memberInfo = client.getRESTUser(member)
      let reason = args.slice(1).join(" ")
      if(!reason) reason = "No reason specified"
      //Banning Member
      guild.banMember(member, 0, `${reason}`).then(async () => {
        message.channel.createMessage({
          embed: {
            title: `${(await memberInfo).username} has been banned!`,
            description: `**${message.author.username}** has banned **${(await memberInfo).username}** from **${guild?.name}**`,
            fields: [
              {
                name: `🐦 Birbbed User`,
                value: `<@!${(await memberInfo).id}> (ID: **${(await memberInfo).id}**)`,
              },
              {
                name: `Reason`,
                value: `${reason}`,
              }
            ],
            color: colors.error
          }
        })
      })
    }
  }
} as Command

async function dmUser(member: Eris.Member, client: Eris.Client, message: any) {
  let userDM = await client.getDMChannel(member.id as string)
  userDM.createMessage(message)
}
function get_roles(guild: any, roles_ids: any){
  let roles_text: number[] = [];
  for(const role_id of roles_ids){
    let role = guild.roles?.get(role_id)
    if(!role)return;
    //role: role if you ever need the role
    console.log(role.position)
    roles_text.push(role.position);
  }
  roles_text.sort((a: any, b: any) => b.position - a.position);
  return roles_text[0];
}
