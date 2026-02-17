import { log } from "console"
import mongoose from "mongoose"

type ConnectionObject = {
    isConnected? : number
}

const connection : ConnectionObject = {}

async function dbConnected():Promise<void> {
    if(connection.isConnected){
        console.log("Already Connected to database");
        return 
    }

    try {
      const db =  await mongoose.connect(process.env.MONGODB_URL || '',{})
      connection.isConnected =  db.connections[0].readyState

      console.log(db);
      console.log("DB connected Successfully")
    } catch (error) {
        
        console.log("Database Connection failed", error)
        process.exit(1)
    }
}

export default dbConnected