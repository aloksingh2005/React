import ApiService from "api/services/ApiService";
import DeleteButton from "components/buttons/DeleteButton";
import DynamicTableSkeleton from "components/loading/DynamicTableSkeleton";
import PageTitle from "includes/PageTitle";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap"; // Assuming you're using react-bootstrap
import { useNavigate } from "react-router-dom";

const SectionList = () => {
    const [sections, setsection] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await ApiService.getAll('sections');
                setsection(response.data); // Assuming response.data contains the list of sections
            } catch (error) {
                console.error("Failed to fetch sections:", error);
            }
            setLoading(false);
        };

        fetchCompanies();
    }, []);

    const handleEdit = (id) => {
        navigate(`/section/edit/${id}`);
    };


    const handleDelete = async (id) => {
        try {
            await ApiService.delete('sections',id);
            setsection(sections.filter(section => section.id !== id));
        } catch (error) {
            console.error("Failed to delete section:", error);
        }
    };

    return (
        <>
            <PageTitle title="Section List" paths={["Section", "List"]} />

            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="card">
                            <div className="card-header">
                                <h3>Section List</h3>
                            </div>
                            <div className="card-body">
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Section Title</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {!loading ? (
                                            <>
                                                {sections?.length ? sections.map(section => (
                                                    <tr key={section.id}>
                                                        <td>{section.id}</td>
                                                        <td>{section?.sectiontitle}</td>
                                                        <td>
                                                            <Button size="sm" variant="warning" onClick={() => handleEdit(section.id)}><i className="far fa-edit"></i></Button>{' '}
                                                            <DeleteButton
                                                                onDelete={handleDelete}
                                                                itemId={section.id}
                                                                itemName={section.sectiontitle}
                                                                buttonLabel=""
                                                            />
                                                        </td>
                                                    </tr>
                                                )) : (
                                                    <tr>
                                                        <td className="text-center" colSpan={3}> No Section</td>
                                                    </tr>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                <DynamicTableSkeleton numRows={5} numColumns={3} />
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

export default SectionList;
