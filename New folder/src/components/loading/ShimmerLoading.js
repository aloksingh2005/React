// ShimmerLoading.js

import React from "react";
import "./ShimmerLoading.css";

const ShimmerLoading = ({ height, width, borderRadius = null, theme = "light" }) => {
    return <div className="shimmer-loading" style={{ height, width, borderRadius, background: theme == "light" ? "#fff" : "var(--body-color)" }} />;
};

export default ShimmerLoading;
