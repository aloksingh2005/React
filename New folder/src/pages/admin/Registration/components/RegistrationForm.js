import registrationSchema from "api/schema/registrationSchema";
import ShimmerLoading from "components/loading/ShimmerLoading";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";

const ClassForm = ({ title, handleSubmit, isSubmitting, registrationData, isEditMode }) => {
    const [activeTab, setActiveTab] = useState('info');
    const [editData, setEditData] = useState(null);

    const handleTabClick = (tab) => setActiveTab(tab);
    const initialValues = registrationData;


    useEffect(() => {
        if (initialValues) {
            setEditData(registrationData);
        }
    }, [initialValues]);
    // console.log("data:", initialValues?.name);

    const handleSubmitClick = (values) => {
        const errors = {};
        try {
            // Validate values using Yup schema
            registrationSchema.validateSync(values, { abortEarly: false });
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
                            <div className="nav flex-column header-vertical-wizard" registration="tablist" aria-orientation="vertical">
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
                                                <p>{tab === 'info' ? 'Add registration details' : tab === 'user' ? 'Add User Details' : tab === 'api' ? 'Configure your APIs' : tab === 'account' ? 'Add registration a/c details' : 'Upload registration files'}</p>
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
                                        validationSchema={registrationData ? null : registrationSchema}
                                        onSubmit={handleSubmit}

                                    >
                                        {({ values, setFieldValue }) => (
                                            <>
                                                <Form method="post" encType="multipart/form-data" noValidate>
                                                    {/* Tab for Class Information */}
                                                    <div className={`tab-pane fade ${activeTab === 'info' ? "active show" : "d-none"}`}>
                                                        <Row className="g-3">
                                                            <Col md={3}>
                                                                <label className="form-label">Registration No.</label>
                                                                <small className="req"> *</small>
                                                                <Field
                                                                    name="registration_no" // Use the correct field name for registration number
                                                                    type="text"
                                                                    className="form-control"
                                                                    onChange={(e) => setFieldValue("registration_no", e.target.value)} // Set the correct field value for registration number
                                                                    value={values?.registration_no || ""}
                                                                />
                                                                <ErrorMessage name="registration_no" component="div" className="text-danger" />
                                                            </Col>

                                                            <Col md={3}>
                                                                <label className="form-label">Class</label>
                                                                <small className="req"> *</small>
                                                                <Field
                                                                    as="select"
                                                                    name="class" // Use the correct field name for class
                                                                    className="form-control"
                                                                    onChange={(e) => setFieldValue("class", e.target.value)} // Set the correct field value for class
                                                                    value={values?.class || ""}
                                                                >
                                                                    <option value="">Select</option>
                                                                    <option value="PLAY">PLAY</option>
                                                                    <option value="NUR">NUR</option>
                                                                    <option value="LKG">LKG</option>
                                                                    <option value="UKG">UKG</option>
                                                                    <option value="IX">IX</option>
                                                                    <option value="X">X</option>
                                                                    <option value="UKG (2019-20)">UKG (2019-20)</option>
                                                                    <option value="10 (2019-20)">10 (2019-20)</option>
                                                                    <option value="CLASS -X PASS OUT (SESSION-2020-21)">CLASS -X PASS OUT (SESSION-2020-21)</option>
                                                                    <option value="UKG (2020-21)">UKG (2020-21)</option>
                                                                    <option value="UKG_21_22">UKG_21_22</option>
                                                                    <option value="10th pass 21-22">10th pass 21-22</option>
                                                                </Field>
                                                                <ErrorMessage name="class" component="div" className="text-danger" />
                                                            </Col>

                                                            <Col md={3}>
                                                                <label className="form-label">Full Name</label>
                                                                <small className="req"> *</small>
                                                                <Field
                                                                    name="full_name" // Use the correct field name for full name
                                                                    type="text"
                                                                    className="form-control"
                                                                    onChange={(e) => setFieldValue("full_name", e.target.value)} // Set the correct field value for full name
                                                                    value={values?.full_name || ""}
                                                                />
                                                                <ErrorMessage name="full_name" component="div" className="text-danger" />
                                                            </Col>

                                                            <Col md={3}>
                                                                <label className="form-label">Gender</label>
                                                                <small className="req"> *</small>
                                                                <Field
                                                                    as="select"
                                                                    name="gender" // Use the correct field name for gender
                                                                    className="form-control"
                                                                    onChange={(e) => setFieldValue("gender", e.target.value)} // Set the correct field value for gender
                                                                    value={values?.gender || ""}
                                                                >
                                                                    <option value="">Select</option>
                                                                    <option value="Male">Male</option>
                                                                    <option value="Female">Female</option>
                                                                </Field>
                                                                <ErrorMessage name="gender" component="div" className="text-danger" />
                                                            </Col>

                                                            <Col md={3}>
                                                                <label className="form-label">Date of Birth</label>
                                                                <small className="req"> *</small>
                                                                <Field
                                                                    name="date_of_birth" // Use the correct field name for date of birth
                                                                    type="date"
                                                                    className="form-control"
                                                                    onChange={(e) => setFieldValue("date_of_birth", e.target.value)} // Set the correct field value for date of birth
                                                                    value={values?.date_of_birth || ""}
                                                                />
                                                                <ErrorMessage name="date_of_birth" component="div" className="text-danger" />
                                                            </Col>

                                                            <Col md={3}>
                                                                <label className="form-label">Category</label>
                                                                <small className="req"> *</small>
                                                                <Field
                                                                    as="select"
                                                                    name="category" // Use the correct field name for category
                                                                    className="form-control"
                                                                    onChange={(e) => setFieldValue("category", e.target.value)} // Set the correct field value for category
                                                                    value={values?.category || ""}
                                                                >
                                                                    <option value="">Select</option>
                                                                    <option value="general">General</option>
                                                                    <option value="obc">OBC</option>
                                                                    <option value="special">Special</option>
                                                                    <option value="physically_challenged">Physically Challenged</option>
                                                                </Field>
                                                                <ErrorMessage name="category" component="div" className="text-danger" />
                                                            </Col>

                                                            <Col md={3}>
                                                                <label className="form-label">Religion</label>
                                                                <small className="req"> *</small>
                                                                <Field
                                                                    name="religion" // Use the correct field name for religion
                                                                    type="text"
                                                                    className="form-control"
                                                                    onChange={(e) => setFieldValue("religion", e.target.value)} // Set the correct field value for religion
                                                                    value={values?.religion || ""}
                                                                />
                                                                <ErrorMessage name="religion" component="div" className="text-danger" />
                                                            </Col>

                                                            <Col md={3}>
                                                                <label className="form-label">Caste</label>
                                                                <small className="req"> *</small>
                                                                <Field
                                                                    name="caste" // Use the correct field name for caste
                                                                    type="text"
                                                                    className="form-control"
                                                                    onChange={(e) => setFieldValue("caste", e.target.value)} // Set the correct field value for caste
                                                                    value={values?.caste || ""}
                                                                />
                                                                <ErrorMessage name="caste" component="div" className="text-danger" />
                                                            </Col>

                                                            <Col md={3}>
                                                                <label className="form-label">Mobile Number</label>
                                                                <small className="req"> *</small>
                                                                <Field
                                                                    name="mobile_number" // Use the correct field name for mobile number
                                                                    type="number"
                                                                    className="form-control"
                                                                    onChange={(e) => setFieldValue("mobile_number", e.target.value)} // Set the correct field value for mobile number
                                                                    value={values?.mobile_number || ""}
                                                                />
                                                                <ErrorMessage name="mobile_number" component="div" className="text-danger" />
                                                            </Col>

                                                            <Col md={3}>
                                                                <label className="form-label">Email</label>
                                                                <small className="req"> *</small>
                                                                <Field
                                                                    name="email" // Use the correct field name for email
                                                                    type="email"
                                                                    className="form-control"
                                                                    onChange={(e) => setFieldValue("email", e.target.value)} // Set the correct field value for email
                                                                    value={values?.email || ""}
                                                                />
                                                                <ErrorMessage name="email" component="div" className="text-danger" />
                                                            </Col>

                                                            <Col md={3}>
                                                                <label className="form-label">Admission Date</label>
                                                                <small className="req"> *</small>
                                                                <Field
                                                                    name="admission_date" // Use the correct field name for admission date
                                                                    type="text"
                                                                    className="form-control"
                                                                    onChange={(e) => setFieldValue("admission_date", e.target.value)} // Set the correct field value for admission date
                                                                    value={values?.admission_date || ""}
                                                                />
                                                                <ErrorMessage name="admission_date" component="div" className="text-danger" />
                                                            </Col>

                                                            <Col md={3}>
                                                                <label className="form-label">Blood Group</label>
                                                                <small className="req"> *</small>
                                                                <Field
                                                                    as="select"
                                                                    name="blood_group" // Use the correct field name for blood group
                                                                    className="form-control"
                                                                    onChange={(e) => setFieldValue("blood_group", e.target.value)} // Set the correct field value for blood group
                                                                    value={values?.blood_group || ""}
                                                                >
                                                                    <option value="">Select</option>
                                                                    <option value="O+">O+</option>
                                                                    <option value="A+">A+</option>
                                                                    <option value="B+">B+</option>
                                                                    <option value="AB+">AB+</option>
                                                                    <option value="O-">O-</option>
                                                                    <option value="A-">A-</option>
                                                                    <option value="B-">B-</option>
                                                                    <option value="AB-">AB-</option>
                                                                </Field>
                                                                <ErrorMessage name="blood_group" component="div" className="text-danger" />
                                                            </Col>

                                                            <Row className="mt-3 mb-3"> {/* Add margin bottom to the row */}
                                                                <Col md={3}>
                                                                    <label className="form-label">Student Photo</label>
                                                                    <small className="req"> *</small>
                                                                    <Field
                                                                        name="student_photo" // Use the correct field name for student photo
                                                                        type="file"
                                                                        className="form-control"
                                                                        onChange={(e) => setFieldValue("student_photo", e.target.files[0])} // Set the correct field value for student photo
                                                                    />
                                                                    <ErrorMessage name="student_photo" component="div" className="text-danger" />
                                                                </Col>
                                                            </Row>

                                                            <h4>Parent Guardian Detail</h4>
                                                            <Col md={4}>
                                                                <label className="form-label">Father Name</label>
                                                                <Field
                                                                    name="father_name"
                                                                    type="text"
                                                                    className="form-control"
                                                                    onChange={(e) => setFieldValue("father_name", e.target.value)}
                                                                    value={values?.father_name || ""}
                                                                />
                                                                <ErrorMessage name="father_name" component="div" className="text-danger" />
                                                            </Col>

                                                            <Col md={4}>
                                                                <label className="form-label">Father Phone</label>
                                                                <Field
                                                                    name="father_phone"
                                                                    type="text"
                                                                    className="form-control"
                                                                    onChange={(e) => setFieldValue("father_phone", e.target.value)}
                                                                    value={values?.father_phone || ""}
                                                                />
                                                                <ErrorMessage name="father_phone" component="div" className="text-danger" />
                                                            </Col>

                                                            <Col md={4}>
                                                                <label className="form-label">Father Occupation</label>
                                                                <Field
                                                                    name="father_occupation"
                                                                    type="text"
                                                                    className="form-control"
                                                                    onChange={(e) => setFieldValue("father_occupation", e.target.value)}
                                                                    value={values?.father_occupation || ""}
                                                                />
                                                                <ErrorMessage name="father_occupation" component="div" className="text-danger" />
                                                            </Col>

                                                            <Col md={4}>
                                                                <label className="form-label">Mother Name</label>
                                                                <Field
                                                                    name="mother_name"
                                                                    type="text"
                                                                    className="form-control"
                                                                    onChange={(e) => setFieldValue("mother_name", e.target.value)}
                                                                    value={values?.mother_name || ""}
                                                                />
                                                                <ErrorMessage name="mother_name" component="div" className="text-danger" />
                                                            </Col>

                                                            <Col md={4}>
                                                                <label className="form-label">Mother Phone</label>
                                                                <Field
                                                                    name="mother_phone"
                                                                    type="text"
                                                                    className="form-control"
                                                                    onChange={(e) => setFieldValue("mother_phone", e.target.value)}
                                                                    value={values?.mother_phone || ""}
                                                                />
                                                                <ErrorMessage name="mother_phone" component="div" className="text-danger" />
                                                            </Col>

                                                            <Col md={4}>
                                                                <label className="form-label">Mother Occupation</label>
                                                                <Field
                                                                    name="mother_occupation"
                                                                    type="text"
                                                                    className="form-control"
                                                                    onChange={(e) => setFieldValue("mother_occupation", e.target.value)}
                                                                    value={values?.mother_occupation || ""}
                                                                />
                                                                <ErrorMessage name="mother_occupation" component="div" className="text-danger" />
                                                            </Col>

                                                            <Col md={12}>
                                                                <label className="form-label">If Guardian Is</label>
                                                                <div role="group" aria-labelledby="my-radio-group" style={{ display: 'flex', gap: '15px' }}>
                                                                    <div>
                                                                        <label>
                                                                            <Field type="radio" name="guardian_relation" value="Father" />
                                                                            Father
                                                                        </label>
                                                                    </div>
                                                                    <div>
                                                                        <label>
                                                                            <Field type="radio" name="guardian_relation" value="Mother" />
                                                                            Mother
                                                                        </label>
                                                                    </div>
                                                                    <div>
                                                                        <label>
                                                                            <Field type="radio" name="guardian_relation" value="Other" />
                                                                            Other
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                <ErrorMessage name="guardian_relation" component="div" className="text-danger" />
                                                            </Col>

                                                            <Col md={4}>
                                                                <label className="form-label">Guardian Name</label>
                                                                <Field
                                                                    name="guardian_name"
                                                                    type="text"
                                                                    className="form-control"
                                                                    onChange={(e) => setFieldValue("guardian_name", e.target.value)}
                                                                    value={values?.guardian_name || ""}
                                                                />
                                                                <ErrorMessage name="guardian_name" component="div" className="text-danger" />
                                                            </Col>
                                                            <Col md={4}>
                                                                <label className="form-label">Guardian Relation</label>
                                                                <Field
                                                                    name="guardian_relation"
                                                                    type="text"
                                                                    className="form-control"
                                                                    onChange={(e) => setFieldValue("guardian_relation", e.target.value)}
                                                                    value={values?.guardian_relation || ""}
                                                                />
                                                                <ErrorMessage name="guardian_relation" component="div" className="text-danger" />
                                                            </Col>

                                                            <Col md={4}>
                                                                <label className="form-label">Guardian Phone</label>
                                                                <Field
                                                                    name="guardian_phone"
                                                                    type="text"
                                                                    className="form-control"
                                                                    onChange={(e) => setFieldValue("guardian_phone", e.target.value)}
                                                                    value={values?.guardian_phone || ""}
                                                                />
                                                                <ErrorMessage name="guardian_phone" component="div" className="text-danger" />
                                                            </Col>

                                                            <Col md={4}>
                                                                <label className="form-label">Guardian Occupation</label>
                                                                <Field
                                                                    name="guardian_occupation"
                                                                    type="text"
                                                                    className="form-control"
                                                                    onChange={(e) => setFieldValue("guardian_occupation", e.target.value)}
                                                                    value={values?.guardian_occupation || ""}
                                                                />
                                                                <ErrorMessage name="guardian_occupation" component="div" className="text-danger" />
                                                            </Col>

                                                            <Col md={4}>
                                                                <label className="form-label">Guardian Email</label>
                                                                <Field
                                                                    name="guardian_email"
                                                                    type="email"
                                                                    className="form-control"
                                                                    onChange={(e) => setFieldValue("guardian_email", e.target.value)}
                                                                    value={values?.guardian_email || ""}
                                                                />
                                                                <ErrorMessage name="guardian_email" component="div" className="text-danger" />
                                                            </Col>

                                                            <Col md={4}>
                                                                <label className="form-label">Guardian Address</label>
                                                                <Field
                                                                    name="guardian_address"
                                                                    type="text"
                                                                    className="form-control"
                                                                    onChange={(e) => setFieldValue("guardian_address", e.target.value)}
                                                                    value={values?.guardian_address || ""}
                                                                />
                                                                <ErrorMessage name="guardian_address" component="div" className="text-danger" />
                                                            </Col>

                                                            <h4>Student Address Details</h4>

                                                            <Col md={4}>
                                                                <div role="group" aria-labelledby="guardianCurrentAddress">
                                                                    <label>
                                                                        <Field type="checkbox" name="guardian_current_address" value="Yes" />
                                                                        If Guardian Address is Current Address
                                                                    </label>
                                                                </div>
                                                            </Col>

                                                            <Col md={4}>
                                                                <div role="group" aria-labelledby="guardianPermanentAddress">
                                                                    <label>
                                                                        <Field type="checkbox" name="guardian_permanent_address" value="Yes" />
                                                                        If Permanent Address is Current Address
                                                                    </label>
                                                                </div>
                                                            </Col>




                                                            <Col md={4}>
                                                                <label className="form-label">Current Address</label>
                                                                <Field
                                                                    name="current_address"
                                                                    type="text"
                                                                    className="form-control"
                                                                    onChange={(e) => setFieldValue("current_address", e.target.value)}
                                                                    value={values?.current_address || ""}
                                                                />
                                                                <ErrorMessage name="current_address" component="div" className="text-danger" />
                                                            </Col>

                                                            <Col md={4}>
                                                                <label className="form-label">Permanent Address</label>
                                                                <Field
                                                                    name="permanent_address"
                                                                    type="text"
                                                                    className="form-control"
                                                                    onChange={(e) => setFieldValue("permanent_address", e.target.value)}
                                                                    value={values?.permanent_address || ""}
                                                                />
                                                                <ErrorMessage name="permanent_address" component="div" className="text-danger" />
                                                            </Col>

                                                            <Col md={4}>
                                                                <label className="form-label">Registration Fee</label>
                                                                <Field
                                                                    name="registration_fee"
                                                                    type="number"
                                                                    className="form-control"
                                                                    onChange={(e) => setFieldValue("registration_fee", e.target.value)}
                                                                    value={values?.registration_fee || ""}
                                                                />
                                                                <ErrorMessage name="registration_fee" component="div" className="text-danger" />
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