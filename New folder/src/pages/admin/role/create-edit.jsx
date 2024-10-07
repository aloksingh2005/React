import handleErrors from "api/helpers/handleErrors";
import ApiService from "api/services/ApiService";
import { notify } from "components/messages/Toast";
import PageTitle from "includes/PageTitle";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RoleForm from "./components/RoleForm";
import roleModel from "api/data/roleModel";

const RoleCreate = () => {
    const [isSubmitting, setSubmitting] = useState(false);
    const [roleData, setRoleData] = useState(null);

    const navigate = useNavigate();
    const { id } = useParams();

    const isEditMode = Boolean(id);
    const title = isEditMode ? "Edit Role" : "Create Role";
    const paths = isEditMode ? ["Role", "Edit", id] : ["Role", "Create"];

    const handleSubmit = async (values) => {
        setSubmitting(true);

        try {
            const response = isEditMode
                ? await ApiService.update('roles',id, values)
                : await ApiService.create('roles',values);

            const { status, message, errors } = response || {};

            if (status === 1) {
                notify.success(message || `${title} successfully.`);
                navigate("/role");
            } else {
                handleErrors(errors, message);
            }
        } catch (error) {
            console.error(`Error ${isEditMode ? 'updating' : 'creating'} role:`, error);
            notify.error(error?.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'create'} role`);
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        let isMounted = true; // Track whether component is mounted

        const fetchRoleData = async () => {
            if (isEditMode) {
                try {
                    const response = await ApiService.getById('',id);
                    const { status, message, data } = response || {};

                    if (status === 1) {
                        if (isMounted) {

                            const transformedData = {
                                name: data.name || "",
                            };

                            // console.log(transformedData);

                            setRoleData(transformedData);
                        }
                    } else {
                        notify.error(message);
                        navigate("/role");
                    }
                } catch (error) {
                    console.error("Error fetching role data:", error);
                    notify.error("Failed to load role data");
                    navigate("/role");
                }
            }
        };

        fetchRoleData();

        return () => {
            isMounted = false; // Cleanup function to prevent setting state if component unmounts
        };
    }, [id, isEditMode, navigate]);

    return (
        <>
            <PageTitle title={title} paths={paths} />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-12">
                        <RoleForm
                            title={title}
                            isSubmitting={isSubmitting}
                            handleSubmit={handleSubmit}
                            roleData={isEditMode ? roleData : roleModel}
                            isEditMode={isEditMode}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default RoleCreate;