import sectionSchema from "api/schema/sectionSchema";
import ShimmerLoading from "components/loading/ShimmerLoading";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";

const ClassForm = ({ title, handleSubmit, isSubmitting, sectionData, isEditMode }) => {
    const [activeTab, setActiveTab] = useState('info');
    const [editData, setEditData] = useState(null);

    const handleTabClick = (tab) => setActiveTab(tab);
    const initialValues = sectionData;


    useEffect(() => {
        if (initialValues) {
            setEditData(sectionData);
        }
    }, [initialValues]);
    // console.log("data:", initialValues?.name);

    const handleSubmitClick = (values) => {
        const errors = {};
        try {
            // Validate values using Yup schema
            sectionSchema.validateSync(values, { abortEarly: false });
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
                            <div className="nav flex-column header-vertical-wizard" section="tablist" aria-orientation="vertical">
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
                                                <h6>{tab === 'info' ? 'Class Info' : tab === 'user' ? 'User Info' : tab === 'api' ? 'API\'S & SERVICES' : tab === 'account' ? 'Account Info' : 'Files'}</h6>
                                                <p>{tab === 'info' ? 'Add section details' : tab === 'user' ? 'Add User Details' : tab === 'api' ? 'Configure your APIs' : tab === 'account' ? 'Add section a/c details' : 'Upload section files'}</p>
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
                                        validationSchema={sectionData ? null : sectionSchema}
                                        onSubmit={handleSubmit}

                                    >
                                        {({ values, setFieldValue }) => (
                                            <>
                                                <Form method="post" encType="multipart/form-data" noValidate>
                                                    {/* Tab for Class Information */}
                                                    <div className={`tab-pane fade ${activeTab === 'info' ? "active show" : "d-none"}`}>
                                                        <Row className="g-3">
                                                            <Col md={6}>
                                                                <label className="form-label">Section Title</label>
                                                                <small className="req"> *</small>
                                                                <Field
                                                                    name="section_title" // Use the correct field name for section title
                                                                    type="text"
                                                                    className="form-control"
                                                                    onChange={(e) => setFieldValue("section_title", e.target.value)} // Set the correct field value for section title
                                                                    value={values?.section_title || ""} // Bind value to 'section_title'
                                                                />
                                                                <ErrorMessage name="section_title" component="div" className="text-danger" /> {/* Show error for section_title */}
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

export default ClassForm;