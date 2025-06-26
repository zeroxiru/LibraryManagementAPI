import { Server} from "http";
import app from './app'
import mongoose from 'mongoose';
let server: Server;
const PORT = 7000;
async function main() {
   try {
    await mongoose.connect("mongodb+srv://mongodb:mongodb@cluster0.fmsye.mongodb.net/library-mgt-app?retryWrites=true&w=majority&appName=Cluster0");
    console.log("Connected to MongoDB using Mongoose");
    server = app.listen(PORT, ()=> { 
        console.log(`App is listening on port ${PORT}`);
    })
   } catch (error) {
    
   } 
}

main();