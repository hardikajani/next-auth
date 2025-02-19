import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI!)
    const connection = mongoose.connection

    connection.on('connected', () => {
        console.log('Database connected');
    })
    connection.on('error', (error:any) => {
        console.log('Error connecting to database' + error);
        process.exit();
        
    })

  } catch (error:any) {
    console.log('Error connecting to database');
    console.log(error);
  }
}