import ApiService from "api/services/ApiService";
import DeleteButton from "components/buttons/DeleteButton";
import DynamicTableSkeleton from "components/loading/DynamicTableSkeleton";
import PageTitle from "includes/PageTitle";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap"; // Assuming you're using react-bootstrap
import { useNavigate } from "react-router-dom";

const EnquiryList = () => {
    const [enquirys, setEnquirys] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await ApiService.getAll('enquirys');
                setEnquirys(response.data); // Assuming response.data contains the list of enquirys
            } catch (error) {
                console.error("Failed to fetch enquirys:", error);
            }
            setLoading(false);
        };

        fetchCompanies();
    }, []);

    const handleEdit = (id) => {
        navigate(`/enquiry/edit/${id}`);
    };


    const handleDelete = async (id) => {
        try {
            await ApiService.delete('enquirys',id);
            setEnquirys(enquirys.filter(enquiry => enquiry.id !== id));
        } catch (error) {
            console.error("Failed to delete enquiry:", error);
        }
    };

    return (
        <>
            <PageTitle title="Enquiry List" paths={["Enquiry", "List"]} />

            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="card">
                            <div className="card-header">
                                <h3>Enquiry List</h3>
                            </div>
                            <div className="card-body">
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Phone</th>
                                            <th>Email</th>
                                            <th>Address</th>
                                            <th>Description</th>
                                            <th>Note</th>
                                            <th>Date</th>
                                            <th>Next Follow Up Date</th>
                                            <th>Assigned</th>
                                            <th>Reference</th>
                                            <th>Source</th>
                                            <th>Enquiry For</th>
                                            <th>Response</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {!loading ? (
                                            <>
                                                {enquirys?.length ? enquirys.map(enquiry => (
                                                    <tr key={enquiry.id}>
                                                        <td>{enquiry.id}</td>
                                                        <td>{enquiry?.name}</td>
                                                        <td>{enquiry?.company?.name}</td>
                                                        <td>
                                                            <Button size="sm" variant="warning" onClick={() => handleEdit(enquiry.id)}><i className="far fa-edit"></i></Button>{' '}
                                                            <DeleteButton
                                                                onDelete={handleDelete}
                                                                itemId={enquiry.id}
                                                                itemName={enquiry.name}
                                                                buttonLabel=""
                                                            />
                                                        </td>
                                                    </tr>
                                                )) : (
                                                    <tr>
                                                        <td className="text-center" colSpan={15}> No Enquies</td>
                                                    </tr>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                <DynamicTableSkeleton numRows={5} numColumns={15} />
                                            </>
                                        )}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EnquiryList;
