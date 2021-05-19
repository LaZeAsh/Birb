// import { CommandProps, Command } from "../../@types";
// import { colors, deleteMsg } from '../../index'
// import { muteRole } from '../../database'
// export = {
//   name: "muterole",
//   category: "admin",
//   aliases: ["rolemute"],
//   description: "Set the mute role for your server!",
//   usage: "b!muterole <role-mention>",
//   permissions: ['administrator'],
//   run: function(e: CommandProps) {
//     const {
//       message,
//       args,
//       client
//     } = e
//     if(!message.member?.permissions.has(this.permissions)) return message.channel.createMessage(`🐦 is sad! You do not have **${this.permissions}** to execute **${this.permissions}** command!`)
//     if(message.roleMentions[0] === undefined) return message.channel.createMessage(`🐦 is angy! Please mention a role for me to set the mute role to! \`\`\`b!muterole <role-mention>\`\`\``)
//     let role = message.roleMentions[0]
//     try {
//       muteRole.findOne({ guildID: message.guildID }, async(doc: any) => {
//         doc.roleID = role
//         return await doc.save()
//       })
//       await muteRole.create({
//         guildID: message.guildID,
//         roleID: role
//       })
//     } catch (error) {
      
//     }
//   } 
// } as Command