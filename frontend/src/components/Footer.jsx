import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-dark text-white pt-4 pb-2 mt-5">
            <div className="container text-center text-md-left">
                <div className="row">
                    <div className="col-md-6 mx-auto mb-4">
                        <h5 className="text-uppercase font-weight-bold">HouseHunt</h5>
                        <p>Find your perfect home anywhere in the world.</p>
                    </div>
                    <div className="col-md-6 mx-auto mb-4">
                        <ul className="list-unstyled">
                            <li className="my-2"><a href="#!" className="text-white text-decoration-none">About Us</a></li>
                            <li className="my-2"><a href="#!" className="text-white text-decoration-none">Contact Support</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-copyright text-center py-3 border-top border-secondary">
                &copy; {new Date().getFullYear()} HouseHunt. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;
