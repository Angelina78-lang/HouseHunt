import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';
import api from '../utils/axiosConfig';

const BookingModal = ({ property, show, onClose }) => {
    const [checkIn, setCheckIn] = useState(null);
    const [checkOut, setCheckOut] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        if (checkIn && checkOut) {
            const diffTime = Math.abs(checkOut - checkIn);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            // Minimum 1 day
            const days = diffDays === 0 ? 1 : diffDays;
            setTotalPrice(days * property.price);
        } else {
            setTotalPrice(0);
        }
    }, [checkIn, checkOut, property]);

    const handleBooking = async () => {
        if (!checkIn || !checkOut) {
            toast.error('Please select both check-in and check-out dates');
            return;
        }

        try {
            await api.post('/api/bookings', {
                propertyId: property._id,
                checkIn,
                checkOut,
                totalPrice
            });
            toast.success('Booking requested successfully!');
            onClose();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to book');
        }
    };

    if (!show) return null;

    return (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Lease {property.title}</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label className="form-label">Move-in Date</label>
                            <DatePicker
                                selected={checkIn}
                                onChange={(date) => setCheckIn(date)}
                                selectsStart
                                startDate={checkIn}
                                endDate={checkOut}
                                minDate={new Date()}
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Move-out Date</label>
                            <DatePicker
                                selected={checkOut}
                                onChange={(date) => setCheckOut(date)}
                                selectsEnd
                                startDate={checkIn}
                                endDate={checkOut}
                                minDate={checkIn || new Date()}
                                className="form-control"
                            />
                        </div>

                        <div className="d-flex justify-content-between my-3 py-2 border-top border-bottom">
                            <span className="fw-bold">Total Price:</span>
                            <span className="fw-bold text-primary">${totalPrice.toLocaleString()}</span>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                        <button type="button" className="btn btn-primary" onClick={handleBooking} disabled={!totalPrice}>
                            Request Lease
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;
