import React from 'react';
import "./not-found.css";
import notFoundPng from "assets/images/error/404.png";
import { Link } from 'react-router-dom';

export default function NotFound() {

    return (
        <>
            <main className="page-wrapper compact-wrapper" id="pageWrapper">
                {/* <!-- error-400 start--> */}
                <div className="error-wrapper">
                    <div className="container">
                        <div className="svg-wrraper">
                            <img src={notFoundPng} alt='Not Found' className='img-fluid' />
                        </div>
                        <div className="col-md-8 offset-md-2">
                            <h3>Oops! This Page is Not Found.</h3>
                            <p className="sub-content">The page you are attempting to reach is currently not available. This may be because the page does not exist or has been moved.</p>
                            <Link className="btn btn-primary" to="/">BACK TO HOME PAGE</Link>
                        </div>
                    </div>
                </div>
                {/* <!-- error-400 end--> */}
            </main>
        </>
    );
}
