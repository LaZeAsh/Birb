import { Schema, model, Model, Document } from 'mongoose'

interface Interface extends Document {
  guildID: string,
  roleID: string
}

const schema = new Schema({
  guildID: {
    type: String,
    required: true
  },
  roleID: {
    type: String,
    required: true
  }
}, { versionKey: false })

const muteRole: Model<Interface> = model('muteRole', schema, 'muteRole')

export default muteRole