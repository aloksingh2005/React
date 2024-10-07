import * as Yup from 'yup';

const classSchema = Yup.object().shape({
    id: Yup.string().required("ID is required"),
    fullname: Yup.string().required("Full Name is required"),
    shortname: Yup.string().required("Short Name is required"),
});
export default classSchema;