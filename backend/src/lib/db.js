import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGODB_URL);
        console.log('MongoDB connected:', con.connection.host);
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1); // Exit process with failure
    }
}
