import { Schema, model, Model, Document } from 'mongoose'

interface Interface extends Document{
  userID: string,
  guildID: string,
  reason: string,
  victimID: string
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
  victimID: {
    type: String,
    required: true
  },
  reason: {
    type: String,
    required: false
  }
}, {versionKey: false})

const kick: Model<Interface> = model('kick', schema, 'kick')

export default kick
