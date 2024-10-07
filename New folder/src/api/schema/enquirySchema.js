import * as Yup from 'yup';

const enquirySchema = Yup.object().shape({
    id: Yup.string().required("ID is required"),
    name: Yup.string().required("Name is required"),
    phone: Yup.string()
        .matches(/^[0-9]+$/, "Phone number must be numeric")
        .min(10, "Phone number must be at least 10 digits")
        .required("Phone is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    address: Yup.string().required("Address is required"),
    description: Yup.string().nullable(),  // Optional
    note: Yup.string().nullable(),          // Optional
    date: Yup.date().required("Date is required"),
    followUpDate: Yup.date().nullable(),    // Optional
    assigned: Yup.string().nullable(),      // Optional
    reference: Yup.string().nullable(),     // Optional
    source: Yup.string().nullable(),        // Optional
    enquiryFor: Yup.string().nullable(),    // Optional
    response: Yup.string().nullable(),      // Optional
});
export default enquirySchema;