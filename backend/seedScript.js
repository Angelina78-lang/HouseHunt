import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import User from './models/User.js';
import Property from './models/Property.js';
import Booking from './models/Booking.js';
import bcrypt from 'bcryptjs';

dotenv.config();
connectDB();

const seedData = async () => {
    try {
        await User.deleteMany();
        await Property.deleteMany();
        await Booking.deleteMany();

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('123456', salt);

        // Create Admin and Users
        const users = await User.insertMany([
            {
                name: 'Admin User',
                email: 'admin@househunt.com',
                password: hashedPassword,
                role: 'admin',
            },
            {
                name: 'John Doe',
                email: 'john@example.com',
                password: hashedPassword,
                role: 'user',
            },
            {
                name: 'Jane Smith',
                email: 'jane@example.com',
                password: hashedPassword,
                role: 'user',
            },
        ]);

        const adminUser = users[0]._id;
        const user1 = users[1]._id;
        const user2 = users[2]._id;

        // Create 10 Properties in India
        const properties = [
            {
                title: 'Oceanview Villa in Anjuna',
                description: 'A spectacular luxury villa with direct views of the Arabian Sea.',
                price: 85000000,
                purpose: 'Buy',
                location: { address: 'Anjuna Beach Road, Goa', lat: 15.5819, lng: 73.7430 },
                images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800'],
                tourVideo: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                bedrooms: 4,
                bathrooms: 4,
                amenities: ['Private Pool', 'Air Conditioning', 'WiFi', 'Sea View'],
                availableFrom: new Date(),
                furnished: true,
                petFriendly: true,
                ownerId: user1,
                status: 'approved',
            },
            {
                title: 'Cozy Apartment near Baga Beach',
                description: 'Perfect for a long stay or quick vacation near North Goa\'s most vibrant beach.',
                price: 45000,
                purpose: 'Rent',
                location: { address: 'Tito\'s Lane, Baga, Goa', lat: 15.5553, lng: 73.7517 },
                images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800'],
                tourVideo: '',
                bedrooms: 2,
                bathrooms: 2,
                amenities: ['WiFi', 'Parking', 'Shared Pool'],
                availableFrom: new Date(),
                furnished: true,
                petFriendly: false,
                ownerId: user2,
                status: 'approved',
            },
            {
                title: 'Luxury Sea-Facing Penthouse in Worli',
                description: 'Wake up to the sound of waves and an unobstructed view of the Bandra-Worli Sea Link.',
                price: 250000000,
                purpose: 'Buy',
                location: { address: 'Annie Besant Road, Worli, Mumbai', lat: 19.0166, lng: 72.8166 },
                images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800'],
                tourVideo: '',
                bedrooms: 5,
                bathrooms: 5,
                amenities: ['Private Elevator', 'Gym', 'Infinity Pool', '24/7 Security'],
                availableFrom: new Date(),
                furnished: true,
                petFriendly: true,
                ownerId: user1,
                status: 'approved',
            },
            {
                title: 'Modern Studio in Bandra West',
                description: 'Live in the heart of Mumbai\'s most happening suburb.',
                price: 60000,
                purpose: 'Rent',
                location: { address: 'Pali Hill, Bandra West, Mumbai', lat: 19.0607, lng: 72.8258 },
                images: ['https://images.unsplash.com/photo-1502672260266-1c1f552378c3?q=80&w=800'],
                tourVideo: '',
                bedrooms: 1,
                bathrooms: 1,
                amenities: ['WiFi', 'Gym Setup', 'Modular Kitchen'],
                availableFrom: new Date(),
                furnished: true,
                petFriendly: false,
                ownerId: user2,
                status: 'approved',
            },
            {
                title: 'Portuguese Heritage House in Panjim',
                description: 'A beautifully restored century-old house in the Fontainhas quarter.',
                price: 120000000,
                purpose: 'Buy',
                location: { address: 'Fontainhas, Panjim, Goa', lat: 15.4909, lng: 73.8278 },
                images: ['https://images.unsplash.com/photo-1588880331179-bc9b93a8cb65?q=80&w=800'],
                tourVideo: '',
                bedrooms: 3,
                bathrooms: 2,
                amenities: ['Antique Furniture', 'Courtyard', 'Library'],
                availableFrom: new Date(),
                furnished: true,
                petFriendly: true,
                ownerId: adminUser,
                status: 'approved',
            },
            {
                title: 'Premium Flat in Andheri East',
                description: 'Spacious apartment near the corporate hub and airport.',
                price: 85000,
                purpose: 'Rent',
                location: { address: 'JB Nagar, Andheri East, Mumbai', lat: 19.1136, lng: 72.8697 },
                images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800'],
                tourVideo: '',
                bedrooms: 3,
                bathrooms: 3,
                amenities: ['Clubhouse', 'Swimming Pool', 'Security', 'Gated Community'],
                availableFrom: new Date(),
                furnished: false,
                petFriendly: true,
                ownerId: user1,
                status: 'approved',
            },
            {
                title: 'Boutique Resort Style Villa in Vagator',
                description: 'Entertain your friends or start a BNB in this 6-bedroom estate.',
                price: 45000000,
                purpose: 'Buy',
                location: { address: 'Vagator Beach Road, Goa', lat: 15.6022, lng: 73.7337 },
                images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800'],
                tourVideo: '',
                bedrooms: 6,
                bathrooms: 6,
                amenities: ['Private Pool', 'Barbecue Area', 'Landscaped Garden'],
                availableFrom: new Date(),
                furnished: true,
                petFriendly: true,
                ownerId: user2,
                status: 'pending',
            },
            {
                title: 'Affordable 1BHK in Colva',
                description: 'A simple, clean, and extremely affordable flat near the beach.',
                price: 18000,
                purpose: 'Rent',
                location: { address: 'Colva, South Goa', lat: 15.2753, lng: 73.9168 },
                images: ['https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=800'],
                tourVideo: '',
                bedrooms: 1,
                bathrooms: 1,
                amenities: ['Balcony', 'Ceiling Fans'],
                availableFrom: new Date(),
                furnished: false,
                petFriendly: true,
                ownerId: user1,
                status: 'approved',
            },
            {
                title: 'High-Rise Sea View Apartment in Juhu',
                description: 'Luxury living facing Juhu Beach.',
                price: 320000000,
                purpose: 'Buy',
                location: { address: 'Juhu Tara Road, Mumbai', lat: 19.1030, lng: 72.8258 },
                images: ['https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=800'],
                tourVideo: '',
                bedrooms: 4,
                bathrooms: 4,
                amenities: ['Sea View', 'Servant Quarters', 'Premium Fittings'],
                availableFrom: new Date(),
                furnished: false,
                petFriendly: false,
                ownerId: user2,
                status: 'approved',
            },
            {
                title: 'Co-living Space in Powai',
                description: 'Perfect for students or young professionals working nearby.',
                price: 25000,
                purpose: 'Rent',
                location: { address: 'Hiranandani Gardens, Powai, Mumbai', lat: 19.1197, lng: 72.9056 },
                images: ['https://images.unsplash.com/photo-1531834685032-c34bf0d5b51b?q=80&w=800'],
                tourVideo: '',
                bedrooms: 1,
                bathrooms: 1,
                amenities: ['WiFi', 'Housekeeping', 'Meals Included'],
                availableFrom: new Date(),
                furnished: true,
                petFriendly: false,
                ownerId: adminUser,
                status: 'rejected',
            },
        ];

        await Property.insertMany(properties);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`Error with data import: ${error}`);
        process.exit(1);
    }
};

seedData();
