import React, { useState, useEffect } from 'react';
import api from '../utils/axiosConfig';
import PropertyCard from '../components/PropertyCard';

const Rent = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRentals = async () => {
            try {
                // Fetch only approved rental properties
                const { data } = await api.get('/api/properties?purpose=Rent');
                setProperties(data);
            } catch (error) {
                console.error("Error fetching rentals:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRentals();
    }, []);

    return (
        <div className="container mt-5 pt-4 mb-5" style={{ minHeight: '60vh' }}>
            <h2 className="fw-bold mb-4" style={{ color: 'var(--hh-primary-dark)' }}>Properties for Rent</h2>
            <p className="text-muted mb-4">Find your perfect rental home, apartment, or condo.</p>

            {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : properties.length === 0 ? (
                <div className="alert alert-info">We couldn't find any rental properties at the moment. Please check back later!</div>
            ) : (
                <div className="row g-4">
                    {properties.map(property => (
                        <div key={property._id} className="col-md-6 col-lg-4 col-xl-3">
                            <PropertyCard property={property} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Rent;
