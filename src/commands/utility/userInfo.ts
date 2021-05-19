import { CommandProps, Command } from "../../@types";
import { colors } from '../../index'
import moment from 'moment'

export = {
  name: "userinfo",
  category: "util",
  aliases: ["whois", "user"],
  description: "Find information about a user!",
  usage: "b!userinfo <mention/tag>",
  run: function(e: CommandProps) { 
    const {
      message,
      args,
      client
    } = e
    let guild_id = message.guildID;
    if(!guild_id)return;
    let guild = client.guilds.get(guild_id);
    if(!guild)return;
    let member = message?.mentions[0]
    if(message?.mentions[0] === undefined) member = message.author
    let r_member = guild?.members.get(member.id), roles = r_member?.roles;
    if(!r_member || !roles)return;
    message.channel.createMessage({
      embed: {
        title: `${member.username}#${member.discriminator}`,
        description: `🐦 A Small Birbscription of ${member.username}`,
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
            value: `${guild.roles?.get(roles[0])?.mention}`,
            inline: true
          },
          {
            name: `📰 Roles`,
            value: `${draw_roles(roles, guild)}`,
            inline: true
          },
          {
            name: `⏲️ Account Creation`,
            value: `${moment(new Date(member.createdAt).toISOString()).format("dddd, MMMM Do YYYY, [at] h:mm a")}`,
          },
          {
            name: `⏲️ Joined At`,
            value: `${moment(new Date(r_member.joinedAt).toISOString()).format("dddd, MMMM Do YYYY, [at] h:mm a")}`,
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
} as Command

function draw_roles(roles_ids: string[], guild: any){
  let roles_text: string[] | string = [];
  for(const role_id of roles_ids){
    let role = guild.roles?.get(role_id);
    if(!role)return;
    roles_text.push(`${role.mention}`);
  }
  if(roles_text.length > 500) roles_text = `🐦 too many roles for birb to count!`
  return roles_text;
}