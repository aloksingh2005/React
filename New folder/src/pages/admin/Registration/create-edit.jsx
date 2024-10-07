import handleErrors from "api/helpers/handleErrors";
import ApiService from "api/services/ApiService";
import { notify } from "components/messages/Toast";
import PageTitle from "includes/PageTitle";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm";
import registrationModel from "api/data/registrationModel";

const RegistrationCreate = () => {
    const [isSubmitting, setSubmitting] = useState(false);
    const [registrationData, setRegistrationData] = useState(null);

    const navigate = useNavigate();
    const { id } = useParams();

    const isEditMode = Boolean(id);
    const title = isEditMode ? "Edit Registration" : "Create Registration";
    const paths = isEditMode ? ["Registration", "Edit", id] : ["Registration", "Create"];

    const handleSubmit = async (values) => {
        setSubmitting(true);

        try {
            const response = isEditMode
                ? await ApiService.update('registrations', id, values)
                : await ApiService.create('registrations', values);

            const { status, message, errors } = response || {};

            if (status === 1) {
                notify.success(message || `${title} successfully.`);
                navigate("/registration");
            } else {
                handleErrors(errors, message);
            }
        } catch (error) {
            console.error(`Error ${isEditMode ? 'updating' : 'creating'} registration:`, error);
            notify.error(error?.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'create'} registration`);
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        let isMounted = true; // Track whether component is mounted

        const fetchRegistrationData = async () => {
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

                            setRegistrationData(transformedData);
                        }
                    } else {
                        notify.error(message);
                        navigate("/registration");
                    }
                } catch (error) {
                    console.error("Error fetching registration data:", error);
                    notify.error("Failed to load registration data");
                    navigate("/registration");
                }
            }
        };

        fetchRegistrationData();

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
                        <RegistrationForm
                            title={title}
                            isSubmitting={isSubmitting}
                            handleSubmit={handleSubmit}
                            registrationData={isEditMode ? registrationData : registrationModel}
                            isEditMode={isEditMode}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default RegistrationCreate;