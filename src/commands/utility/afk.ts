// import { CommandProps, Command } from "../../@types";
// import { afk }  from '../../database'
// export = {
//   name: "afk",
//   category: "utility",
//   aliases: ["inactive"],
//   description: "Afk Command!",
//   usage: "b!afk [reason]",
//   run: function(e: CommandProps) {
//     const {
//       message,
//       args,
//       client
//     } = e
//     return
//     let afkReason: string = args.slice(0).join(" ")
//     if(!afkReason) afkReason = "AFK"
//     if(afkReason.length > 75) return message.channel.createMessage(`🐦 is angy! Please keep the length of your AFK message under 75 characters!`)
//     afk.create({
//       userID: `${message.author.id}-${message.guildID}`,
//       date: Date.now(),
//       reason: afkReason
//     })
//   }
// } as Command