import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Property from './models/Property.js';

dotenv.config();

const fixPenthouse = async () => {
    try {
        await connectDB();
        
        await Property.updateOne(
            { title: 'Penthouse Suite' },
            { $set: { images: ['https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'] } }
        );
        
        console.log('Penthouse Suite image updated successfully to new url');
        process.exit(0);
    } catch (error) {
        console.error('Error updating:', error);
        process.exit(1);
    }
};

fixPenthouse();
