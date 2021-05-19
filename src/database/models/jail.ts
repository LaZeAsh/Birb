import { Schema, model, Model, Document } from 'mongoose'

interface jailInterface extends Document {
  guildID: string,
  userID: string,
  date: number,
  reason: string
}
const schema = new Schema({
  userID: {
    type: String,
    required: true
  },
  date: {
    type: Number,
    required: true
  },
  reason: {
    type: String,
    required: true
  }
}, {versionKey: false})

const jail: Model<jailInterface> = model('jail', schema, 'jail')

export default jail