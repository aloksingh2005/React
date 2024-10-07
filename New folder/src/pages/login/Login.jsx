import logoLight from "assets/images/logo/enexa-logo-color.png";
import logoDark from "assets/images/logo/enexa-logo-mix-white.png";
import { notify } from 'components/messages/Toast';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "./login.css";
import ApiService from "api/services/ApiService";
import { storeTokenAndUserData } from "app/utils/tokenManager";

const Login = () => {

    const navigate = useNavigate();

    const location = useLocation();
    const [message, setMessage] = useState(location.state?.message || '');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (location.state?.message) {
            notify.info(`${message}`);
            // Clear the message from location state after displaying it
            const timer = setTimeout(() => {
                setMessage('');
                // Clear the message in location state without directly mutating it
                window.history.replaceState({}, document.title);
            }, 3000); // Adjust the timeout duration as needed

            // Cleanup the timeout if the component unmounts
            return () => clearTimeout(timer);
        }
    }, [location.state?.message]);

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const apiService = ApiService(); // Instantiate ApiService
            const { data } = await apiService.default("auth", { usercode: email, password });
            const { status, token, ...userData } = data;

            if (status === 1) {
                storeTokenAndUserData(token, JSON.stringify(userData));
                notify.success("SUCCESS !! Logged in successfully.");
                navigate("/dashboard");
            } else {
                notify.error(data.message || "ERROR !! Something Went Wrong.");
            }
        } catch (error) {
            console.error("Login error:", error);
            notify.error("ERROR !! Something Went Wrong.");
        }
    };


    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="container-fluid p-0">
            <div className="row m-0">
                <div className="col-12 p-0">

                    <div className="login-card login-dark">

                        <div className="background">
                            <div className="shape"></div>
                            <div className="shape"></div>
                            <div className="shape"></div>
                            <div className="shape"></div>
                            <div className="shape"></div>
                            <div className="shape"></div>
                        </div>


                        <div className='inner'>

                            <div>
                                <Link className="logo" to="/">
                                    <img className="img-fluid for-light" src={logoLight} alt="loginpage" />
                                    <img className="img-fluid for-dark m-auto" src={logoDark} alt="logo" />
                                </Link>
                            </div>

                            <div className="login-main">

                                <form className="theme-form" onSubmit={handleSubmit}>
                                    <h2 className="text-center">Sign in to account</h2>
                                    <p className="text-center">Enter your User ID &amp; password to login</p>

                                    <div className="form-group">
                                        <label className="col-form-label">User ID</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            required
                                            placeholder="ENEXA0001"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label">Password</label>
                                        <div className="form-input position-relative">
                                            <input
                                                className="form-control"
                                                type={showPassword ? "text" : "password"}
                                                name="login[password]"
                                                required
                                                placeholder="*********"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <div className="show-hide" onClick={toggleShowPassword}>
                                                <i className={`fa-regular fa-fw ${showPassword ? 'fa-eye-slash' : ' fa-eye'}`}></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group mb-0 checkbox-checked">
                                        <div className="form-check checkbox-solid-info">
                                            <input
                                                className="form-check-input"
                                                id="solid6"
                                                type="checkbox"
                                                checked={remember}
                                                onChange={(e) => setRemember(e.target.checked)}
                                            />
                                            <label className="form-check-label" htmlFor="solid6">Remember password</label>
                                        </div>
                                        <Link className="link-two" to="/forget-password">Forgot password?</Link>
                                        <div className="text-end mt-3">
                                            <button type="submit" className="btn btn-primary btn-block w-100 text-white">
                                                Sign in
                                            </button>
                                        </div>
                                    </div>

                                </form>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
