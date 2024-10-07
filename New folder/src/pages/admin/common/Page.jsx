
import PageTitle from "includes/PageTitle";

const Common = () => {
    return (
        <>
            <PageTitle title="Common" paths={["Common", "Default"]} />

            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="card">
                            <div className="card-header">
                                <h3>Common Page</h3>
                            </div>
                            <div className="card-body">
                                <p>This is common page for testing...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Common;
