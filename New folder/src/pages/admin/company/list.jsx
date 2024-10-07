import ApiService from "api/services/ApiService";
import PageTitle from "includes/PageTitle";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap"; // Assuming you're using react-bootstrap
import { useNavigate } from "react-router-dom";
import LoginDetailsModal from "./components/LoginDetailsModal";
import DynamicTableSkeleton from "components/loading/DynamicTableSkeleton";
import DeleteButton from "components/buttons/DeleteButton";

const CompanyList = () => {
    const [companies, setCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [showLoginDetailsModal, setShowLoginDetailsModal] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await ApiService.getAll("/company");
                setCompanies(response.data); // Assuming response.data contains the list of companies
            } catch (error) {
                console.error("Failed to fetch companies:", error);
            }
            setLoading(false);
        };

        fetchCompanies();
    }, []);

    const handleEdit = (id) => {
        navigate(`/company/edit/${id}`);
    };

    const handleViewLoginDetails = (company) => {
        setSelectedCompany(company?.user);
        setShowLoginDetailsModal(true);
    };

    const handleDelete = async (id) => {
        try {
            await ApiService.delete("/company", id);
            setCompanies(companies.filter(company => company.id !== id));
        } catch (error) {
            console.error("Failed to delete company:", error);
        }
    };

    return (
        <>
            <PageTitle title="Companies List" paths={["Company", "List"]} />

            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="card">
                            <div className="card-header">
                                <h3>Company List</h3>
                            </div>
                            <div className="card-body">
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Address</th>
                                            <th>CIN</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {!loading ? (
                                            <>
                                                {companies?.length ? companies.map(company => (
                                                    <tr key={company.id}>
                                                        <td>{company.id}</td>
                                                        <td>{company.name}</td>
                                                        <td>{company.email}</td>
                                                        <td>{company.phone}</td>
                                                        <td>{company.address}</td>
                                                        <td>{company.cin}</td>
                                                        <td>
                                                            <Button size="sm" variant="warning" onClick={() => handleEdit(company.id)}><i className="far fa-edit"></i></Button>{' '}
                                                            <Button size="sm" variant="info" onClick={() => handleViewLoginDetails(company)}><i className="far fa-lock"></i></Button>{' '}
                                                            <DeleteButton
                                                                onDelete={handleDelete}
                                                                itemId={company.id}
                                                                itemName={company.name}
                                                                buttonLabel=""
                                                            />
                                                        </td>
                                                    </tr>
                                                )) : (
                                                    <tr>
                                                        <td className="text-center" colSpan={7}> No Company Details </td>
                                                    </tr>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                <DynamicTableSkeleton numRows={5} numColumns={7} />
                                            </>
                                        )}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Login Details Modal */}
            <LoginDetailsModal
                show={showLoginDetailsModal}
                onHide={() => setShowLoginDetailsModal(false)}
                company={selectedCompany}
            />
        </>
    );
};

export default CompanyList;
