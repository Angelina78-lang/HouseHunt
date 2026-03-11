import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/axiosConfig';
import AuthContext from '../context/AuthContext';
import { toast } from 'react-toastify';

const PropertyCard = ({ property }) => {
    const { user, setUser } = useContext(AuthContext);
    const isFavorited = user?.favorites?.includes(property._id);
    const [favorite, setFavorite] = useState(isFavorited || false);

    const toggleFavorite = async (e) => {
        e.preventDefault();
        if (!user) {
            toast.error('Please login to save properties');
            return;
        }
        try {
            const { data } = await api.post(`/api/properties/${property._id}/favorite`);
            setFavorite(data.isFavorited);

            // Update local user state
            const updatedUser = { ...user };
            if (!updatedUser.favorites) updatedUser.favorites = [];
            
            if (data.isFavorited) {
                updatedUser.favorites.push(property._id);
                toast.success('Added to favorites!');
            } else {
                updatedUser.favorites = updatedUser.favorites.filter(id => id !== property._id);
                toast.info('Removed from favorites');
            }
            setUser(updatedUser);
            localStorage.setItem('userInfo', JSON.stringify(updatedUser));
        } catch (error) {
            toast.error('Failed to update favorite');
        }
    };

    return (
        <div className="card h-100 shadow-sm position-relative border-0 rounded-4 overflow-hidden" style={{ transition: 'all 0.3s ease' }}>
            <div className="position-absolute top-0 end-0 p-3" style={{ zIndex: 10 }}>
                <button
                    onClick={toggleFavorite}
                    className="btn btn-light rounded-circle p-2 shadow-sm d-flex align-items-center justify-content-center"
                    style={{ width: '40px', height: '40px' }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill={favorite ? 'red' : 'currentColor'} className="bi bi-heart-fill" viewBox="0 0 16 16">
                        {favorite ? (
                            <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                        ) : (
                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 8 1.314 12.721-3.04 23.333 4.868 8 15z" />
                        )}
                    </svg>
                </button>
            </div>

            <div id={`carousel-${property._id}`} className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    {property.images && property.images.length > 0 ? (
                        property.images.map((img, index) => (
                            <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                <img src={img} className="d-block w-100 card-img-top" style={{ height: '220px', objectFit: 'cover' }} alt={property.title} />
                            </div>
                        ))
                    ) : (
                        <div className="carousel-item active">
                            <img src="https://via.placeholder.com/800x400?text=No+Image" className="d-block w-100 card-img-top" style={{ height: '220px', objectFit: 'cover' }} alt="Placeholder" />
                        </div>
                    )}
                </div>
                {property.images && property.images.length > 1 && (
                    <>
                        <button className="carousel-control-prev" type="button" data-bs-target={`#carousel-${property._id}`} data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target={`#carousel-${property._id}`} data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </>
                )}
            </div>

            <div className="card-body d-flex flex-column p-4">
                <h5 className="card-title text-truncate fw-bold mb-1 fs-5 text-dark">{property.title}</h5>
                <p className="card-text text-muted small mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-geo-alt me-1 mb-1" viewBox="0 0 16 16">
                        <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                        <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    </svg>
                    {property.location.address.split(',')[0]}
                </p>
                <div className="mb-3">
                    <span className="badge bg-light text-dark border me-2 py-2 px-3 rounded-pill">{property.bedrooms} Bed</span>
                    <span className="badge bg-light text-dark border py-2 px-3 rounded-pill">{property.bathrooms} Bath</span>
                </div>
                <div className="mt-auto pt-3 border-top d-flex justify-content-between align-items-center">
                    <div>
                        <span className="fs-3 fw-black" style={{ color: 'var(--hh-primary-dark)', fontWeight: 800 }}>${property.price.toLocaleString()}</span> {property.purpose === 'Rent' ? <span className="fs-6 text-muted">/mo</span> : null}
                    </div>
                    <Link to={`/property/${property._id}`} className="hh-btn-primary text-decoration-none" style={{ padding: '8px 24px', fontSize: '14px', borderRadius: '24px' }}>
                        View
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;
