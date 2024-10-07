// Layout.js
import Header from "includes/Header";
import Footer from "includes/Footer";
import { Outlet } from "react-router-dom";
import Sidebar from "includes/Sidebar";
import { AuthProvider } from "app/hooks/context";
import TapToTop from "includes/TapToTop";
import Loader from "includes/Loader";
import { useEffect, useState } from "react";

const Layout = () => {


  const [layout, setLayout] = useState(localStorage.getItem("sidebarMode") || "vertical"); // Default layout
  // Check if user is on a mobile device
  const isMobile = () => window.innerWidth <= 1199;

  // State to manage sidebar's open/close status
  const [isSidebarClosed, setIsSidebarClosed] = useState(isMobile());

  // Effect to handle window resize event
  useEffect(() => {
    const handleResize = () => {
      if (isMobile() && !isSidebarClosed) {
        setIsSidebarClosed(true);
      } else {
        setIsSidebarClosed(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isSidebarClosed]);

  // Function to toggle sidebar open/close status
  const toggleSidebar = () => {
    setIsSidebarClosed(!isSidebarClosed);
  };

  const handleLayoutChange = (event) => {
    setLayout(event.target.value);
    localStorage.setItem("sidebarMode", event.target.value);
  };

  return (
    <>
      <AuthProvider>
        <TapToTop />
        <Loader />
        <main class={`page-wrapper compact-wrapper ${isSidebarClosed ? 'sidebar-close' : ''} ${layout === 'horizontal' ? 'horizontal-sidebar' : ''}`} id="pageWrapper">
          <Header
            layout={layout}
            handleLayoutChange={handleLayoutChange}
            isSidebarClosed={isSidebarClosed}
            toggleSidebar={toggleSidebar}
          />
          {/* <!-- Page header end--> */}
          <div class="page-body-wrapper">
            <Sidebar />
            <div class="page-body">
              <Outlet />
            </div>
            <Footer />
          </div>
        </main>
      </AuthProvider>
    </>
  );
};

export default Layout;
