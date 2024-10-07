import React from "react";

const ProjectCard = () => (
    <div className="col-sm-6 col-xl-3">
        <div className="card project-card">
            <div className="card-header">
                <h4>Project Overview</h4>
                <div className="dropdown icon-dropdown">
                    <button className="btn dropdown-toggle" id="userdropdown7" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="icon-more-alt"></i>
                    </button>
                    <div className="dropdown-menu dropdown-menu-end" aria-labelledby="userdropdown7">
                        <a className="dropdown-item" href="#">Weekly</a>
                        <a className="dropdown-item" href="#">Monthly</a>
                        <a className="dropdown-item" href="#">Yearly</a>
                    </div>
                </div>
            </div>
            <div className="card-body pt-0">
                <h4>56<span className="ms-1">Project</span></h4>
                <div className="row align-items-center">
                    <div className="col-5 custom-width">
                        {/* Add progress bars here */}
                    </div>
                    <div className="col-7 d-sm-none d-md-block">
                        <ul className="overview-details">
                            <li className="d-flex align-items-center">
                                <div className="circle-dot-primary"><span></span></div>
                                <h5>15<span className="font-light ms-1">Signed</span></h5>
                            </li>
                            {/* Add other details */}
                        </ul>
                    </div>
                </div>
                <button className="view-btn btn bg-light d-block w-100 position-relative" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    View project
                    <svg className="feather">
                        <use href="../assets/svg/feather-icons/dist/feather-sprite.svg#chevron-down"></use>
                    </svg>
                    <ul className="dropdown-menu dropdown-block">
                        <li><a className="dropdown-item" href="#">Project</a></li>
                        <li><a className="dropdown-item" href="#">Ecommerce</a></li>
                        <li><a className="dropdown-item" href="#">Crypto</a></li>
                    </ul>
                </button>
            </div>
        </div>
    </div>
);

export default ProjectCard;
