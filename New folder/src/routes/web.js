import Layout from "layouts/Layout";
import Common from "pages/admin/common/Page";
import CompanyCreate from "pages/admin/company/create-edit";
import CompanyList from "pages/admin/company/list";
import Dashboard from "pages/admin/dashboard/Dashboard";
import EditProfile from "pages/admin/user/EditProfile";
import Profile from "pages/admin/user/Profile";
import NotFound from "pages/error/404/NotFound";
import Login from "pages/login/Login";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import RouteResource from "./components/RouteResource";
import RoleList from "pages/admin/role/list";
import RoleCreate from "pages/admin/role/create-edit";
import FrontOfficeRoute from "./routeGroups/frontOffice";
import StudentMasterRoute from "./routeGroups/studentMaster";


const AllRoute = () => {
  let basename = "/";

  return (
    <Router basename={basename}>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* This is a private route */}
        <Route element={<Layout />}>
          <Route index path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />

          {/* Use the spread operator to insert the routes returned by RouteResource */}
          {RouteResource({
            path: "role",
            list: <RoleList />,
            create: <RoleCreate />,
            edit: <RoleCreate />,
          })}

          {RouteResource({
            path: "company",
            list: <CompanyList />,
            create: <CompanyCreate />,
            edit: <CompanyCreate />,
          })}

          <Route element={<FrontOfficeRoute />} />
          <Route element={<StudentMasterRoute />} />

          <Route path="/support-ticket" element={<Common />} />
        </Route>

        {/* Error route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AllRoute;