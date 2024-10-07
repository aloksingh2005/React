import * as Yup from 'yup';

const roleSchema = Yup.object().shape({
    name: Yup.string().required("Role Name is required"),
});

export default roleSchema;