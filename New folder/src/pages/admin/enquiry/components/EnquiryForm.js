import enquirySchema from "api/schema/enquirySchema";
import ShimmerLoading from "components/loading/ShimmerLoading";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";

const EnquiryForm = ({ title, handleSubmit, isSubmitting, enquiryData, isEditMode }) => {
    const [activeTab, setActiveTab] = useState('info');
    const [editData, setEditData] = useState(null);

    const handleTabClick = (tab) => setActiveTab(tab);
    const initialValues = enquiryData;


    useEffect(() => {
        if (initialValues) {
            setEditData(enquiryData);
        }
    }, [initialValues]);
    // console.log("data:", initialValues?.name);

    const handleSubmitClick = (values) => {
        const errors = {};
        try {
            // Validate values using Yup schema
            enquirySchema.validateSync(values, { abortEarly: false });
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
                        {/* <div className="col-xxl-3 col-xl-4 col-12">
                            <div className="nav flex-column header-vertical-wizard" enquiry="tablist" aria-orientation="vertical">
                                {['info'].map(tab => (
                                    <a
                                        key={tab}
                                        href={`#${tab}`}
                                        className={`nav-link ${activeTab === tab ? 'active' : ''}`}
                                        onClick={() => handleTabClick(tab)}
                                    >
                                        <div className="vertical-wizard">
                                            <div className="stroke-icon-wizard"><i className={`fa fa-${tab === 'info' ? 'user-tie' : tab === 'user' ? 'user' : tab === 'api' ? 'cogs' : tab === 'account' ? 'bank' : 'file'}`}></i></div>
                                            <div className="vertical-wizard-content">
                                                <h6>{tab === 'info' ? 'Enquiry Info' : tab === 'user' ? 'User Info' : tab === 'api' ? 'API\'S & SERVICES' : tab === 'account' ? 'Account Info' : 'Files'}</h6>
                                                <p>{tab === 'info' ? 'Add enquiry details' : tab === 'user' ? 'Add User Details' : tab === 'api' ? 'Configure your APIs' : tab === 'account' ? 'Add enquiry a/c details' : 'Upload enquiry files'}</p>
                                            </div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div> */}
                        <div className="col-xxl-12 col-xl-12 col-12">
                            <div className="tab-content">
                                {editData ? (<>
                                    <Formik
                                        initialValues={editData ? editData : initialValues}
                                        validationSchema={enquiryData ? null : enquirySchema}
                                        onSubmit={handleSubmit}

                                    >
                                        {({ values, setFieldValue }) => (
                                            <>
                                                <Form method="post" encType="multipart/form-data" noValidate>
                                                    {/* Tab for Enquiry Information */}
                                                    <div className={`tab-pane fade ${activeTab === 'info' ? "active show" : "d-none"}`}>
                                                        <Row className="g-3">
                                                            <Col md={4}>
                                                                <label className="form-label">Name</label>
                                                                <small className="req"> *</small>
                                                                <Field
                                                                    name="name"
                                                                    type="text"
                                                                    className="form-control"
                                                                    onChange={(e) => setFieldValue("name", e.target.value)}
                                                                    value={values?.name || ""}
                                                                />
                                                                <ErrorMessage name="name" component="div" className="text-danger" />
                                                            </Col>

                                                            <Col md={4}>
                                                                <label className="form-label">Phone</label>
                                                                <small className="req"> *</small>
                                                                <Field
                                                                    name="contact"
                                                                    type="text"
                                                                    className="form-control"
                                                                    onChange={(e) => setFieldValue("contact", e.target.value)}
                                                                    value={values?.contact || ""}
                                                                />
                                                                <ErrorMessage name="contact" component="div" className="text-danger" />
                                                            </Col>

                                                            <Col md={4}>
                                                                <label className="form-label">Email</label>
                                                                <Field
                                                                    name="email"
                                                                    type="text"
                                                                    className="form-control"
                                                                    onChange={(e) => setFieldValue("email", e.target.value)}
                                                                    value={values?.email || ""}
                                                                />
                                                                <ErrorMessage name="email" component="div" className="text-danger" />
                                                            </Col>

                                                            <Col md={4}>
                                                                <label className="form-label">Address</label>
                                                                <Field
                                                                    name="address"
                                                                    as="textarea"
                                                                    className="form-control"
                                                                    onChange={(e) => setFieldValue("address", e.target.value)}
                                                                    value={values?.address || ""}
                                                                />
                                                                <ErrorMessage name="address" component="div" className="text-danger" />
                                                            </Col>

                                                            <Col md={4}>
                                                                <label className="form-label">Description</label>
                                                                <Field
                                                                    name="description"
                                                                    as="textarea"
                                                                    className="form-control"
                                                                    onChange={(e) => setFieldValue("description", e.target.value)}
                                                                    value={values?.description || ""}
                                                                />
                                                                <ErrorMessage name="description" component="div" className="text-danger" />
                                                            </Col>

                                                            <Col md={4}>
                                                                <label className="form-label">Note</label>
                                                                <Field
                                                                    name="note"
                                                                    as="textarea"
                                                                    className="form-control"
                                                                    onChange={(e) => setFieldValue("note", e.target.value)}
                                                                    value={values?.note || ""}
                                                                />
                                                                <ErrorMessage name="note" component="div" className="text-danger" />
                                                            </Col>

                                                            <Col md={4}>
                                                                <label className="form-label">Date</label>
                                                                <Field
                                                                    name="date"
                                                                    type="text"
                                                                    className="form-control"
                                                                    value="25-09-2024" // You can make this dynamic as per requirement
                                                                    readOnly
                                                                />
                                                                <ErrorMessage name="date" component="div" className="text-danger" />
                                                            </Col>

                                                            <Col md={4}>
                                                                <label className="form-label">Next Follow Up Date</label>
                                                                <Field
                                                                    name="follow_up_date"
                                                                    type="date"
                                                                    className="form-control"
                                                                    onChange={(e) => setFieldValue("follow_up_date", e.target.value)}
                                                                    value={values?.follow_up_date || ""}
                                                                />
                                                                <ErrorMessage name="follow_up_date" component="div" className="text-danger" />
                                                            </Col>

                                                            <Col md={4}>
                                                                <label className="form-label">Assigned</label>
                                                                <Field
                                                                    name="assigned"
                                                                    type="text"
                                                                    className="form-control"
                                                                    onChange={(e) => setFieldValue("assigned", e.target.value)}
                                                                    value={values?.assigned || ""}
                                                                />
                                                                <ErrorMessage name="assigned" component="div" className="text-danger" />
                                                            </Col>

                                                            <Col md={3}>
                                                                <label className="form-label">Reference</label>
                                                                <Field as="select" name="reference" className="form-control">
                                                                    <option value="">Select</option>
                                                                    <option value="Staff">Staff</option>
                                                                    <option value="Parent">Parent</option>
                                                                    <option value="Student">Student</option>
                                                                    <option value="Lower Wing">Lower Wing</option>
                                                                    <option value="Partner School">Partner School</option>
                                                                    <option value="Self">Self</option>
                                                                </Field>
                                                                <ErrorMessage name="reference" component="div" className="text-danger" />
                                                            </Col>

                                                            <Col md={3}>
                                                                <label className="form-label">Source</label>
                                                                <small className="req"> *</small>
                                                                <Field as="select" name="source" className="form-control">
                                                                    <option value="">Select</option>
                                                                    <option value="Front Office">Front Office</option>
                                                                    <option value="Advertisement">Advertisement</option>
                                                                    <option value="Online Front Site">Online Front Site</option>
                                                                    <option value="Google Ads">Google Ads</option>
                                                                    <option value="Admission Campaign">Admission Campaign</option>
                                                                </Field>
                                                                <ErrorMessage name="source" component="div" className="text-danger" />
                                                            </Col>

                                                            <Col md={3}>
                                                                <label className="form-label">Enquiry For</label>
                                                                <Field
                                                                    name="enquiry_for"
                                                                    type="text"
                                                                    className="form-control"
                                                                    onChange={(e) => setFieldValue("enquiry_for", e.target.value)}
                                                                    value={values?.enquiry_for || ""}
                                                                />
                                                                <ErrorMessage name="enquiry_for" component="div" className="text-danger" />
                                                            </Col>

                                                            <Col md={3}>
                                                                <label className="form-label">Response</label>
                                                                <Field as="select" name="response" className="form-control">
                                                                    <option value="">Select</option>
                                                                    <option value="Good">Good</option>
                                                                    <option value="Very Good">Very Good</option>
                                                                    <option value="Bad">Bad</option>
                                                                </Field>
                                                                <ErrorMessage name="response" component="div" className="text-danger" />
                                                            </Col>

                                                            <Col md={12} className="text-end">
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
                                                                    ) : isEditMode ? "Update" : "Submit"}
                                                                </Button>
                                                            </Col>
                                                        </Row>

                                                    </div>

                                                </Form>

                                            </>
                                        )}
                                    </Formik>
                                </>) : (
                                    <>
                                        <ShimmerLoading height={65} width="100%" borderRadius={0} theme="dark" />
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

export default EnquiryForm;