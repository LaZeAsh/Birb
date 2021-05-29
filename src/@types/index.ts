import Eris, {
  Message
} from 'eris'
import * as eris from 'eris'
import { client } from '../index'

export interface props {
  client: typeof client
  message: Message
}

export interface CommandProps {
  client: typeof client
  message: Message
  args: string[]
}

export interface Constants {
  error: number
  success: number
  theme: number 
}

export interface MessageProps extends Message {
  args: string[]
  constants: Constants
  log: Log
}

export interface Log {
  success(...content: Array<string>): void
  log(...content: Array<string>): void
  info(...content: Array<string>): void
  warn(...content: Array<string>): void
  debug(...content: Array<string>): void
}

export let modIDs: string[]
export interface Command {
  name: string
  category: string
  usage?: string
  description?: string
  aliases?: string[]
  permissions?: [
    "createInstantInvite" |
    "kickMembers" |
    "banMembers" |
    "administrator" |
    "manageChannels" |
    "manageGuild" |
    "addReactions" |
    "viewAuditLog" |
    "viewAuditLogs" |
    "voicePrioritySpeaker" |
    "voiceStream" |
    "stream" |
    "viewChannel" |
    "readMessages" |
    "sendMessages" |
    "sendTTSMessages" |
    "manageMessages" |
    "embedLinks" |
    "attachFiles" |
    "readMessageHistory" |
    "mentionEveryone" |
    "useExternalEmojis" |
    "externalEmojis" |
    "voiceConnect" |
    "voiceSpeak" |
    "voiceMuteMembers" |
    "voiceDeafenMembers" |
    "voiceMoveMembers" |
    "voiceUseVAD" |
    "changeNickname" |
    "manageNicknames" |
    "manageRoles" |
    "manageWebhooks" |
    "manageEmojis" |
    "useSlashCommands" |
    "voiceRequestToSpeak" |
    "allGuild" |
    "allText" |
    "allVoice" |
    "all"
  ]
  run: Function
}
