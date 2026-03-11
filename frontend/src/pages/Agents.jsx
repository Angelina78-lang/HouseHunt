import React from 'react';

import { Link } from 'react-router-dom';

const agentsData = [
    { id: 1, name: 'Aarav Sharma', role: 'Luxury Property Specialist', desc: 'Focusing on premium estates and sea-facing apartments in South Mumbai.', img: 11, location: 'Mumbai' },
    { id: 2, name: 'Priya Patel', role: 'Senior Real Estate Consultant', desc: 'Specializing in luxury beachfront properties and vacation homes in Goa.', img: 5, location: 'Goa' },
    { id: 3, name: 'Rajesh Kumar', role: 'Commercial Real Estate Agent', desc: 'Expert in office spaces, retail shops, and commercial investing in Pune.', img: 12, location: 'Pune' },
    { id: 4, name: 'Vikram Singh', role: 'Residential Advisor', desc: 'Helping families find their perfect suburban homes and villas in Delhi.', img: 8, location: 'Delhi' }
];

const Agents = () => {
    return (
        <div className="container mt-5 pt-4 mb-5" style={{ minHeight: '60vh' }}>
            <div className="text-center mb-5">
                <h1 className="fw-bold" style={{ color: 'var(--hh-primary-dark)' }}>Meet Our Expert Agents</h1>
                <p className="lead text-muted">Dedicated professionals ready to help you find your dream home in India.</p>
            </div>

            <div className="row g-4 justify-content-center">
                {agentsData.map((agent) => (
                    <div key={agent.id} className="col-md-6 col-lg-3">
                        <div className="card h-100 border-0 shadow-sm text-center p-4 agent-card">
                            <img
                                src={`https://i.pravatar.cc/150?img=${agent.img}`}
                                className="rounded-circle mb-3 mx-auto shadow"
                                alt={agent.name}
                                style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                            />
                            <h5 className="fw-bold mb-1">{agent.name}</h5>
                            <p className="text-muted small mb-3">{agent.role}</p>
                            <p className="small mb-4">{agent.desc}</p>
                            <Link to={`/?keyword=${agent.location}`} className="btn btn-outline-primary rounded-pill w-100 mt-auto">View {agent.location} Listings</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Agents;
