import { Schema, model, Model, Document } from 'mongoose'

interface banInterface extends Document {
  guildID: string,
  date: number,
  modID: string,
  victimID: string,
}

const schema = new Schema({
  guildID: {
    type: String,
    required: true
  },
  date: {
    type: Number,
    required: true
  },
  modID: {
    type: String,
    required: true
  },
  victimID: {
    type: String,
    required: true
  }
}, {versionKey: false})

const ban: Model<banInterface> = model('ban', schema, 'ban')

export default ban

