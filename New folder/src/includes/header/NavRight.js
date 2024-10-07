import DarkMode from "./DarkMode";
import NotificationDropdown from "./NotificationDropdown";
import ProfileDropdown from "./ProfileDropdown";
import iconlySprite from "assets/svg/iconly-sprite.svg";
import SideBarMode from "./SideBarMode";

const NavRight = ({ layout, handleLayoutChange }) => (
    <div className="nav-right">
        <ul className="header-right">
            <SideBarMode layout={layout} handleLayoutChange={handleLayoutChange} />
            <DarkMode />
            <NotificationDropdown />
            <ProfileDropdown />
        </ul>
    </div>
);

export default NavRight;
