import * as Yup from 'yup';

const registrationSchema = Yup.object().shape({
    id: Yup.string().required("ID is required"),
    registration_no: Yup.string().required("Registration No. is required"),
    class: Yup.string().required("Class is required"),
    full_name: Yup.string().required("Full Name is required"),
    gender: Yup.string().required("Gender is required"),
    date_of_birth: Yup.date().required("Date of Birth is required"),
    category: Yup.string().required("Category is required"),
    religion: Yup.string().required("Religion is required"),
    caste: Yup.string().required("Caste is required"),
    mobile_number: Yup.string()
        .required("Mobile Number is required")
        .matches(/^[0-9]+$/, "Mobile Number must be only digits")
        .min(10, "Mobile Number must be at least 10 digits")
        .max(10, "Mobile Number can't exceed 10 digits"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    admission_date: Yup.date().required("Admission Date is required"),
    blood_group: Yup.string().required("Blood Group is required"),
    father_name: Yup.string().required("Father Name is required"),
    father_phone: Yup.string()
        .required("Father Phone is required")
        .matches(/^[0-9]+$/, "Father Phone must be only digits")
        .min(10, "Father Phone must be at least 10 digits")
        .max(10, "Father Phone can't exceed 10 digits"),
    father_occupation: Yup.string().required("Father Occupation is required"),
    mother_name: Yup.string().required("Mother Name is required"),
    mother_phone: Yup.string()
        .required("Mother Phone is required")
        .matches(/^[0-9]+$/, "Mother Phone must be only digits")
        .min(10, "Mother Phone must be at least 10 digits")
        .max(10, "Mother Phone can't exceed 10 digits"),
    mother_occupation: Yup.string().required("Mother Occupation is required"),
    guardian_relation: Yup.string().required("Guardian Relation is required"),
    guardian_name: Yup.string().required("Guardian Name is required"),
    guardian_phone: Yup.string()
        .required("Guardian Phone is required")
        .matches(/^[0-9]+$/, "Guardian Phone must be only digits")
        .min(10, "Guardian Phone must be at least 10 digits")
        .max(10, "Guardian Phone can't exceed 10 digits"),
    guardian_occupation: Yup.string().required("Guardian Occupation is required"),
    guardian_email: Yup.string().email("Invalid email format").required("Guardian Email is required"),
    guardian_address: Yup.string().required("Guardian Address is required"),
    guardian_current_address: Yup.string().required("If Guardian Address is Current Address is required"),
    guardian_permanent_address: Yup.string().required("If Permanent Address is Current Address is required"),
    current_address: Yup.string().required("Current Address is required"),
    permanent_address: Yup.string().required("Permanent Address is required"),
    registration_fee: Yup.number()
        .required("Registration Fee is required")
        .min(0, "Registration Fee must be a positive number"),
});

export default registrationSchema;