import avatar1 from 'assets/images/avatar/1.jpg';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ApiService from "api/services/ApiService";

import CryptoJS from 'crypto-js';

const NotificationDropdown = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        fetchNotifications();

        // Close dropdown when clicking outside
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const fetchNotifications = async () => {
        setLoading(true);
        const response = await ApiService.getAll("/React/notification");
        if (response.status === 1) {
            setNotifications(response.data);
            setLoading(false);
        }
    };

    const encryptData = (data) => {
        const encrypted = CryptoJS.AES.encrypt(data.toString(), 'K9835153380p@123').toString();
        return encodeURIComponent(encrypted); // To make it URL safe
    };



    const markNotificationAsSeen = async (nid) => {
        toggleDropdown();
        setLoading(true);
        const response = await ApiService.getById("/React/markNotificationAsSeen", nid);
        if (response.status === 1) {
            setLoading(false);
            fetchNotifications();
        }
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <li className="custom-dropdown" ref={dropdownRef}>
            <a href="#!" onClick={toggleDropdown}>
                <span class="icon icon-bell"></span>
            </a>
            {notifications.length > 0 && (
                <span className="badge rounded-pill badge-secondary">{notifications.length}</span>
            )}
            <div className={`custom-menu notification-dropdown py-0 overflow-hidden ${showDropdown ? 'show' : ''}`}>
                <h5 className="title bg-primary-light">
                    Notifications <Link to="/notification" onClick={() =>
                        toggleDropdown()}><span className="font-primary">View</span></Link>
                </h5>
                <ul className="activity-update">
                    {loading ? (
                        <li>Loading notifications...</li>
                    ) : notifications.length > 0 ? (
                        notifications.map((notification, index) => (
                            <li key={notification.id} className={`d-flex align-items-center b-l-${index % 3 === 0 ? 'primary' : index % 3 === 1 ? 'secondary' : 'tertiary'}`}>
                                <div className="flex-grow-1">
                                    <span>{new Date(notification.timestamp).toLocaleTimeString()}</span>
                                    <Link to={`/notification/${encryptData(notification.id)}`} onClick={() => markNotificationAsSeen(notification.id)}>
                                        <h5>{notification.title}</h5>
                                    </Link>
                                    <h6>{notification.sender}</h6>
                                </div>
                                <div className="flex-shrink-0">
                                    <img className="b-r-15 img-40" src={notification.avatar || avatar1} alt="" />
                                </div>
                            </li>
                        ))
                    ) : (
                        <li>No notifications available</li>
                    )}

                </ul>
            </div>
        </li>
    );
};

export default NotificationDropdown;