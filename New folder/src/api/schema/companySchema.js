import * as Yup from 'yup';

const companySchema = Yup.object().shape({
    name: Yup.string().required("Company Name is required"),
    email: Yup.string().email("Invalid company email").required("Email is required"),
    phone: Yup.string()
        .matches(/^[0-9]{10}$/, "Company Phone number is not valid")
        .required("Company Phone is required"),
    cin: Yup.string().required("CIN is required"),
    address: Yup.string().required("Address is required"),
    user_name: Yup.string().required("User name is required"),
    user_email: Yup.string().email("Invalid user email").required("User email is required"),
    user_mobile: Yup.string()
        .matches(/^[0-9]{10}$/, "Invalid mobile number")
        .required("User mobile is required"),
    user_location: Yup.string().required("User location is required"),
    user_password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    smsApiUrl: Yup.string().url("Invalid URL").required("SMS API URL is required"),
    mailApiUrl: Yup.string().url("Invalid URL").required("Mail API URL is required"),
    whatsappAppKey: Yup.string().required("WhatsApp App Key is required"),
    whatsappAuthKey: Yup.string().required("WhatsApp Auth Key is required"),
    mkey: Yup.string().required("API MKEY is required"),
    mid: Yup.string().required("API MID is required"),
    acHolderName: Yup.string().required("A/C Holder Name is required"),
    bankName: Yup.string().required("Bank Name is required"),
    bankAccountNo: Yup.number()
        .typeError("Bank Account No must be a number")
        .required("Bank Account No is required")
        .positive("Bank Account No must be positive")
        .integer("Bank Account No must be an integer"),
    bankIfscCode: Yup.string()
        .matches(/^[A-Z]{4}[0][A-Z0-9]{6}$/, "Invalid Bank IFSC Code")
        .required("Bank IFSC Code is required"),
    upiID: Yup.string().required("UPI ID is required"),
    companyLogo: Yup.mixed().nullable(),
    companyFavicon: Yup.mixed().nullable(),
    companySignature: Yup.mixed().nullable(),
    upiQrImage: Yup.mixed().nullable(),
    user_photo: Yup.mixed()
        .nullable()
        .required("User photo is required")
        .test("fileSize", "User photo too large", value =>
            !value || (value && value.size <= 5 * 1024 * 1024)
        )
        .test("fileType", "User photo unsupported file format", value =>
            !value || (value && ["image/jpeg", "image/png"].includes(value.type))
        ),
});

export default companySchema;