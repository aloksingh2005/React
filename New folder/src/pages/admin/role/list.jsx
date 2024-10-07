import ApiService from "api/services/ApiService";
import DeleteButton from "components/buttons/DeleteButton";
import DynamicTableSkeleton from "components/loading/DynamicTableSkeleton";
import PageTitle from "includes/PageTitle";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap"; // Assuming you're using react-bootstrap
import { useNavigate } from "react-router-dom";

const RoleList = () => {
    const [roles, setRoles] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await ApiService.getAll('roles');
                setRoles(response.data); // Assuming response.data contains the list of roles
            } catch (error) {
                console.error("Failed to fetch roles:", error);
            }
            setLoading(false);
        };

        fetchCompanies();
    }, []);

    const handleEdit = (id) => {
        navigate(`/role/edit/${id}`);
    };


    const handleDelete = async (id) => {
        try {
            await ApiService.delete('roles',id);
            setRoles(roles.filter(role => role.id !== id));
        } catch (error) {
            console.error("Failed to delete role:", error);
        }
    };

    return (
        <>
            <PageTitle title="Role List" paths={["Role", "List"]} />

            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="card">
                            <div className="card-header">
                                <h3>Role List</h3>
                            </div>
                            <div className="card-body">
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Company</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {!loading ? (
                                            <>
                                                {roles?.length ? roles.map(role => (
                                                    <tr key={role.id}>
                                                        <td>{role.id}</td>
                                                        <td>{role?.name}</td>
                                                        <td>{role?.company?.name}</td>
                                                        <td>
                                                            <Button size="sm" variant="warning" onClick={() => handleEdit(role.id)}><i className="far fa-edit"></i></Button>{' '}
                                                            <DeleteButton
                                                                onDelete={handleDelete}
                                                                itemId={role.id}
                                                                itemName={role.name}
                                                                buttonLabel=""
                                                            />
                                                        </td>
                                                    </tr>
                                                )) : (
                                                    <tr>
                                                        <td className="text-center" colSpan={7}> No Roles</td>
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
        </>
    );
};

export default RoleList;
