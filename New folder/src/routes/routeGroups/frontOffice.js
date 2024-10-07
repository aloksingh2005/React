import ClassList from "pages/admin/class/list";
import EnquiryCreate from "pages/admin/enquiry/create-edit";
import EnquiryList from "pages/admin/enquiry/list";
import RegistrationCreate from "pages/admin/Registration/create-edit";
import RegistrationList from "pages/admin/Registration/list";
import SectionCreate from "pages/admin/section/create-edit";
import SectionList from "pages/admin/section/list";

const { default: RouteResource } = require("../components/RouteResource");

const FrontOfficeRoute = () => {
    return (
      <Routes>
        {RouteResource({
          path: "enquiry",
          list: <EnquiryList />,
          create: <EnquiryCreate />,
          edit: <EnquiryCreate />,
        })}
  
        {RouteResource({
          path: "classes",
          list: <ClassList />,
          create: <ClassesCreate />,
          edit: <ClassesCreate />,
        })}
  
        {RouteResource({
          path: "section",
          list: <SectionList />,
          create: <SectionCreate />,
          edit: <SectionCreate />,
        })}
  
      </Routes>
    );
  };
  export default FrontOfficeRoute;