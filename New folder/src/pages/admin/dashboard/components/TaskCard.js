import React from "react";

const TaskCard = () => (
    <div className="col-sm-6 col-xl-3">
        <div className="card task-card">
            <div className="card-header pb-0">
                <h4>Task Summary</h4>
                <div className="dropdown icon-dropdown">
                    <button className="btn dropdown-toggle" id="userdropdown2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="icon-more-alt"></i>
                    </button>
                    <div className="dropdown-menu dropdown-menu-end" aria-labelledby="userdropdown2">
                        <a className="dropdown-item" href="#">Weekly</a>
                        <a className="dropdown-item" href="#">Monthly</a>
                        <a className="dropdown-item" href="#">Yearly</a>
                    </div>
                </div>
            </div>
            <div className="card-body p-0">
                <div className="task-summary" id="task-summary"></div>
            </div>
        </div>
    </div>
);

export default TaskCard;
