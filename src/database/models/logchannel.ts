import { Schema, model, Model, Document } from 'mongoose'

interface Interface extends Document{
  guildID: string,
  channelID: string
}

const schema = new Schema({
  guildID: {
    type: String,
    required: true
  },
  channelID: {
    type: String,
    required: true
  }
}, {versionKey: false})

const logChannel: Model<Interface> = model('logchannel', schema, 'logchannel')

export default logChannel
