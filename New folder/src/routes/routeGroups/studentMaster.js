import ClassList from "pages/admin/class/list";
import EnquiryCreate from "pages/admin/enquiry/create-edit";
import EnquiryList from "pages/admin/enquiry/list";
import RegistrationCreate from "pages/admin/Registration/create-edit";
import RegistrationList from "pages/admin/Registration/list";
import SectionCreate from "pages/admin/section/create-edit";
import SectionList from "pages/admin/section/list";

const { default: RouteResource } = require("../components/RouteResource");

const StudentMasterRoute = () => {
    return (
      <Routes>
      
        {RouteResource({
          path: "registration",
          list: <RegistrationList />,
          create: <RegistrationCreate />,
          edit: <RegistrationCreate />,
        })}
      </Routes>
    );
  };
  export default StudentMasterRoute;