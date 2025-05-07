import mongoose from 'mongoose'



export const connectToDataBase = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.DATABSE_CONNECTION_STRING)
        console.log("MongoDb connecto to the server - : host" , connectionInstance.connection.host);
    } catch (error) {
        console.log("Error from mongo bd connection function : ",error);
        process.exit(1)
    }
}