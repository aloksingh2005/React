import { useContext, useEffect, useRef, useState } from "react";
import iconlySprite from "assets/svg/iconly-sprite.svg";
import profileImage from "assets/images/profile.png";
import { AuthContext } from "app/hooks/context";
import { Link } from "react-router-dom";

const ProfileDropdown = () => {
    const { userData, logout } = useContext(AuthContext);
    const [isVisible, setIsVisible] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleBodyClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsVisible(false);
            }
        };

        document.body.addEventListener('click', handleBodyClick);

        return () => {
            document.body.removeEventListener('click', handleBodyClick);
        };
    }, []);

    const toggleProfile = () => {
        setIsVisible(!isVisible);
    };

    return (
        <li
            onClick={toggleProfile}
            className={`profile-dropdown custom-dropdown ${isVisible ? 'show' : ''}`}
            ref={dropdownRef}
            aria-haspopup="true"
            aria-expanded={isVisible}
        >
            <div className="d-flex align-items-center">
                <img src={userData?.photo || profileImage} alt="Profile" />
                <div className="flex-grow-1">
                    <h5>{userData?.name || "User"}</h5>
                    <span>{userData?.role?.name || "Role"}</span>
                </div>
            </div>
            <div className={`custom-menu overflow-hidden ${isVisible ? 'show' : ''}`}>
                <ul>
                    <li className="d-flex">
                        <svg className="svg-color">
                            <use href={`${iconlySprite}#Profile`}></use>
                        </svg>
                        <Link className="ms-2" to="/profile">Account</Link>
                    </li>
                    <li className="d-flex">
                        <svg className="svg-color">
                            <use href={`${iconlySprite}#Login`}></use>
                        </svg>
                        <a className="ms-2" onClick={logout} href="#">Log Out</a>
                    </li>
                </ul>
            </div>
        </li>
    );
};

export default ProfileDropdown;
