import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongod = null;

const connectDB = async () => {
    try {
        let mongoUri = process.env.MONGO_URI;

        if (mongoUri.includes('localhost')) {
            console.log('Using MongoDB Memory Server for seamless local setup...');
            mongod = await MongoMemoryServer.create();
            mongoUri = mongod.getUri();
        }

        const conn = await mongoose.connect(mongoUri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
