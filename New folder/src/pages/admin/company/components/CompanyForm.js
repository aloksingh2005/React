import companySchema from "api/schema/companySchema";
import ShimmerLoading from "components/loading/ShimmerLoading";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";

const CompanyForm = ({ title, handleSubmit, isSubmitting, companyData, isEditMode }) => {
    const [activeTab, setActiveTab] = useState('info');
    const [showPassword, setShowPassword] = useState(false);
    const [editData, setEditData] = useState(null);

    const handleTabClick = (tab) => setActiveTab(tab);
    const initialValues = companyData;


    useEffect(() => {
        if (initialValues) {
            setEditData(companyData);
            setEditData((prevData) => ({
                ...prevData,
                user_photo: null,
                companyLogo: null,
                companyFavicon: null,
                companySignature: null,
                upiQrImage: null,
            }));
        }
    }, [initialValues]);
    // console.log("data:", initialValues?.name);

    const handleSubmitClick = (values) => {
        const errors = {};
        try {
            // Validate values using Yup schema
            companySchema.validateSync(values, { abortEarly: false });
        } catch (validationError) {
            validationError.inner.forEach((error) => {
                errors[error.path] = error.message;
            });
        }
        return errors;
    };


    return (
        <div className="card">
            <div className="card-header">
                <h3>{title}</h3>
            </div>
            <div className="card-body">
                <div className="vertical-main-wizard">
                    <div className="row g-3">
                        <div className="col-xxl-3 col-xl-4 col-12">
                            <div className="nav flex-column header-vertical-wizard" role="tablist" aria-orientation="vertical">
                                {['info', 'user', 'api', 'account', 'files'].map(tab => (
                                    <a
                                        key={tab}
                                        href={`#${tab}`}
                                        className={`nav-link ${activeTab === tab ? 'active' : ''}`}
                                        onClick={() => handleTabClick(tab)}
                                    >
                                        <div className="vertical-wizard">
                                            <div className="stroke-icon-wizard"><i className={`fa fa-${tab === 'info' ? 'user-tie' : tab === 'user' ? 'user' : tab === 'api' ? 'cogs' : tab === 'account' ? 'bank' : 'file'}`}></i></div>
                                            <div className="vertical-wizard-content">
                                                <h6>{tab === 'info' ? 'Company Info' : tab === 'user' ? 'User Info' : tab === 'api' ? 'API\'S & SERVICES' : tab === 'account' ? 'Account Info' : 'Files'}</h6>
                                                <p>{tab === 'info' ? 'Add company details' : tab === 'user' ? 'Add User Details' : tab === 'api' ? 'Configure your APIs' : tab === 'account' ? 'Add company a/c details' : 'Upload company files'}</p>
                                            </div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                        <div className="col-xxl-9 col-xl-8 col-12">
                            <div className="tab-content">
                                {editData ? (
                                    <>
                                        <Formik
                                            initialValues={editData ? editData : initialValues}
                                            validationSchema={companyData ? null : companySchema}
                                            onSubmit={handleSubmit}
                                        >
                                            {({ values, setFieldValue }) => (
                                                <>
                                                    <Form method="post" encType="multipart/form-data" noValidate>
                                                        {/* Tab for Company Information */}
                                                        <div className={`tab-pane fade ${activeTab === 'info' ? "active show" : "d-none"}`}>
                                                            <Row className="g-3">
                                                                <Col md={6}>
                                                                    <label className="form-label">Company Name</label>
                                                                    <Field
                                                                        name="name"
                                                                        type="text"
                                                                        className="form-control"
                                                                        onChange={(e) => setFieldValue("name", e.target.value)}
                                                                        value={values?.name || editData?.name || ""}
                                                                    />
                                                                    <ErrorMessage name="name" component="div" className="text-danger" />
                                                                </Col>
                                                                <Col md={6}>
                                                                    <label className="form-label">Email</label>
                                                                    <Field
                                                                        name="email"
                                                                        type="email"
                                                                        className="form-control"
                                                                        onChange={(e) => setFieldValue("email", e.target.value)}
                                                                        value={values?.email || editData?.email || ""}
                                                                    />
                                                                    <ErrorMessage name="email" component="div" className="text-danger" />
                                                                </Col>
                                                                <Col md={6}>
                                                                    <label className="form-label">Phone</label>
                                                                    <Field
                                                                        name="phone"
                                                                        type="text"
                                                                        className="form-control"
                                                                        onChange={(e) => setFieldValue("phone", e.target.value)}
                                                                        value={values?.phone || editData?.phone || ""}
                                                                    />
                                                                    <ErrorMessage name="phone" component="div" className="text-danger" />
                                                                </Col>
                                                                <Col md={6}>
                                                                    <label className="form-label">CIN</label>
                                                                    <Field
                                                                        name="cin"
                                                                        type="text"
                                                                        className="form-control"
                                                                        onChange={(e) => setFieldValue("cin", e.target.value)}
                                                                        value={values?.cin || editData?.cin || ""}
                                                                    />
                                                                    <ErrorMessage name="cin" component="div" className="text-danger" />
                                                                </Col>
                                                                <Col md={12}>
                                                                    <label className="form-label">Address</label>
                                                                    <Field
                                                                        as="textarea"
                                                                        name="address"
                                                                        className="form-control"
                                                                        onChange={(e) => setFieldValue("address", e.target.value)}
                                                                        value={values?.address || editData?.address || ""}
                                                                    />
                                                                    <ErrorMessage name="address" component="div" className="text-danger" />
                                                                </Col>
                                                                <Col md={12} className="text-end mt-3">
                                                                    <Button type="button" className="btn btn-primary" onClick={() => handleTabClick('user')}>
                                                                        Next
                                                                    </Button>
                                                                </Col>
                                                            </Row>
                                                        </div>

                                                        {/* Tab for User Information */}
                                                        <div className={`tab-pane fade ${activeTab === 'user' ? "active show" : "d-none"}`}>
                                                            <Row className="g-3">
                                                                <Col md={6}>
                                                                    <label className="form-label">User Name</label>
                                                                    <Field
                                                                        name="user_name"
                                                                        type="text"
                                                                        className="form-control"
                                                                        onChange={(e) => setFieldValue("user_name", e.target.value)}
                                                                        value={values?.user_name || editData?.user_name || ""}
                                                                    />
                                                                    <ErrorMessage name="user_name" component="div" className="text-danger" />
                                                                </Col>
                                                                <Col md={6}>
                                                                    <label className="form-label">User Email</label>
                                                                    <Field
                                                                        name="user_email"
                                                                        type="email"
                                                                        className="form-control"
                                                                        onChange={(e) => setFieldValue("user_email", e.target.value)}
                                                                        value={values?.user_email || editData?.user_email || ""}
                                                                    />
                                                                    <ErrorMessage name="user_email" component="div" className="text-danger" />
                                                                </Col>
                                                                <Col md={6}>
                                                                    <label className="form-label">User Mobile</label>
                                                                    <Field
                                                                        name="user_mobile"
                                                                        type="text"
                                                                        className="form-control"
                                                                        onChange={(e) => setFieldValue("user_mobile", e.target.value)}
                                                                        value={values?.user_mobile || editData?.user_mobile || ""}
                                                                    />
                                                                    <ErrorMessage name="user_mobile" component="div" className="text-danger" />
                                                                </Col>
                                                                <Col md={6}>
                                                                    <label className="form-label">Location</label>
                                                                    <Field
                                                                        name="user_location"
                                                                        type="text"
                                                                        className="form-control"
                                                                        onChange={(e) => setFieldValue("user_location", e.target.value)}
                                                                        value={values?.user_location || editData?.user_location || ""}
                                                                    />
                                                                    <ErrorMessage name="user_location" component="div" className="text-danger" />
                                                                </Col>
                                                                <Col md={6}>
                                                                    <label className="form-label">Password</label>
                                                                    <div className="input-group">
                                                                        <Field
                                                                            name="user_password"
                                                                            type={showPassword ? "text" : "password"}
                                                                            className="form-control"
                                                                            onChange={(e) => setFieldValue("user_password", e.target.value)}
                                                                            value={values?.user_password || editData?.user_password || ""}
                                                                        />
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-outline-secondary"
                                                                            onClick={() => setShowPassword(!showPassword)}
                                                                        >
                                                                            {showPassword ? "Hide" : "Show"}
                                                                        </button>
                                                                    </div>
                                                                    <ErrorMessage name="user_password" component="div" className="text-danger" />
                                                                </Col>
                                                                <Col md={6}>
                                                                    <label className="form-label">User Photo</label>
                                                                    <input
                                                                        name="user_photo"
                                                                        type="file"
                                                                        className="form-control"
                                                                        onChange={(event) => {
                                                                            const file = event.currentTarget.files[0];
                                                                            setFieldValue("user_photo", file);
                                                                        }}
                                                                    />
                                                                    <ErrorMessage name="user_photo" component="div" className="text-danger" />

                                                                    {values?.user_photo || companyData?.user_photo && (
                                                                        <div className="mt-2">
                                                                            <a href={companyData.user_photo} className="btn w-100 btn-secondary" target="_blank">
                                                                                Visit File
                                                                            </a>
                                                                        </div>
                                                                    )}
                                                                </Col>
                                                                <Col md={12} className="text-end mt-3">
                                                                    <Button type="button" className="btn btn-secondary me-3" onClick={() => handleTabClick('info')}>
                                                                        Previous
                                                                    </Button>
                                                                    <Button type="button" className="btn btn-primary" onClick={() => handleTabClick('api')}>
                                                                        Next
                                                                    </Button>
                                                                </Col>
                                                            </Row>
                                                        </div>

                                                        {/* Tab for API Configuration */}
                                                        <div className={`tab-pane fade ${activeTab === 'api' ? "active show" : "d-none"}`}>
                                                            <Row className="g-3">
                                                                <Col md={12}>
                                                                    <label className="form-label">SMS API URL</label>
                                                                    <Field
                                                                        name="smsApiUrl"
                                                                        as="textarea"
                                                                        className="form-control"
                                                                        onChange={(e) => setFieldValue("smsApiUrl", e.target.value)}
                                                                        value={values?.smsApiUrl || editData?.smsApiUrl || ""}
                                                                    />
                                                                    <ErrorMessage name="smsApiUrl" component="div" className="text-danger" />
                                                                </Col>
                                                                <Col md={12}>
                                                                    <label className="form-label">Mail API URL</label>
                                                                    <Field
                                                                        name="mailApiUrl"
                                                                        as="textarea"
                                                                        className="form-control"
                                                                        onChange={(e) => setFieldValue("mailApiUrl", e.target.value)}
                                                                        value={values?.mailApiUrl || editData?.mailApiUrl || ""}
                                                                    />
                                                                    <ErrorMessage name="mailApiUrl" component="div" className="text-danger" />
                                                                </Col>
                                                                <Col md={12}>
                                                                    <label className="form-label">WhatsApp App Key</label>
                                                                    <Field
                                                                        name="whatsappAppKey"
                                                                        type="text"
                                                                        className="form-control"
                                                                        onChange={(e) => setFieldValue("whatsappAppKey", e.target.value)}
                                                                        value={values?.whatsappAppKey || editData?.whatsappAppKey || ""}
                                                                    />
                                                                    <ErrorMessage name="whatsappAppKey" component="div" className="text-danger" />
                                                                </Col>
                                                                <Col md={12}>
                                                                    <label className="form-label">WhatsApp Auth Key</label>
                                                                    <Field
                                                                        name="whatsappAuthKey"
                                                                        type="text"
                                                                        className="form-control"
                                                                        onChange={(e) => setFieldValue("whatsappAuthKey", e.target.value)}
                                                                        value={values?.whatsappAuthKey || editData?.whatsappAuthKey || ""}
                                                                    />
                                                                    <ErrorMessage name="whatsappAuthKey" component="div" className="text-danger" />
                                                                </Col>
                                                                <Col md={12}>
                                                                    <label className="form-label">API MKEY</label>
                                                                    <Field
                                                                        name="mkey"
                                                                        type="text"
                                                                        className="form-control"
                                                                        onChange={(e) => setFieldValue("mkey", e.target.value)}
                                                                        value={values?.mkey || editData?.mkey || ""}
                                                                    />
                                                                    <ErrorMessage name="mkey" component="div" className="text-danger" />
                                                                </Col>
                                                                <Col md={12} className="text-end mt-3">
                                                                    <Button type="button" className="btn btn-secondary me-3" onClick={() => handleTabClick('user')}>
                                                                        Previous
                                                                    </Button>
                                                                    <Button type="button" className="btn btn-primary" onClick={() => handleTabClick('account')}>
                                                                        Next
                                                                    </Button>
                                                                </Col>
                                                            </Row>
                                                        </div>

                                                        {/* Tab for Account Information */}
                                                        <div className={`tab-pane fade ${activeTab === 'account' ? "active show" : "d-none"}`}>
                                                            <Row className="g-3">
                                                                <Col md={6}>
                                                                    <label className="form-label">A/C Holder Name</label>
                                                                    <Field
                                                                        name="acHolderName"
                                                                        type="text"
                                                                        className="form-control"
                                                                        onChange={(e) => setFieldValue("acHolderName", e.target.value)}
                                                                        value={values?.acHolderName || editData?.acHolderName || ""}
                                                                    />
                                                                    <ErrorMessage name="acHolderName" component="div" className="text-danger" />
                                                                </Col>
                                                                <Col md={6}>
                                                                    <label className="form-label">Account Number</label>
                                                                    <Field
                                                                        name="bankAccountNo"
                                                                        type="text"
                                                                        className="form-control"
                                                                        onChange={(e) => setFieldValue("bankAccountNo", e.target.value)}
                                                                        value={values?.bankAccountNo || editData?.bankAccountNo || ""}
                                                                    />
                                                                    <ErrorMessage name="bankAccountNo" component="div" className="text-danger" />
                                                                </Col>

                                                                <Col md={6}>
                                                                    <label className="form-label">IFSC Code</label>
                                                                    <Field
                                                                        name="bankIfscCode"
                                                                        type="text"
                                                                        className="form-control"
                                                                        onChange={(e) => setFieldValue("bankIfscCode", e.target.value)}
                                                                        value={values?.bankIfscCode || editData?.bankIfscCode || ""}
                                                                    />
                                                                    <ErrorMessage name="bankIfscCode" component="div" className="text-danger" />
                                                                </Col>
                                                                <Col md={6}>
                                                                    <label className="form-label">Bank Name</label>
                                                                    <Field
                                                                        name="bankName"
                                                                        type="text"
                                                                        className="form-control"
                                                                        onChange={(e) => setFieldValue("bankName", e.target.value)}
                                                                        value={values?.bankName || editData?.bankName || ""}
                                                                    />
                                                                    <ErrorMessage name="bankName" component="div" className="text-danger" />
                                                                </Col>

                                                                <Col md={6}>
                                                                    <label className="form-label">UPI ID</label>
                                                                    <Field
                                                                        name="upiID"
                                                                        type="text"
                                                                        className="form-control"
                                                                        onChange={(e) => setFieldValue("upiID", e.target.value)}
                                                                        value={values?.upiID || editData?.upiID || ""}
                                                                    />
                                                                    <ErrorMessage name="upiID" component="div" className="text-danger" />
                                                                </Col>
                                                                <Col md={12} className="text-end mt-3">
                                                                    <Button type="button" className="btn btn-secondary me-3" onClick={() => handleTabClick('api')}>
                                                                        Previous
                                                                    </Button>
                                                                    <Button type="button" className="btn btn-primary" onClick={() => handleTabClick('files')}>
                                                                        Next
                                                                    </Button>
                                                                </Col>
                                                            </Row>
                                                        </div>

                                                        {/* Tab for File Uploads */}
                                                        <div className={`tab-pane fade ${activeTab === 'files' ? "active show" : "d-none"}`}>
                                                            <Row className="g-3">
                                                                <Col md={6}>
                                                                    <label className="form-label">Company Logo</label>
                                                                    <input
                                                                        name="companyLogo"
                                                                        type="file"
                                                                        className="form-control"
                                                                        onBlur={(event) => {
                                                                            setFieldValue("companyLogo", event.currentTarget.files[0]);
                                                                        }}
                                                                    />
                                                                    {values?.companyLogo || companyData?.companyLogo && (
                                                                        <div className="mt-2">
                                                                            <a href={companyData.companyLogo} className="btn w-100 btn-secondary" target="_blank">
                                                                                Visit File
                                                                            </a>
                                                                        </div>
                                                                    )}
                                                                </Col>
                                                                <Col md={6}>
                                                                    <label className="form-label">Company Favicon</label>
                                                                    <input
                                                                        name="companyFavicon"
                                                                        type="file"
                                                                        className="form-control"
                                                                        onBlur={(event) => {
                                                                            setFieldValue("companyFavicon", event.currentTarget.files[0]);
                                                                        }}
                                                                    />
                                                                    {values?.companyFavicon || companyData?.companyFavicon && (
                                                                        <div className="mt-2">
                                                                            <a href={companyData.companyFavicon} className="btn w-100 btn-secondary" target="_blank">
                                                                                Visit File
                                                                            </a>
                                                                        </div>
                                                                    )}
                                                                </Col>
                                                                <Col md={6}>
                                                                    <label className="form-label">Company Signature</label>
                                                                    <input
                                                                        name="companySignature"
                                                                        type="file"
                                                                        className="form-control"
                                                                        onBlur={(event) => {
                                                                            setFieldValue("companySignature", event.currentTarget.files[0]);
                                                                        }}
                                                                    />
                                                                    {values?.companySignature || companyData?.companySignature && (
                                                                        <div className="mt-2">
                                                                            <a href={companyData.companySignature} className="btn w-100 btn-secondary" target="_blank">
                                                                                Visit File
                                                                            </a>
                                                                        </div>
                                                                    )}
                                                                </Col>
                                                                <Col md={6}>
                                                                    <label className="form-label">UPI QR Image</label>
                                                                    <input
                                                                        name="upiQrImage"
                                                                        type="file"
                                                                        className="form-control"
                                                                        onBlur={(event) => {
                                                                            setFieldValue("upiQrImage", event.currentTarget.files[0]);
                                                                        }}
                                                                    />
                                                                    {values?.upiQrImage || companyData?.upiQrImage && (
                                                                        <div className="mt-2">
                                                                            <a href={companyData.upiQrImage} className="btn w-100 btn-secondary" target="_blank">
                                                                                Visit File
                                                                            </a>
                                                                        </div>
                                                                    )}
                                                                </Col>

                                                                <Col md={12} className="text-end mt-3">
                                                                    <Button
                                                                        type="submit"
                                                                        onClick={() => handleSubmitClick(values)}
                                                                        disabled={isSubmitting}
                                                                        variant="primary"
                                                                    >
                                                                        {isSubmitting ? (
                                                                            <>
                                                                                <i className="fa fa-spin"></i>
                                                                                {isEditMode ? "Updating..." : "Submitting..."}
                                                                            </>
                                                                        ) : (
                                                                            isEditMode ? "Update" : "Submit"
                                                                        )}
                                                                    </Button>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </Form>

                                                </>
                                            )}
                                        </Formik>
                                    </>
                                ) : (
                                    <>
                                        <ShimmerLoading height={365} width="100%" borderRadius={0} theme="dark" />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyForm;