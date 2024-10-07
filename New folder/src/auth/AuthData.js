// import ApiService from "api/services/ApiService";
import { AuthContext } from "app/hooks/context";
import { notify } from "components/messages/Toast";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthData = () => {
    const { login, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        // const checkLogin = () => {
        //     ApiService.getAll("userdata")
        //         .then((response) => {
        //             if (response.status === 200) {
        //                 const user = response.data.data;
        //                 login(user.token, user);
        //             } else {
        //                 notify.error('Your session is expired. Please login to continue. ');
        //                 navigate('/login');
        //             }
        //         })
        //         .catch((error) => {
        //             console.error("Error fetching user data:", error);
        //             notify.error('Please login to start your session.');
        //             navigate('/login');
        //         });
        // };

        // checkLogin();
    }, [login, logout]);

    return null; // No UI to render
};

export default AuthData;
