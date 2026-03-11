import React, { useState, useEffect } from 'react';
import api from '../utils/axiosConfig';
import PropertyCard from '../components/PropertyCard';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const Home = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    // Search form state
    const [purpose, setPurpose] = useState('Buy');
    const [keyword, setKeyword] = useState('');
    const [checkIn, setCheckIn] = useState(new Date());
    const [checkOut, setCheckOut] = useState(new Date(new Date().setDate(new Date().getDate() + 1)));
    const [guests, setGuests] = useState(2);
    const [rooms, setRooms] = useState(1);

    useEffect(() => {
        const filters = { purpose };
        if (keyword) filters.keyword = keyword;
        fetchProperties(filters);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [purpose]);

    const fetchProperties = async (filters) => {
        try {
            setLoading(true);
            const queryParams = new URLSearchParams(filters).toString();
            const { data } = await api.get(`/api/properties?${queryParams}`);
            setProperties(data);
        } catch (error) {
            toast.error('Failed to load properties');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        // Since backend doesn't take checkin/checkout for search natively without complex logic,
        // we will filter visually by keyword (title/location matches keyword)
        const filters = { purpose };
        if (keyword) filters.keyword = keyword;
        fetchProperties(filters);
    };

    return (
        <div style={{ marginTop: '-1rem' }}>
            {/* HOUSEHUNT HERO SECTION */}
            <div className="hh-hero">
                <div className="container">
                    <h2 className="fw-bold mb-4">Find Your Dream Home</h2>

                    {/* Radio Options */}
                    <div className="d-flex justify-content-center mb-5">
                        <div className="btn-group bg-white p-1 rounded-pill shadow-sm" role="group">
                            <input type="radio" className="btn-check" name="purposeRadio" id="buy" autoComplete="off" value="Buy" checked={purpose === 'Buy'} onChange={(e) => setPurpose(e.target.value)} />
                            <label className="btn btn-outline-primary border-0 rounded-pill px-5 fw-bold" htmlFor="buy">Buy</label>

                            <input type="radio" className="btn-check" name="purposeRadio" id="rent" autoComplete="off" value="Rent" checked={purpose === 'Rent'} onChange={(e) => setPurpose(e.target.value)} />
                            <label className="btn btn-outline-primary border-0 rounded-pill px-5 fw-bold" htmlFor="rent">Rent</label>
                        </div>
                    </div>
                </div>
            </div>

            {/* SEARCH WIDGET (OVERLAPPING HERO) */}
            <div className="container">
                <div className="hh-search-widget">
                    <form onSubmit={handleSearch}>
                        <div className="row g-0 align-items-center">
                            {/* Where */}
                            <div className="col-12 col-lg-3">
                                <div className="search-input-group">
                                    <label className="search-label">Location / Keyword</label>
                                    <input
                                        type="text"
                                        className="search-value"
                                        placeholder="e.g. Goa, Mumbai, Villa"
                                        value={keyword}
                                        onChange={(e) => setKeyword(e.target.value)}
                                    />
                                    <small className="text-muted d-block text-truncate" style={{ fontSize: '11px' }}>Search by city or name</small>
                                </div>
                            </div>

                            {/* Move-in */}
                            <div className="col-6 col-lg-2">
                                <div className="search-input-group">
                                    <label className="search-label">Move-in Date</label>
                                    <DatePicker
                                        selected={checkIn}
                                        onChange={(date) => { setCheckIn(date); if (date >= checkOut) setCheckOut(new Date(date.getTime() + 86400000)); }}
                                        className="search-value cursor-pointer"
                                        dateFormat="dd MMM yy"
                                        minDate={new Date()}
                                        customInput={<input />}
                                    />
                                    <small className="text-muted d-block" style={{ fontSize: '11px' }}>{checkIn.toLocaleDateString('en-US', { weekday: 'long' })}</small>
                                </div>
                            </div>

                            {/* Flexible (replacing Check-out) */}
                            <div className="col-6 col-lg-2">
                                <div className="search-input-group">
                                    <label className="search-label">Lease Term</label>
                                    <select className="search-value cursor-pointer w-100" style={{ WebkitAppearance: 'none' }} defaultValue="Flexible">
                                        <option value="Flexible">Flexible</option>
                                        <option value="1 Year">1 Year</option>
                                        <option value="2 Years">2 Years</option>
                                    </select>
                                    <small className="text-muted d-block" style={{ fontSize: '11px' }}>Duration</small>
                                </div>
                            </div>

                            {/* Beds & Baths */}
                            <div className="col-12 col-lg-3">
                                <div className="search-input-group no-border" onClick={() => {
                                    const newG = window.prompt('Number of Beds?', guests);
                                    const newR = window.prompt('Number of Baths?', rooms);
                                    if (newG) setGuests(Number(newG));
                                    if (newR) setRooms(Number(newR));
                                }}>
                                    <label className="search-label">Beds & Baths</label>
                                    <div className="search-value cursor-pointer">
                                        {guests} Beds, {rooms} Bath
                                    </div>
                                    <small className="text-muted d-block" style={{ fontSize: '11px' }}>Click to edit</small>
                                </div>
                            </div>

                            {/* Search Button */}
                            <div className="col-12 col-lg-2 text-center text-lg-end pe-lg-3 mt-3 mt-lg-0">
                                <button type="submit" className="hh-btn-primary w-100 py-3">Search</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* OFFERS & LISTINGS */}
            <div className="container mt-5 pt-3 mb-5">
                <h3 className="fw-bold mb-4">Trending Properties</h3>

                {loading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : properties.length === 0 ? (
                    <div className="alert alert-info">No properties match your exact search criteria.</div>
                ) : (
                    <div className="row g-4">
                        {properties.map(property => (
                            <div key={property._id} className="col-md-6 col-xl-4">
                                <PropertyCard property={property} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
