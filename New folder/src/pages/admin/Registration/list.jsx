import ApiService from "api/services/ApiService";
import DeleteButton from "components/buttons/DeleteButton";
import DynamicTableSkeleton from "components/loading/DynamicTableSkeleton";
import PageTitle from "includes/PageTitle";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap"; // Assuming you're using react-bootstrap
import { useNavigate } from "react-router-dom";

const RegistrationList = () => {
    const [registrations, setregistration] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await ApiService.getAll('registrations');
                setregistration(response.data); // Assuming response.data contains the list of registrations
            } catch (error) {
                console.error("Failed to fetch registrations:", error);
            }
            setLoading(false);
        };

        fetchCompanies();
    }, []);

    const handleEdit = (id) => {
        navigate(`/registration/edit/${id}`);
    };


    const handleDelete = async (id) => {
        try {
            await ApiService.delete('registrations', id);
            setregistration(registrations.filter(registration => registration.id !== id));
        } catch (error) {
            console.error("Failed to delete registration:", error);
        }
    };

    return (
        <>
            <PageTitle title="Registration List" paths={["Registration", "List"]} />

            <div registrationName="container-fluid">
                <div registrationName="row">
                    <div registrationName="col-xl-12">
                        <div registrationName="card">
                            <div registrationName="card-header">
                                <h3>Registration List</h3>
                            </div>
                            <div registrationName="card-body">
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Registration No.</th>
                                            <th>Registration</th>
                                            <th>Full Name</th>
                                            <th>Gender</th>
                                            <th>Date of Birth</th>
                                            <th>Category</th>
                                            <th>Religion</th>
                                            <th>Caste</th>
                                            <th>Mobile Number</th>
                                            <th>Email</th>
                                            <th>Admission Date</th>
                                            <th>Blood Group</th>
                                            <th>Father Name</th>
                                            <th>Mother Name</th>
                                            <th>Guardian Name</th>
                                            <th>Actions</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {!loading ? (
                                            <>
                                                {registrations?.length ? registrations.map(registration => (
                                                    <tr key={registration.id}>
                                                        <td>{registration.id}</td>
                                                        <td>{registration.registration_no}</td>
                                                        <td>{registration.registration}</td>
                                                        <td>{registration.full_name}</td>
                                                        <td>{registration.gender}</td>
                                                        <td>{registration.date_of_birth}</td>
                                                        <td>{registration.category}</td>
                                                        <td>{registration.religion}</td>
                                                        <td>{registration.caste}</td>
                                                        <td>{registration.mobile_number}</td>
                                                        <td>{registration.email}</td>
                                                        <td>{registration.admission_date}</td>
                                                        <td>{registration.blood_group}</td>
                                                        <td>{registration.father_name}</td>
                                                        <td>{registration.mother_name}</td>
                                                        <td>{registration.guardian_name}</td>

                                                        <td>
                                                            <img src={registration.student_photo} alt="Student" width="50" />
                                                        </td>

                                                        <td>
                                                            <Button size="sm" variant="warning" onClick={() => handleEdit(registration.id)}><i registrationName="far fa-edit"></i></Button>{' '}
                                                            <DeleteButton
                                                                onDelete={handleDelete}
                                                                itemId={registration.id}
                                                                itemName={registration.Registration}
                                                                buttonLabel=""
                                                            />
                                                        </td>
                                                    </tr>
                                                )) : (
                                                    <tr>
                                                        <td registrationName="text-center" colSpan={17}> No Registration</td>
                                                    </tr>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                <DynamicTableSkeleton numRows={5} numColumns={17} />
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

export default RegistrationList;
