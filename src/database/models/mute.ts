import { Schema, model, Model, Document } from 'mongoose'

interface Interface extends Document{
  guildID: string,
  userID: string,
  reason: string,
}

const schema = new Schema({
  guildID: {
    type: String,
    required: true
  },
  userID: {
    type: String,
    required: true
  },
  reason: {
    type: String,
    required: true
  }
}, {versionKey: false})

const mute: Model<Interface> = model('mute', schema, 'mute')

export default mute
