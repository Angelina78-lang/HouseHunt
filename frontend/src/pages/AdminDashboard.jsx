import React, { useState, useEffect, useContext } from 'react';
import api from '../utils/axiosConfig';
import AuthContext from '../context/AuthContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [properties, setProperties] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/');
            toast.error('Not authorized as an admin');
        } else {
            fetchAdminData();
        }
    }, [user, navigate]);

    const fetchAdminData = async () => {
        try {
            setLoading(true);
            // Fetch all properties by passing an empty status search to get pending ones too
            const [propsRes, bookingsRes, statsRes] = await Promise.all([
                api.get('/api/properties?status=pending'), // get pending for approval
                api.get('/api/properties'), // get approved for general view
                api.get('/api/bookings'),
                api.get('/api/properties/stats')
            ]);

            // Combine for simple view, though we can just fetch all without status if we update backend or make multiple calls
            const allProps = await api.get('/api/properties'); // backend default is 'approved'
            // To keep it simple, let's fetch pending properties manually by overriding status config
            const pendingProps = await api.get('/api/properties?status=pending');

            setProperties([...pendingProps.data, ...allProps.data].filter((v, i, a) => a.findIndex(t => (t._id === v._id)) === i));
            setBookings(bookingsRes.data);
            setStats(statsRes.data);
        } catch (error) {
            toast.error('Failed to load admin data');
        } finally {
            setLoading(false);
        }
    };

    const handlePropertyStatus = async (id, status) => {
        try {
            await api.put(`/api/properties/${id}/status`, { status });
            toast.success(`Property marked as ${status}`);
            fetchAdminData();
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    if (loading) return <div className="text-center py-5"><div className="spinner-border"></div></div>;

    const chartData = {
        labels: stats.map(s => s._id.split(',')[0]),
        datasets: [
            {
                label: 'Average Price ($)',
                data: stats.map(s => s.avgPrice),
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
            }
        ]
    };

    return (
        <div>
            <h2 className="mb-4">Admin Dashboard</h2>

            <div className="row mb-5">
                <div className="col-md-6">
                    <div className="card shadow-sm h-100">
                        <div className="card-body">
                            <h5 className="card-title">Average Price per Location</h5>
                            {stats.length > 0 ? (
                                <Bar options={{ maintainAspectRatio: false }} data={chartData} height={250} />
                            ) : (
                                <p>No stats available</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card shadow-sm h-100 bg-primary text-white">
                        <div className="card-body d-flex flex-column justify-content-center align-items-center">
                            <h3 className="display-4 fw-bold">{bookings.length}</h3>
                            <h5>Total Bookings Made</h5>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card shadow-sm mb-5">
                <div className="card-header bg-white">
                    <h4 className="mb-0">Property Approval Workflow</h4>
                </div>
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th>Title</th>
                                    <th>Location</th>
                                    <th>Price</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {properties.map(p => (
                                    <tr key={p._id}>
                                        <td>{p.title}</td>
                                        <td>{p.location.address}</td>
                                        <td>${p.price}</td>
                                        <td>
                                            <span className={`badge bg-${p.status === 'approved' ? 'success' : p.status === 'rejected' ? 'danger' : 'warning'}`}>
                                                {p.status}
                                            </span>
                                        </td>
                                        <td>
                                            {p.status === 'pending' && (
                                                <>
                                                    <button className="btn btn-sm btn-success me-2" onClick={() => handlePropertyStatus(p._id, 'approved')}>Approve</button>
                                                    <button className="btn btn-sm btn-danger" onClick={() => handlePropertyStatus(p._id, 'rejected')}>Reject</button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AdminDashboard;
