import { AuthContext } from "app/hooks/context";
import { useContext } from "react";
import LogoWrapper from "./header/LogoWrapper";
import NavRight from "./header/NavRight";

const Header = ({ layout, handleLayoutChange, isSidebarClosed, toggleSidebar }) => {

  useContext(AuthContext);

  return (
    <>
      <header className="page-header row">
        <LogoWrapper
          isSidebarClosed={isSidebarClosed}
          toggleSidebar={toggleSidebar} />
        <div className="page-main-header col">
          <div className="header-left d-lg-block d-none">
          </div>
          <NavRight 
          layout={layout} 
          handleLayoutChange={handleLayoutChange}  />
        </div>
      </header>
    </>
  );
};

export default Header;
