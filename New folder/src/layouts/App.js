import React, { Fragment, useEffect } from "react";

import AllRoute from "../routes/web";
import { Toast } from "components/messages/Toast";

function App() {

  const getQueryParam = (paramName) => {
    const queryParams = new URLSearchParams(window.location.search);
    return queryParams.get(paramName);
  };

 
  useEffect(() => {
    const token = getQueryParam('token'); // Change 'myParam' to your desired query parameter name
    if (token !== null) {
      localStorage.setItem("authToken", token);
    }
  }, []); // Only run the effect when apiRequestMade changes

  return (
    <div>
      <React.StrictMode>
        <Fragment>
          <AllRoute />
        </Fragment>
      </React.StrictMode>
      <Toast />
    </div>
  );
}

export default App;
