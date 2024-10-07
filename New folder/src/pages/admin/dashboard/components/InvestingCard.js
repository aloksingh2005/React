import React from "react";

const InvestingCard = () => (
    <div className="col-sm-6 col-xl-3">
        <div className="card investing-card">
            <div className="card-header pb-0">
                <h4>Investing</h4>
                <div className="dropdown icon-dropdown">
                    <button className="btn dropdown-toggle" id="userdropdown3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="icon-more-alt"></i>
                    </button>
                    <div className="dropdown-menu dropdown-menu-end" aria-labelledby="userdropdown3">
                        <a className="dropdown-item" href="#">Weekly</a>
                        <a className="dropdown-item" href="#">Monthly</a>
                        <a className="dropdown-item" href="#">Yearly</a>
                    </div>
                </div>
            </div>
            <div className="card-body p-0">
                <div className="investing" id="investing"></div>
            </div>
        </div>
    </div>
);

export default InvestingCard;
