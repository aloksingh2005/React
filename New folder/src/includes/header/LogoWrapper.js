import lightLogo from "assets/images/logo/enexa-logo-color.png";
import darkLogo from "assets/images/logo/enexa-logo-mix-white.png";
import { Link } from "react-router-dom";

const LogoWrapper = ({ isSidebarClosed, toggleSidebar }) => (
    <div className="logo-wrapper d-flex align-items-center col-auto">
        <Link to="/dashboard">
            <img className="for-light" src={lightLogo} alt="logo" />
            <img className="for-dark" src={darkLogo} alt="logo" />
        </Link>
        
        <a className="close-btn" onClick={toggleSidebar} href="#!">
            <div className={`toggle-sidebar ${isSidebarClosed ? "close":""}`}>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>
        </a>
    </div>
);

export default LogoWrapper;
