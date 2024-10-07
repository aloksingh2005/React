// context.js
import { createContext, useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { notify } from 'components/messages/Toast';
import AuthData from 'auth/AuthData';
import { storeTokenAndUserData, retrieveTokenAndUserData, clearTokenAndUserData } from '../utils/tokenManager'; // Import token manager

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [isLoginned, setLogin] = useState(true);
    const [userData, setProfile] = useState(null);

    // Load token and user data from cookies on mount
    useEffect(() => {
        const data = retrieveTokenAndUserData();
        if (data) {
            setProfile(data.user);
            setLogin(true);
        }
    }, []);

    const login = (tokenData, userData) => {
        storeTokenAndUserData(tokenData, userData);
        setLogin(true);
        setProfile(userData);
        notify.success("SUCCESS !! Logged in successfully.");
    };

    const logout = () => {
        clearTokenAndUserData();
        setProfile(null);
        setLogin(false);
        notify.success("SUCCESS !! Logged out successfully.");
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ isLoginned, userData, login, logout }}>
            {isLoginned ? (
                <>
                    <AuthData />
                    {children}
                </>
            ) : (
                <Navigate to="/login" state={{ message: 'Please login to continue.' }} />
            )}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
