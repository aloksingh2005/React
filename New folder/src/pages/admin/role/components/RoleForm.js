import roleSchema from "api/schema/roleSchema";
import ShimmerLoading from "components/loading/ShimmerLoading";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";

const RoleForm = ({ title, handleSubmit, isSubmitting, roleData, isEditMode }) => {
    const [activeTab, setActiveTab] = useState('info');
    const [editData, setEditData] = useState(null);

    const handleTabClick = (tab) => setActiveTab(tab);
    const initialValues = roleData;


    useEffect(() => {
        if (initialValues) {
            setEditData(roleData);
        }
    }, [initialValues]);
    // console.log("data:", initialValues?.name);

    const handleSubmitClick = (values) => {
        const errors = {};
        try {
            // Validate values using Yup schema
            roleSchema.validateSync(values, { abortEarly: false });
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
                                                <h6>{tab === 'info' ? 'Role Info' : tab === 'user' ? 'User Info' : tab === 'api' ? 'API\'S & SERVICES' : tab === 'account' ? 'Account Info' : 'Files'}</h6>
                                                <p>{tab === 'info' ? 'Add role details' : tab === 'user' ? 'Add User Details' : tab === 'api' ? 'Configure your APIs' : tab === 'account' ? 'Add role a/c details' : 'Upload role files'}</p>
                                            </div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                        <div className="col-xxl-9 col-xl-8 col-12">
                            <div className="tab-content">
                                {editData ? (<>
                                    <Formik
                                        initialValues={editData ? editData : initialValues}
                                        validationSchema={roleData ? null : roleSchema}
                                        onSubmit={handleSubmit}

                                    >
                                        {({ values, setFieldValue }) => (
                                            <>
                                                <Form method="post" encType="multipart/form-data" noValidate>
                                                    {/* Tab for Role Information */}
                                                    <div className={`tab-pane fade ${activeTab === 'info' ? "active show" : "d-none"}`}>
                                                        <Row className="g-3">
                                                            <Col md={6}>
                                                                <label className="form-label">Role Name</label>
                                                                <Field
                                                                    name="name"
                                                                    type="text"
                                                                    className="form-control"
                                                                    onChange={(e) => setFieldValue("name", e.target.value)}
                                                                    value={values?.name || editData?.name || ""}
                                                                />
                                                                <ErrorMessage name="name" component="div" className="text-danger" />
                                                            </Col>

                                                            <Col md={6} className="align-items-md-end col-md-6 d-md-flex mt-3 text-end">
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

export default RoleForm;