import React from "react";

import PageTitle from "includes/PageTitle";
import ProfileGreeting from "./components/ProfileGreeting";
import ProjectCard from "./components/ProjectCard";
import ClientCard from "./components/ClientCard";
import InvestingCard from "./components/InvestingCard";
import InvoiceCard from "./components/InvoiceCard";
import InvestCard from "./components/InvestCard";
import TaskCard from "./components/TaskCard";

const Dashboard = () => {
    return (
        <>
            <PageTitle title="Dashboard" paths={["Dashboard", "Default"]} />

            <div className="container-fluid">
                <div className="default-dashboard">
                    <div className="row">
                        <ProfileGreeting />
                        <ProjectCard />
                        <div className="col-sm-6 col-xl-2">
                            <div className="row">
                                <ClientCard />
                                <ClientCard isNewProject={true} />
                            </div>
                        </div>
                        <InvestingCard />
                        <InvoiceCard />
                        <InvestCard />
                        <TaskCard />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
