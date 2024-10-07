import React from 'react';
import ReactDOM from "react-dom/client";
import reportWebVitals from './reportWebVitals';
import App from './layouts/App';

// Import external CSS files
import 'assets/css/vendors/@fortawesome/fontawesome-free/css/all.min.css';
import 'assets/css/vendors/@fortawesome/fontawesome-free/css/fontawesome.css';
import 'assets/css/vendors/@fortawesome/fontawesome-free/css/brands.css';
import 'assets/css/vendors/@fortawesome/fontawesome-free/css/solid.css';
import 'assets/css/vendors/@fortawesome/fontawesome-free/css/regular.css';
// import 'assets/css/vendors/@icon/icofont/icofont.css';
import 'assets/css/vendors/themify-icons/themify-icons/css/themify.min.css';
import 'assets/css/vendors/animate.css/animate.css';
// import 'assets/css/vendors/weather-icons/css/weather-icons.min.css';
import 'assets/css/vendors/scrollbar.css';
import 'assets/css/vendors/photoswipe/dist/photoswipe.css';
import 'assets/css/style.css';
import 'assets/css/color-1.css';
import 'assets/css/main.css';

// Use createRoot to render the app
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
