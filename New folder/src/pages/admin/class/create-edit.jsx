import handleErrors from "api/helpers/handleErrors";
import ApiService from "api/services/ApiService";
import { notify } from "components/messages/Toast";
import PageTitle from "includes/PageTitle";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ClassesForm from "./components/ClassesForm";
import classesModel from "api/data/classesModel";

const ClassesCreate = () => {
    const [isSubmitting, setSubmitting] = useState(false);
    const [classesData, setClassesData] = useState(null);

    const navigate = useNavigate();
    const { id } = useParams();

    const isEditMode = Boolean(id);
    const title = isEditMode ? "Edit Classes" : "Create Classes";
    const paths = isEditMode ? ["Classes", "Edit", id] : ["Classes", "Create"];

    const handleSubmit = async (values) => {
        setSubmitting(true);

        try {
            const response = isEditMode
                ? await ApiService.update('classess',id, values)
                : await ApiService.create('classess',values);

            const { status, message, errors } = response || {};

            if (status === 1) {
                notify.success(message || `${title} successfully.`);
                navigate("/classes");
            } else {
                handleErrors(errors, message);
            }
        } catch (error) {
            console.error(`Error ${isEditMode ? 'updating' : 'creating'} classes:`, error);
            notify.error(error?.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'create'} classes`);
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        let isMounted = true; // Track whether component is mounted

        const fetchClassesData = async () => {
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

                            setClassesData(transformedData);
                        }
                    } else {
                        notify.error(message);
                        navigate("/classes");
                    }
                } catch (error) {
                    console.error("Error fetching classes data:", error);
                    notify.error("Failed to load classes data");
                    navigate("/classes");
                }
            }
        };

        fetchClassesData();

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
                        <ClassesForm
                            title={title}
                            isSubmitting={isSubmitting}
                            handleSubmit={handleSubmit}
                            classesData={isEditMode ? classesData : classesModel}
                            isEditMode={isEditMode}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ClassesCreate;