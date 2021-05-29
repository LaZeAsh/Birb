import { CommandProps, Command } from "../../@types";
import { colors } from '../../index'

export = {
  name: "userinfo",
  category: "util",
  aliases: ["whois", "user"],
  description: "Find the UserInfo of a User",
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
            value: `${member.bot === true ? 'Yes' : 'No'}`
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
            value: `${new Date(r_member.joinedAt).toLocaleString("en-US", {month: "long", weekday: "long", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric", second: "numeric", timeZoneName: "short", })}`,
            inline: true
          }
        ],
        thumbnail: {
          url: member.avatarURL
        },
        color: colors.theme
      }
    })
    return
  } 
} as Command
function get_roles(guild: any, roles_ids: string[]){
  let roles_text = [];
  for(const role_id of roles_ids){
    let role = guild.roles?.get(role_id);
    if(!role)return;
    roles_text.push({ position: role.position, role: role });
  }
  roles_text.sort((a, b) => b.position - a.position);
  return roles_text;
}