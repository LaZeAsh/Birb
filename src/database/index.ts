//Actual Mongo Function that connects to the bot
import { mongo } from './mongo'
export { mongo }

//Database Models
import { 
  afk,
  ban,
  jail,
  kick,
  logChannel,
  mute,
  warn,
  welcome,
  muteRole
} from './models'
export {
  afk,
  ban,
  jail,
  kick,
  logChannel,
  mute,
  warn,
  welcome,
  muteRole
}