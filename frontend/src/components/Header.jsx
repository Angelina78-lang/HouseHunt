import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Header = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark hh-header">
                <div className="container">
                    <Link className="navbar-brand fw-bold fs-3" to="/">
                        <i className="bi bi-house-door-fill me-2"></i>HouseHunt
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto ms-4 d-none d-lg-flex">
                            <li className="nav-item">
                                <Link className={`nav-link fw-semibold ${location.pathname === '/' ? 'text-white border-bottom border-2' : 'text-white-50'}`} to="/">Buy</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link fw-semibold ${location.pathname === '/rent' ? 'text-white border-bottom border-2' : 'text-white-50'}`} to="/rent">Rent</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link fw-semibold ${location.pathname === '/sell' ? 'text-white border-bottom border-2' : 'text-white-50'}`} to="/sell">Sell</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link fw-semibold ${location.pathname === '/agents' ? 'text-white border-bottom border-2' : 'text-white-50'}`} to="/agents">Agents</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav ms-auto align-items-center mt-3 mt-lg-0">
                            {user ? (
                                <>
                                    <li className="nav-item me-3">
                                        <span className="nav-link text-white fw-medium">Hi, {user.name.split(' ')[0]}</span>
                                    </li>
                                    <li className="nav-item me-2">
                                        <Link className="nav-link text-white" to="/dashboard">Dashboard</Link>
                                    </li>
                                    {user.role === 'admin' && (
                                        <li className="nav-item me-2">
                                            <Link className="nav-link text-warning fw-bold" to="/admin">Admin</Link>
                                        </li>
                                    )}
                                    <li className="nav-item">
                                        <button className="btn btn-light rounded-pill px-4 fw-bold" style={{ color: 'var(--hh-primary)' }} onClick={handleLogout}>Logout</button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link text-white fw-bold me-3" to="/login">Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="btn btn-light rounded-pill px-4 fw-bold" style={{ color: 'var(--hh-primary)' }} to="/register">Sign Up</Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
