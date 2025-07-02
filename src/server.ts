import { Server} from "http";
import app from './app'
import mongoose from 'mongoose';
import dotenv from "dotenv"
import cors from "cors"
dotenv.config();
let server: Server;
const PORT = 7000;

app.use(cors({origin: "http://localhost:5173"}))
async function main() {
   try {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fmsye.mongodb.net/library-mgt-app?retryWrites=true&w=majority&appName=Cluster0`);
    console.log("Connected to MongoDB using Mongoose");
    server = app.listen(PORT, ()=> { 
        console.log(`App is listening on port ${PORT}`);
    })
   } catch (error) {
    
   } 
}

main();