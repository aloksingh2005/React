import handleErrors from "api/helpers/handleErrors";
import ApiService from "api/services/ApiService";
import { notify } from "components/messages/Toast";
import PageTitle from "includes/PageTitle";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EnquiryForm from "./components/EnquiryForm";
import enquiryModel from "api/data/enquiryModel";

const EnquiryCreate = () => {
    const [isSubmitting, setSubmitting] = useState(false);
    const [enquiryData, setEnquiryData] = useState(null);

    const navigate = useNavigate();
    const { id } = useParams();

    const isEditMode = Boolean(id);
    const title = isEditMode ? "Edit Enquiry" : "Create Enquiry";
    const paths = isEditMode ? ["Enquiry", "Edit", id] : ["Enquiry", "Create"];

    const handleSubmit = async (values) => {
        setSubmitting(true);

        try {
            const response = isEditMode
                ? await ApiService.update('enquirys',id, values)
                : await ApiService.create('enquirys',values);

            const { status, message, errors } = response || {};

            if (status === 1) {
                notify.success(message || `${title} successfully.`);
                navigate("/enquiry");
            } else {
                handleErrors(errors, message);
            }
        } catch (error) {
            console.error(`Error ${isEditMode ? 'updating' : 'creating'} enquiry:`, error);
            notify.error(error?.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'create'} enquiry`);
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        let isMounted = true; // Track whether component is mounted

        const fetchEnquiryData = async () => {
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

                            setEnquiryData(transformedData);
                        }
                    } else {
                        notify.error(message);
                        navigate("/enquiry");
                    }
                } catch (error) {
                    console.error("Error fetching enquiry data:", error);
                    notify.error("Failed to load enquiry data");
                    navigate("/enquiry");
                }
            }
        };

        fetchEnquiryData();

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
                        <EnquiryForm
                            title={title}
                            isSubmitting={isSubmitting}
                            handleSubmit={handleSubmit}
                            enquiryData={isEditMode ? enquiryData : enquiryModel}
                            isEditMode={isEditMode}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default EnquiryCreate;