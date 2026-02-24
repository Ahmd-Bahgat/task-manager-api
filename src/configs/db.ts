import mongoose from "mongoose"

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI as string)
    .then(()=>console.log('mongoDB connected successfully'))
    .catch(()=> console.log('mongoDB connection failed'))
}

export default connectDB