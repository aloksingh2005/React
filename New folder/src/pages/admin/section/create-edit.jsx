import handleErrors from "api/helpers/handleErrors";
import ApiService from "api/services/ApiService";
import { notify } from "components/messages/Toast";
import PageTitle from "includes/PageTitle";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SectionForm from "./components/SectionForm";
import sectionModel from "api/data/sectionModel";

const SectionCreate = () => {
    const [isSubmitting, setSubmitting] = useState(false);
    const [sectionData, setSectionData] = useState(null);

    const navigate = useNavigate();
    const { id } = useParams();

    const isEditMode = Boolean(id);
    const title = isEditMode ? "Edit Section" : "Create Section";
    const paths = isEditMode ? ["Section", "Edit", id] : ["Section", "Create"];

    const handleSubmit = async (values) => {
        setSubmitting(true);

        try {
            const response = isEditMode
                ? await ApiService.update('sections', id, values)
                : await ApiService.create('sections', values);

            const { status, message, errors } = response || {};

            if (status === 1) {
                notify.success(message || `${title} successfully.`);
                navigate("/section");
            } else {
                handleErrors(errors, message);
            }
        } catch (error) {
            console.error(`Error ${isEditMode ? 'updating' : 'creating'} section:`, error);
            notify.error(error?.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'create'} section`);
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        let isMounted = true; // Track whether component is mounted

        const fetchSectionData = async () => {
            if (isEditMode) {
                try {
                    const response = await ApiService.getById('', id);
                    const { status, message, data } = response || {};

                    if (status === 1) {
                        if (isMounted) {

                            const transformedData = {
                                name: data.name || "",
                            };

                            // console.log(transformedData);

                            setSectionData(transformedData);
                        }
                    } else {
                        notify.error(message);
                        navigate("/section");
                    }
                } catch (error) {
                    console.error("Error fetching section data:", error);
                    notify.error("Failed to load section data");
                    navigate("/section");
                }
            }
        };

        fetchSectionData();

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
                        <SectionForm
                            title={title}
                            isSubmitting={isSubmitting}
                            handleSubmit={handleSubmit}
                            sectionData={isEditMode ? sectionData : sectionModel}
                            isEditMode={isEditMode}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SectionCreate;