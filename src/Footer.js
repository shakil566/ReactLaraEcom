import React from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";

const Footer = () =>{
    return(
        <footer className="py-4 bg-light mt-auto">
                    <div className="container-fluid px-4">
                        <div className="d-flex align-items-center justify-content-between small">
                            <div className="text-muted">Copyright &copy; Your Website 2022</div>
                            <div>
                                <Router>
                                <Link to="#">Privacy Policy</Link>
                                &middot;
                                <Link to="#">Terms &amp; Conditions</Link>
                                </Router>
                                
                            </div>
                        </div>
                    </div>
                </footer>
    );
}

export default Footer;