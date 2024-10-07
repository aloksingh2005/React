import { AuthContext } from "app/hooks/context";
import profileImg from "assets/images/avatar/1.jpg";
import PageTitle from 'includes/PageTitle';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {
    const { userData } = useContext(AuthContext);

    return (
        <>
            <PageTitle title="User Profile" paths={["User", "Profile"]} />

            <div className="container-fluid user-profile">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card hovercard text-center">
                            <div className="cardheader"></div>
                            <div className="user-image">
                                <div className="avatar">
                                    <img alt="User Avatar" src={userData?.photo || profileImg} />
                                </div>
                                <Link to="/profile/edit" className="icon-wrapper">
                                    <i className="icon-pencil"></i>
                                </Link>
                            </div>
                            <div className="info">
                                <div className="row">
                                    <div className="col-sm-6 col-lg-4 order-sm-1 order-xl-0">
                                        <div className="row">
                                            <div className="col-sm-6 col-lg-4 order-sm-2 order-xl-2">
                                                <div className="ttl-info text-start">
                                                    <h6><i className="fa-solid fa-envelope"></i>Email</h6>
                                                    <span>{userData?.email || "email"}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="ttl-info text-start">
                                                    <h6><i className="fa-solid fa-calendar-days"></i>DOB</h6>
                                                    <span>{userData?.dob || "N/A"}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-lg-4 order-sm-0 order-xl-1">
                                        <div className="user-designation">
                                            <div className="title">
                                                <a target="_blank" rel="noopener noreferrer" href="#">{userData?.name || "User"}</a>
                                            </div>
                                            <div className="desc">{userData?.role?.name || "N/A"}</div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-lg-4 order-sm-2 order-xl-2">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="ttl-info text-start">
                                                    <h6><i className="fa-solid fa-phone"></i>Contact Us</h6>
                                                    <span>{userData?.mobile ? "India +91 " + userData?.mobile : "N/A"}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="ttl-info text-start">
                                                    <h6><i className="fa fa-location-arrow"></i>Location</h6>
                                                    <span>{userData?.location || "N/A"}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
