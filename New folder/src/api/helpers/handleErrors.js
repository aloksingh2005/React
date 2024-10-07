import { notify } from "components/messages/Toast";

const handleErrors = (errors, defaultMessage) => {
    if (errors) {
        Object.values(errors).forEach((fieldErrors) => {
            fieldErrors.forEach((errorMsg) => notify.error(`ERROR !! ${errorMsg}`));
        });
    } else {
        notify.error(defaultMessage || "ERROR !! Something went wrong.");
    }
};
export default handleErrors;