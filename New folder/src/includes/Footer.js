import React from "react";
import heart from "assets/svg/iconly-sprite.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 footer-copyright">
            <p className="mb-0">Copyright 2024 © Enexa IT Solutions.</p>
          </div>
          <div className="col-md-6">
            <p className="float-end mb-0">
              Hand crafted &amp; made with{" "}
              <svg className="svg-color footer-icon">
                <use href={`${heart}#footer-heart`}></use>
              </svg>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
