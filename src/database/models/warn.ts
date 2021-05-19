import { Schema, model, Model, Document } from 'mongoose'

interface Interface extends Document{
  guildID: string,
  userID: string,
  warnID: string,
  reason: string
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
  warnID: {
    type: String,
    required: true
  },
  reason: {
    type: String,
    required: false
  }
}, {versionKey: false})

const warn: Model<Interface> = model('warn', schema, 'warn')

export default warn
