import Booking from '../models/Booking.js';
import Property from '../models/Property.js';

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
export const createBooking = async (req, res) => {
    try {
        const { propertyId, checkIn, checkOut, totalPrice } = req.body;

        // Check availability
        const existingBookings = await Booking.find({
            propertyId,
            status: { $in: ['pending', 'confirmed'] },
            $or: [
                { checkIn: { $lt: new Date(checkOut) }, checkOut: { $gt: new Date(checkIn) } },
            ],
        });

        if (existingBookings.length > 0) {
            return res.status(400).json({ message: 'Dates are already booked' });
        }

        const booking = new Booking({
            propertyId,
            userId: req.user._id,
            checkIn,
            checkOut,
            totalPrice,
            status: 'pending',
        });

        const createdBooking = await booking.save();
        res.status(201).json(createdBooking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get logged in user bookings
// @route   GET /api/bookings/mybookings
// @access  Private
export const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ userId: req.user._id }).populate('propertyId', 'title images');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all bookings (Admin)
// @route   GET /api/bookings
// @access  Private/Admin
export const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({}).populate('userId', 'name email').populate('propertyId', 'title');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id/status
// @access  Private/Admin
export const updateBookingStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const booking = await Booking.findById(req.params.id);

        if (booking) {
            booking.status = status;
            const updatedBooking = await booking.save();
            res.json(updatedBooking);
        } else {
            res.status(404).json({ message: 'Booking not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
