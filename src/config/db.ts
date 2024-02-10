import { connect } from 'mongoose'

export const connectDB = async () => {
  try {
      await connect(process.env.DB_URI as string)
      console.log('Database connection established')
  } catch (err) {
    console.error('Database connection error' + err)
  }
}
