import React, { useState, useEffect, useContext } from 'react';
import api from '../utils/axiosConfig';
import AuthContext from '../context/AuthContext';
import PropertyCard from '../components/PropertyCard';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('bookings');

    const [myBookings, setMyBookings] = useState([]);
    const [myListings, setMyListings] = useState([]);
    const [myFavorites, setMyFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        } else {
            fetchDashboardData();
        }
    }, [user, navigate]);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const [bookingsRes, listingsRes, favoritesRes] = await Promise.all([
                api.get('/api/bookings/mybookings'),
                api.get('/api/properties/myproperties'),
                api.get('/api/properties/favorites'),
            ]);
            setMyBookings(bookingsRes.data);
            setMyListings(listingsRes.data);
            setMyFavorites(favoritesRes.data);
        } catch (error) {
            toast.error('Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="text-center py-5"><div className="spinner-border"></div></div>;

    return (
        <div>
            <h2 className="mb-4">Welcome, {user?.name}</h2>

            <ul className="nav nav-tabs mb-4">
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'bookings' ? 'active' : ''}`}
                        onClick={() => setActiveTab('bookings')}
                    >
                        My Tours & Leases
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'listings' ? 'active' : ''}`}
                        onClick={() => setActiveTab('listings')}
                    >
                        My Properties
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'favorites' ? 'active fw-bold' : ''}`}
                        onClick={() => setActiveTab('favorites')}
                    >
                        <i className="bi bi-heart-fill text-danger me-2"></i>Favorites
                    </button>
                </li>
            </ul>

            {activeTab === 'bookings' && (
                <div>
                    <h4>My Applications</h4>
                    {myBookings.length === 0 ? (
                        <p>You have no upcoming applications. <Link to="/">Explore properties</Link></p>
                    ) : (
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Property</th>
                                        <th>Move In</th>
                                        <th>Move Out</th>
                                        <th>Total Price</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {myBookings.map(b => (
                                        <tr key={b._id}>
                                            <td>
                                                <Link to={`/property/${b.propertyId?._id}`}>{b.propertyId?.title || 'Unknown Property'}</Link>
                                            </td>
                                            <td>{new Date(b.checkIn).toLocaleDateString()}</td>
                                            <td>{new Date(b.checkOut).toLocaleDateString()}</td>
                                            <td>${b.totalPrice.toLocaleString()}</td>
                                            <td>
                                                <span className={`badge bg-${b.status === 'confirmed' ? 'success' : b.status === 'cancelled' ? 'danger' : 'warning'}`}>
                                                    {b.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'listings' && (
                <div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4>My Listings</h4>
                        <Link to="/sell" className="btn btn-primary btn-sm">+ List a Property</Link>
                    </div>
                    {myListings.length === 0 ? (
                        <p>You haven't listed any properties yet.</p>
                    ) : (
                        <div className="row g-4">
                            {myListings.map(p => (
                                <div key={p._id} className="col-md-6 col-lg-4">
                                    <PropertyCard property={p} />
                                    <div className="mt-2 text-center">
                                        <span className={`badge bg-${p.status === 'approved' ? 'success' : p.status === 'rejected' ? 'danger' : 'secondary'}`}>
                                            Status: {p.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'favorites' && (
                <div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4>Saved Properties</h4>
                        <Link to="/" className="btn btn-outline-primary btn-sm">Discover More</Link>
                    </div>
                    {myFavorites.length === 0 ? (
                        <p>You haven't saved any favorite properties yet.</p>
                    ) : (
                        <div className="row g-4">
                            {myFavorites.map(p => (
                                <div key={p._id} className="col-md-6 col-lg-4">
                                    <PropertyCard property={p} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

        </div>
    );
};

export default Dashboard;
