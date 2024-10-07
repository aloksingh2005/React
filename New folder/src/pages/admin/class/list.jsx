import ApiService from "api/services/ApiService";
import DeleteButton from "components/buttons/DeleteButton";
import DynamicTableSkeleton from "components/loading/DynamicTableSkeleton";
import PageTitle from "includes/PageTitle";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap"; // Assuming you're using react-bootstrap
import { useNavigate } from "react-router-dom";

const ClassList = () => {
    const [classess, setClasss] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await ApiService.getAll('classess');
                setClasss(response.data); // Assuming response.data contains the list of classess
            } catch (error) {
                console.error("Failed to fetch classess:", error);
            }
            setLoading(false);
        };

        fetchCompanies();
    }, []);

    const handleEdit = (id) => {
        navigate(`/classes/edit/${id}`);
    };


    const handleDelete = async (id) => {
        try {
            await ApiService.delete('classess',id);
            setClasss(classess.filter(classes => classes.id !== id));
        } catch (error) {
            console.error("Failed to delete classes:", error);
        }
    };

    return (
        <>
            <PageTitle title="Class List" paths={["Class", "List"]} />

            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="card">
                            <div className="card-header">
                                <h3>Class List</h3>
                            </div>
                            <div className="card-body">
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Full Name</th>
                                            <th>Short Name</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {!loading ? (
                                            <>
                                                {classess?.length ? classess.map(classes => (
                                                    <tr key={classes.id}>
                                                        <td>{classes.id}</td>
                                                        <td>{classes?.fullname}</td>
                                                        <td>{classes?.shortname}</td>
                                                        <td>
                                                            <Button size="sm" variant="warning" onClick={() => handleEdit(classes.id)}><i className="far fa-edit"></i></Button>{' '}
                                                            <DeleteButton
                                                                onDelete={handleDelete}
                                                                itemId={classes.id}
                                                                itemName={classes.fullname}
                                                                buttonLabel=""
                                                            />
                                                        </td>
                                                    </tr>
                                                )) : (
                                                    <tr>
                                                        <td className="text-center" colSpan={4}> No Classes</td>
                                                    </tr>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                <DynamicTableSkeleton numRows={5} numColumns={4} />
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

export default ClassList;
