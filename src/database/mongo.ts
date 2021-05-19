import mongoose from 'mongoose'
import * as log from 'fancy-log'
export async function mongo() {
  const options = {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify: false,
  }
  mongoose.connect(process.env.MongoDB as string, options).then(() => log.info(`MongoDB is connected`))
}