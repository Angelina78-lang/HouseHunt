import mongoose from 'mongoose';

const likeSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    date: {
        type: Date,
        default: Date.now,
    },
}, { _id: false });

const propertySchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        location: {
            address: { type: String, required: true },
            lat: { type: Number },
            lng: { type: Number },
        },
        images: [
            {
                type: String,
            }
        ],
        tourVideo: {
            type: String, // YouTube or Vimeo embed URL
        },
        bedrooms: {
            type: Number,
            required: true,
        },
        bathrooms: {
            type: Number,
            required: true,
        },
        amenities: [
            {
                type: String,
            }
        ],
        availableFrom: {
            type: Date,
            required: true,
        },
        furnished: {
            type: Boolean,
            default: false,
        },
        petFriendly: {
            type: Boolean,
            default: false,
        },
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            default: 'pending',
        },
        purpose: {
            type: String,
            enum: ['Buy', 'Rent'],
            required: true,
            default: 'Buy',
        },
        likes: [likeSchema],
    },
    {
        timestamps: true,
    }
);

const Property = mongoose.model('Property', propertySchema);
export default Property;
