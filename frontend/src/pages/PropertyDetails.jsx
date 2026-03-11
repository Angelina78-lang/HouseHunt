import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/axiosConfig';
import AuthContext from '../context/AuthContext';
import BookingModal from '../components/BookingModal';
import MapView from '../components/MapView';
import MortgageCalculator from '../components/MortgageCalculator';
import { toast } from 'react-toastify';

const PropertyDetails = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showContact, setShowContact] = useState(false);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetchProperty();
    }, [id]);

    const fetchProperty = async () => {
        try {
            const { data } = await api.get(`/api/properties/${id}`);
            setProperty(data);
        } catch (error) {
            toast.error('Failed to fetch property details');
        } finally {
            setLoading(false);
        }
    };

    const handleContactSubmit = (e) => {
        e.preventDefault();
        toast.success('Message sent successfully!');
        setShowContact(false);
    };

    if (loading) return <div className="text-center py-5"><div className="spinner-border"></div></div>;
    if (!property) return <div className="alert alert-danger">Property not found</div>;

    return (
        <div>
            <Link to="/" className="btn btn-light mb-4 shadow-sm rounded-pill px-4">&larr; Go Back</Link>
            
            <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                    <h2 className="fw-bold mb-1" style={{ fontSize: '2.5rem', color: 'var(--hh-primary-dark)' }}>{property.title}</h2>
                    <p className="text-muted fs-5 mb-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-geo-alt-fill me-2 text-danger" viewBox="0 0 16 16">
                            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                        </svg>
                        {property.location.address}
                    </p>
                </div>
            </div>

            <div className="row g-4">
                <div className="col-md-8">
                    <div id="propertyCarousel" className="carousel slide mb-5" data-bs-ride="carousel">
                        <div className="carousel-inner rounded-4 shadow-sm">
                            {property.images && property.images.length > 0 ? (
                                property.images.map((img, idx) => (
                                    <div key={idx} className={`carousel-item ${idx === 0 ? 'active' : ''}`}>
                                        <img src={img} className="d-block w-100" style={{ maxHeight: '500px', objectFit: 'cover' }} alt={property.title} />
                                    </div>
                                ))
                            ) : (
                                <div className="carousel-item active">
                                    <img src="https://via.placeholder.com/800x500" className="d-block w-100" alt="Placeholder" />
                                </div>
                            )}
                        </div>
                        {property.images && property.images.length > 1 && (
                            <>
                                <button className="carousel-control-prev" type="button" data-bs-target="#propertyCarousel" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#propertyCarousel" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </>
                        )}
                    </div>

                    <h4 className="fw-bold mb-3">About this home</h4>
                    <p className="text-muted" style={{ lineHeight: '1.8' }}>{property.description}</p>

                    <h4 className="fw-bold mb-3 mt-5">Overview</h4>
                    <div className="row g-3 mb-5">
                        <div className="col-6 col-md-4">
                            <div className="p-3 border rounded-3 text-center bg-light">
                                <span className="d-block text-muted small text-uppercase fw-semibold mb-1">Bedrooms</span>
                                <span className="fw-bold fs-5">{property.bedrooms}</span>
                            </div>
                        </div>
                        <div className="col-6 col-md-4">
                            <div className="p-3 border rounded-3 text-center bg-light">
                                <span className="d-block text-muted small text-uppercase fw-semibold mb-1">Bathrooms</span>
                                <span className="fw-bold fs-5">{property.bathrooms}</span>
                            </div>
                        </div>
                        <div className="col-6 col-md-4">
                            <div className="p-3 border rounded-3 text-center bg-light">
                                <span className="d-block text-muted small text-uppercase fw-semibold mb-1">Furnished</span>
                                <span className="fw-bold fs-5">{property.furnished ? 'Yes' : 'No'}</span>
                            </div>
                        </div>
                        <div className="col-6 col-md-4">
                            <div className="p-3 border rounded-3 text-center bg-light">
                                <span className="d-block text-muted small text-uppercase fw-semibold mb-1">Pet Friendly</span>
                                <span className="fw-bold fs-5">{property.petFriendly ? 'Yes' : 'No'}</span>
                            </div>
                        </div>
                        <div className="col-6 col-md-4">
                            <div className="p-3 border rounded-3 text-center bg-light">
                                <span className="d-block text-muted small text-uppercase fw-semibold mb-1">Available</span>
                                <span className="fw-bold fs-5">{new Date(property.availableFrom).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>

                    {property.amenities && property.amenities.length > 0 && (
                        <div className="mb-4">
                            <h4>Amenities</h4>
                            <div className="d-flex flex-wrap gap-2">
                                {property.amenities.map((amenity, idx) => (
                                    <span key={idx} className="badge bg-light text-dark border p-2">{amenity}</span>
                                ))}
                            </div>
                        </div>
                    )}

                    {property.tourVideo && (
                        <div className="mb-4">
                            <h4>Virtual Tour</h4>
                            <div className="ratio ratio-16x9">
                                <iframe src={property.tourVideo} title="Virtual Tour" allowFullScreen></iframe>
                            </div>
                        </div>
                    )}

                    <div className="mb-4">
                        <h4>Location</h4>
                        <MapView properties={[property]} />
                    </div>

                    <MortgageCalculator price={property.price} />
                </div>

                <div className="col-md-4">
                    <div className="card shadow-sm sticky-top" style={{ top: '20px' }}>
                        <div className="card-body">
                            <h3 className="card-title text-primary">${property.price.toLocaleString()} {property.purpose === 'Rent' ? <span className="fs-6 text-muted">/mo</span> : null}</h3>
                            <hr />

                            <div className="d-grid gap-2">
                                {user ? (
                                    <>
                                        <button className="btn btn-success btn-lg" onClick={() => setShowModal(true)}>
                                            Schedule a Tour
                                        </button>
                                        <button className="btn btn-outline-primary" onClick={() => setShowContact(true)}>
                                            Contact Agent
                                        </button>
                                    </>
                                ) : (
                                    <Link to={`/login?redirect=/property/${property._id}`} className="btn btn-primary btn-lg">
                                        Login to Schedule
                                    </Link>
                                )}
                            </div>

                            {showContact && (
                                <div className="mt-4 p-3 border rounded bg-light">
                                    <h5 className="mb-3">Message Agent</h5>
                                    <form onSubmit={handleContactSubmit}>
                                        <textarea className="form-control mb-2" rows="3" placeholder="Hello, I have a question about..."></textarea>
                                        <button type="submit" className="btn btn-sm btn-primary w-100">Send Message</button>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <BookingModal
                property={property}
                show={showModal}
                onClose={() => setShowModal(false)}
            />
        </div>
    );
};

export default PropertyDetails;
