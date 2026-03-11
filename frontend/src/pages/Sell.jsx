import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/axiosConfig';
import { toast } from 'react-toastify';
import AuthContext from '../context/AuthContext';

const Sell = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        purpose: 'Buy',
        propertyType: 'House',
        bedrooms: '',
        bathrooms: '',
        address: '',
        city: '',
        imageUrl: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const uploadData = new FormData();
        uploadData.append('image', file);
        setUploading(true);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            const { data } = await api.post('/api/upload', uploadData, config);
            setFormData(prev => ({ ...prev, imageUrl: data.url }));
            toast.success('Media uploaded successfully!');
        } catch (error) {
            console.error(error);
            toast.error('File upload failed. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            toast.error('You must be logged in to list a property.');
            return navigate('/login?redirect=/sell');
        }
        setLoading(true);
        try {
            const payload = {
                title: formData.title,
                description: formData.description,
                price: Number(formData.price),
                purpose: formData.purpose,
                propertyType: formData.propertyType,
                bedrooms: Number(formData.bedrooms),
                bathrooms: Number(formData.bathrooms),
                availableFrom: new Date(),
                location: {
                    address: formData.address,
                    city: formData.city,
                    state: '',
                    zipCode: ''
                },
                images: formData.imageUrl ? [formData.imageUrl] : [
                    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80'
                ]
            };
            await api.post('/api/properties', payload);
            toast.success('Property listed successfully!');
            navigate('/dashboard');
        } catch (error) {
            console.error('List property error:', error);
            toast.error(error.response?.data?.message || 'Property creation failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5 pt-4 mb-5" style={{ maxWidth: '800px' }}>
            <div className="mb-4">
                <Link to="/dashboard" className="text-decoration-none text-muted">&larr; Back to Dashboard</Link>
            </div>
            
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
                <div className="bg-primary text-white p-4 text-center">
                    <h2 className="fw-bold mb-0">List Your Property</h2>
                    <p className="mb-0 text-white-50">Reach thousands of potential buyers and renters.</p>
                </div>
                
                <div className="card-body p-4 p-md-5">
                    <form onSubmit={handleSubmit}>
                        <div className="row g-4">
                            {/* Basic Info */}
                            <div className="col-12">
                                <h5 className="fw-bold border-bottom pb-2 mb-3">Basic Information</h5>
                            </div>
                            
                            <div className="col-md-8">
                                <label className="form-label fw-semibold">Property Title <span className="text-danger">*</span></label>
                                <input type="text" className="form-control form-control-lg" name="title" value={formData.title} onChange={handleChange} placeholder="e.g., Modern Downtown Loft" required />
                            </div>
                            
                            <div className="col-md-4">
                                <label className="form-label fw-semibold">Purpose <span className="text-danger">*</span></label>
                                <select className="form-select form-select-lg" name="purpose" value={formData.purpose} onChange={handleChange}>
                                    <option value="Buy">For Sale</option>
                                    <option value="Rent">For Rent</option>
                                </select>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Property Type <span className="text-danger">*</span></label>
                                <select className="form-select" name="propertyType" value={formData.propertyType} onChange={handleChange}>
                                    <option value="House">House</option>
                                    <option value="Apartment">Apartment</option>
                                    <option value="Condo">Condo</option>
                                    <option value="Villa">Villa</option>
                                </select>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Price (USD) {formData.purpose === 'Rent' && '/mo'} <span className="text-danger">*</span></label>
                                <div className="input-group">
                                    <span className="input-group-text">$</span>
                                    <input type="number" className="form-control" name="price" value={formData.price} onChange={handleChange} placeholder="1500" required />
                                </div>
                            </div>

                            {/* Details */}
                            <div className="col-12 mt-4">
                                <h5 className="fw-bold border-bottom pb-2 mb-3">Property Details</h5>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Bedrooms <span className="text-danger">*</span></label>
                                <input type="number" className="form-control" name="bedrooms" value={formData.bedrooms} onChange={handleChange} min="0" required />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Bathrooms <span className="text-danger">*</span></label>
                                <input type="number" step="0.5" className="form-control" name="bathrooms" value={formData.bathrooms} onChange={handleChange} min="0" required />
                            </div>

                            <div className="col-12">
                                <label className="form-label fw-semibold">Description <span className="text-danger">*</span></label>
                                <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} rows="4" placeholder="Describe the key features of your property..." required></textarea>
                            </div>

                            {/* Location & Media */}
                            <div className="col-12 mt-4">
                                <h5 className="fw-bold border-bottom pb-2 mb-3">Location & Media</h5>
                            </div>

                            <div className="col-md-8">
                                <label className="form-label fw-semibold">Street Address <span className="text-danger">*</span></label>
                                <input type="text" className="form-control" name="address" value={formData.address} onChange={handleChange} placeholder="123 Main St" required />
                            </div>

                            <div className="col-md-4">
                                <label className="form-label fw-semibold">City <span className="text-danger">*</span></label>
                                <input type="text" className="form-control" name="city" value={formData.city} onChange={handleChange} placeholder="New York" required />
                            </div>

                            <div className="col-12 mb-4">
                                <label className="form-label fw-semibold">Property Image or Walkthrough Video</label>
                                <input type="file" className="form-control" onChange={uploadFileHandler} accept="image/*,video/*" />
                                {uploading && <div className="form-text text-info fw-bold mt-2"><span className="spinner-border spinner-border-sm me-2"></span>Uploading file...</div>}
                                {formData.imageUrl && (
                                    <div className="mt-3 p-3 bg-light border rounded">
                                        <div className="badge bg-success mb-2 px-3 py-2"><i className="bi bi-check-circle me-2"></i>File Uploaded Successfully</div>
                                        <input type="text" className="form-control text-muted mb-2" value={formData.imageUrl} disabled />
                                        {formData.imageUrl.match(/\.(mp4|webm|mkv|avi|mov)$/i) ? (
                                            <video src={formData.imageUrl} className="img-thumbnail" style={{ maxHeight: '150px' }} controls />
                                        ) : (
                                            <img src={formData.imageUrl} alt="Uploaded preview" className="img-thumbnail" style={{ maxHeight: '150px' }} />
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="col-12">
                                <button type="submit" className="btn btn-primary btn-lg w-100 py-3 fw-bold rounded-pill shadow-sm" disabled={loading}>
                                    {loading ? <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> : null}
                                    Submit Listing
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Sell;
