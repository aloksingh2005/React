import * as Yup from 'yup';

const sectionSchema = Yup.object().shape({
    id: Yup.string().required("ID is required"),
    sectiontitle: Yup.string().required("Section Title Name is required"),
});
export default sectionSchema;