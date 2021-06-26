import Eris from "eris";
import { CommandProps, Command } from "../../@types";
import { colors, deleteMsg } from '../../index'
import moment from 'moment'
export = {
  name: "userinfo",
  category: "utils",
  aliases: ["user", "ui"],
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
    let ID = ""
    if(!args[0] && message?.mentions[0] === undefined){
      ID = message?.author.id;
    }else if(message?.mentions[0] === undefined && args[0]){
      ID = args[0];
    }else if(message?.mentions[0] !== undefined && args[0]){
      ID = message?.mentions[0].id;
    }
    let member: Eris.Member | null
    try {
      let members = await guild.fetchMembers({userIDs: [ID], limit: 1})
      member = members[0]
    } catch (error) {
      console.log(error)
      member = null
    }
    if(!member) {
      let memberInfo: Promise<Eris.User> | any
      try {
        memberInfo = await client.getRESTUser(ID)
      } catch (error) {
        return message.channel.createMessage(`Member doesn't exist`)
      }
      return message.channel.createMessage({
        embed: {
          title: `${memberInfo.username}#${memberInfo.discriminator}`,
          description: `🐦 a small birbscription of ${memberInfo.username}`,
          fields: [
            {
              name: "📝 Display Name",
              value: `${memberInfo.username}`,
              inline: true
            },
            {
              name: `#️⃣ Discriminator`,
              value: `${memberInfo.discriminator}`,
              inline: true
            },
            {
              name: "🆔 User ID",
              value: `${memberInfo.id}`,
              inline: true
            },
            {
              name: `🤖 Bot`,
              value: `${memberInfo.bot === true ? 'Yes' : 'No'}`,
              inline: true
            },
            {
              name: `⏲️ Account Creation`,
              value: `${new Date(memberInfo.createdAt).toLocaleString("en-US", {month: "long", weekday: "long", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric", second: "numeric", timeZoneName: "short", })} \n ${(Date.now() - (await memberInfo).createdAt)}`,
            },
          ],
          thumbnail: {
            url: memberInfo.avatarURL
          },
          color: colors.theme
        }
      })
    } else {
      let roles = member.roles;
      if(!member || !roles)return;
      let ro = get_roles(guild, roles);
      if(!ro)return;
      message.channel.createMessage({
        embed: {
          title: `${member.username}#${member.discriminator}`,
          description: `🐦 a small birbscription of ${member.username}`,
          fields: [
            {
              name: "📝 Display Name",
              value: `${member.username}`,
              inline: true
            },
            {
              name: `#️⃣ Discriminator`,
              value: `${member.discriminator}`,
              inline: true
            },
            {
              name: "🆔 User ID",
              value: `${member.id}`,
              inline: true
            },
            {
              name: `🤖 Bot`,
              value: `${member.bot === true ? 'Yes' : 'No'}`,
              inline: true
            },
            {
              name: `⏫ Highest Role`,
              value: `${ro[0].role.mention}`,
              inline: true
            },
            {
              name: `📰 Roles`,
              value: `${ro.map((a) => a.role.mention).join(', ')}`,
              inline: true
            },
            {
              name: `⏲️ Account Creation`,
              value: `${new Date(member.createdAt).toLocaleString("en-US", {month: "long", weekday: "long", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric", second: "numeric", timeZoneName: "short", })}`,
            },
            {
              name: `⏲️ Joined At`,
              value: `${new Date(member.joinedAt).toLocaleString("en-US", {month: "long", weekday: "long", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric", second: "numeric", timeZoneName: "short", })}`,
              inline: true
            }
          ],
          thumbnail: {
            url: member.avatarURL
          },
          color: colors.theme
        }
      })
    }
  }
} as Command

function get_roles(guild: any, roles_ids: string[]){
  let roles_text = [];
  for(const role_id of roles_ids){
    let role = guild.roles?.get(role_id);
    if(!role) return
    roles_text.push({ position: role.position, role: role });
  }
  roles_text.sort((a, b) => b.position - a.position);
  return roles_text;
}