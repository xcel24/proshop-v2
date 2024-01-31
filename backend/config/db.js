import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`Mongo DB connected with the hostname ${conn.connection.host}`)
  } catch (error) {
    console.error(`Error is ${error.message}`)
    process.exit(1)
  }
}

export default connectDB
