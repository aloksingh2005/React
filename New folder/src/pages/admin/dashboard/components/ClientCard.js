import React from "react";

const ClientCard = ({ isNewProject }) => (
    <div className="col-6 col-sm-12">
        <div className="card client-card card-hover">
            <div className="card-body">
                <div className="row">
                    <div className="col-6 custom-width-1">
                        <h3 className="font-primary">{isNewProject ? "541" : "457"}</h3>
                        <h5 className="f-w-600">{isNewProject ? "New Project" : "Total Clients"}</h5>
                    </div>
                    <div className="col-6 custom-width-2">
                        <div className={isNewProject ? "project" : "client"} id={isNewProject ? "project" : "client"}></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default ClientCard;
