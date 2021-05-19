import { Schema, model, Model, Document } from 'mongoose'

interface afkInterface extends Document {
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

const afk: Model<afkInterface> = model('afk', schema, 'afk')

export default afk