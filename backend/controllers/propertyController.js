import Property from '../models/Property.js';
import User from '../models/User.js';

// @desc    Fetch all properties (with filters)
// @route   GET /api/properties
// @access  Public
export const getProperties = async (req, res) => {
    try {
        const { keyword, minPrice, maxPrice, bedrooms, petFriendly, furnished, status, purpose } = req.query;

        let query = {};

        // Only show approved properties to public by default, unless admin requests otherwise
        query.status = status || 'approved';

        if (purpose) {
            query.purpose = purpose;
        }

        if (keyword) {
            query.$or = [
                { title: { $regex: keyword, $options: 'i' } },
                { 'location.address': { $regex: keyword, $options: 'i' } },
            ];
        }
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }
        if (bedrooms) {
            query.bedrooms = Number(bedrooms);
        }
        if (petFriendly === 'true') {
            query.petFriendly = true;
        }
        if (furnished === 'true') {
            query.furnished = true;
        }

        const properties = await Property.find(query).populate('ownerId', 'name avatar');
        res.json(properties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Fetch single property
// @route   GET /api/properties/:id
// @access  Public
export const getPropertyById = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id).populate('ownerId', 'name avatar email');
        if (property) {
            res.json(property);
        } else {
            res.status(404).json({ message: 'Property not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a property
// @route   POST /api/properties
// @access  Private
export const createProperty = async (req, res) => {
    try {
        const {
            title,
            description,
            price,
            location,
            images,
            tourVideo,
            bedrooms,
            bathrooms,
            amenities,
            availableFrom,
            furnished,
            petFriendly
        } = req.body;

        const property = new Property({
            title,
            description,
            price,
            location,
            images, // Coming from Cloudinary upload later
            tourVideo,
            bedrooms,
            bathrooms,
            amenities,
            availableFrom,
            furnished,
            petFriendly,
            ownerId: req.user._id,
            status: 'pending', // Requires admin approval
        });

        const createdProperty = await property.save();
        res.status(201).json(createdProperty);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update property status (Approve/Reject)
// @route   PUT /api/properties/:id/status
// @access  Private/Admin
export const updatePropertyStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const property = await Property.findById(req.params.id);

        if (property) {
            property.status = status; // 'approved' or 'rejected'
            const updatedProperty = await property.save();
            res.json(updatedProperty);
        } else {
            res.status(404).json({ message: 'Property not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user's properties
// @route   GET /api/properties/myproperties
// @access  Private
export const getMyProperties = async (req, res) => {
    try {
        const properties = await Property.find({ ownerId: req.user._id });
        res.json(properties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user's favorite properties
// @route   GET /api/properties/favorites
// @access  Private
export const getFavoriteProperties = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('favorites');
        res.json(user.favorites || []);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Toggle Favorite property
// @route   POST /api/properties/:id/favorite
// @access  Private
export const toggleFavorite = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        const user = await User.findById(req.user._id);

        if (!property || !user) {
            return res.status(404).json({ message: 'Not found' });
        }

        const favoritesArray = user.favorites || [];
        const isFavorited = favoritesArray.some((id) => id.toString() === property._id.toString());

        if (isFavorited) {
            await User.findByIdAndUpdate(user._id, { $pull: { favorites: property._id } });
            await Property.findByIdAndUpdate(property._id, { $pull: { likes: { userId: user._id } } });
        } else {
            await User.findByIdAndUpdate(user._id, { $push: { favorites: property._id } });
            await Property.findByIdAndUpdate(property._id, { $push: { likes: { userId: user._id } } });
        }

        res.json({ isFavorited: !isFavorited });
    } catch (error) {
        console.error('Favorite error trace:', error);
        res.status(500).json({ message: error.message, stack: error.stack });
    }
};

// @desc    Get Property Stats (Avg price by location)
// @route   GET /api/properties/stats
// @access  Public
export const getPropertyStats = async (req, res) => {
    try {
        const stats = await Property.aggregate([
            { $match: { status: 'approved' } },
            {
                $group: {
                    _id: '$location.address', // simplify to exact address for now, could parse city
                    avgPrice: { $avg: '$price' },
                    count: { $sum: 1 },
                },
            },
            { $sort: { count: -1 } },
            { $limit: 5 } // Top 5 locations
        ]);
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
