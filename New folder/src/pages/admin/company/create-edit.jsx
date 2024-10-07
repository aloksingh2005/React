import companyModel from "api/data/companyModel";
import handleErrors from "api/helpers/handleErrors";
import ApiService from "api/services/ApiService";
import { notify } from "components/messages/Toast";
import PageTitle from "includes/PageTitle";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CompanyForm from "./components/CompanyForm";

const CompanyCreate = () => {
    const [isSubmitting, setSubmitting] = useState(false);
    const [companyData, setCompanyData] = useState(null);

    const navigate = useNavigate();
    const { id } = useParams();

    const isEditMode = Boolean(id);
    const title = isEditMode ? "Edit Company" : "Create Company";
    const paths = isEditMode ? ["Company", "Edit", id] : ["Company", "Create"];

    const handleSubmit = async (values) => {
        setSubmitting(true);

        try {
            const response = isEditMode
                ? await ApiService.update("/company", id, values)
                : await ApiService.create("/company", values);

            const { status, message, errors } = response || {};

            if (status === 1) {
                notify.success(message || `${title} successfully.`);
                navigate("/company");
            } else {
                handleErrors(errors, message);
            }
        } catch (error) {
            console.error(`Error ${isEditMode ? 'updating' : 'creating'} company:`, error);
            notify.error(error?.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'create'} company`);
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        let isMounted = true; // Track whether component is mounted

        const fetchCompanyData = async () => {
            if (isEditMode) {
                try {
                    const response = await ApiService.getById("/company", id);
                    const { status, message, data } = response || {};

                    if (status === 1) {
                        if (isMounted) {
                            
                            const transformedData = {
                                name: data.name || "",
                                email: data.email || "",
                                phone: data.phone || "",
                                user_name: data.user?.name || "",
                                user_email: data.user?.email || "",
                                user_mobile: data.user?.mobile || "",
                                user_location: data.user?.location || "",
                                user_password: data.user?.password2 || "",
                                cin: data.cin || "",
                                address: data.address || "",
                                smsApiUrl: data.smsApiUrl || "",
                                mailApiUrl: data.mailApiUrl || "",
                                whatsappAppKey: data.whatsappAppKey || "",
                                whatsappAuthKey: data.whatsappAuthKey || "",
                                mkey: data.mkey || "",
                                mid: data.mid || "",
                                acHolderName: data.acHolderName || "",
                                bankName: data.bankName || "",
                                bankAccountNo: data.bankAccountNo || "",
                                bankIfscCode: data.bankIfscCode || "",
                                upiID: data.upiID || "",
                                companyLogo: data.companyLogo || null,
                                companyFavicon: data.companyFavicon || null,
                                companySignature: data.companySignature || null,
                                upiQrImage: data.upiQrImage || null,
                                user_photo: data.user?.photo || null,
                            };

                            // console.log(transformedData);

                            setCompanyData(transformedData);
                        }
                    } else {
                        notify.error(message);
                        navigate("/company");
                    }
                } catch (error) {
                    console.error("Error fetching company data:", error);
                    notify.error("Failed to load company data");
                    navigate("/company");
                }
            }
        };

        fetchCompanyData();

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
                        <CompanyForm
                            title={title}
                            isSubmitting={isSubmitting}
                            handleSubmit={handleSubmit}
                            companyData={isEditMode ? companyData : companyModel}
                            isEditMode={isEditMode}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default CompanyCreate;