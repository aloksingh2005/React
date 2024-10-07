import React, { useContext, useState } from 'react';
import { AuthContext } from "app/hooks/context";
import profileImg from 'assets/images/avatar/1.jpg';
import PageTitle from 'includes/PageTitle';
import { Link } from 'react-router-dom';

const EditProfile = () => {
    const { userData } = useContext(AuthContext);

    // State for the form data
    const [profileForm, setProfileForm] = useState({
        bio: '',
        email: userData?.email || '',
        password: '',
        website: ''
    });

    const [settingsForm, setSettingsForm] = useState({
        company: '',
        username: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        postalCode: '',
        country: ''
    });

    // Handle changes in profile form
    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfileForm(prev => ({ ...prev, [name]: value }));
    };

    // Handle changes in settings form
    const handleSettingsChange = (e) => {
        const { name, value } = e.target;
        setSettingsForm(prev => ({ ...prev, [name]: value }));
    };

    // Handle profile form submission
    const handleProfileSubmit = (e) => {
        e.preventDefault();
        console.log('Profile Form Submitted:', profileForm);
        // Add form submission logic here
    };

    // Handle settings form submission
    const handleSettingsSubmit = (e) => {
        e.preventDefault();
        console.log('Settings Form Submitted:', settingsForm);
        // Add form submission logic here
    };

    return (
        <>
            <PageTitle title="Edit Profile" paths={["User", "Edit Profile"]} />

            <div className="container-fluid edit-profile">
                <div className="row">
                    {/* Profile Overview Form */}
                    <div className="col-xl-4">
                        <div className="card">
                            <div className="card-header d-flex align-items-center justify-content-between">
                                <h4 className="card-title mb-0">My Profile</h4>
                                <Link className="btn btn-primary btn-sm" to="/profile"><i className='icon-arrow-left'></i></Link>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleProfileSubmit}>
                                    <div className="row mb-2">
                                        <div className="profile-title">
                                            <div className="d-flex">
                                                <img className="img-70 rounded-circle" alt="User Avatar" src={userData?.photo || profileImg} />
                                                <div className="flex-grow-1">
                                                    <h5 className="mb-1">{userData?.name || "User"}</h5>
                                                    <p>{userData?.role?.name || "Role"}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <h6 className="form-label">Bio</h6>
                                        <textarea
                                            className="form-control"
                                            rows="5"
                                            name="bio"
                                            value={profileForm.bio}
                                            onChange={handleProfileChange}
                                            placeholder="On the other hand, we denounce with righteous indignation"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Email Address</label>
                                        <input
                                            className="form-control"
                                            name="email"
                                            type="email"
                                            value={profileForm.email}
                                            onChange={handleProfileChange}
                                            placeholder="your-email@domain.com"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Password</label>
                                        <input
                                            className="form-control"
                                            name="password"
                                            type="password"
                                            value={profileForm.password}
                                            onChange={handleProfileChange}
                                            placeholder="password"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Website</label>
                                        <input
                                            className="form-control"
                                            name="website"
                                            type="text"
                                            value={profileForm.website}
                                            onChange={handleProfileChange}
                                            placeholder="http://example.com"
                                        />
                                    </div>
                                    <div className="form-footer">
                                        <button className="btn btn-primary btn-block" type="submit">Save</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Edit Profile Form */}
                    <div className="col-xl-8">
                        <form className="card" onSubmit={handleSettingsSubmit}>
                            <div className="card-header">
                                <h4 className="card-title mb-0">Edit Profile</h4>
                                <div className="card-options">
                                    <a className="card-options-collapse" href="#" data-bs-toggle="card-collapse">
                                        <i className="fe fe-chevron-up"></i>
                                    </a>
                                    <a className="card-options-remove" href="#" data-bs-toggle="card-remove">
                                        <i className="fe fe-x"></i>
                                    </a>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-5 mb-3">
                                        <label className="form-label">Company</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="company"
                                            value={settingsForm.company}
                                            onChange={handleSettingsChange}
                                            placeholder="Company"
                                        />
                                    </div>
                                    <div className="col-sm-6 col-md-3 mb-3">
                                        <label className="form-label">Username</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="username"
                                            value={settingsForm.username}
                                            onChange={handleSettingsChange}
                                            placeholder="Username"
                                        />
                                    </div>
                                    <div className="col-sm-6 col-md-4 mb-3">
                                        <label className="form-label">Email Address</label>
                                        <input
                                            className="form-control"
                                            type="email"
                                            name="email"
                                            value={settingsForm.email}
                                            onChange={handleSettingsChange}
                                            placeholder="Email"
                                        />
                                    </div>
                                    <div className="col-sm-6 col-md-6 mb-3">
                                        <label className="form-label">First Name</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="firstName"
                                            value={settingsForm.firstName}
                                            onChange={handleSettingsChange}
                                            placeholder="First Name"
                                        />
                                    </div>
                                    <div className="col-sm-6 col-md-6 mb-3">
                                        <label className="form-label">Last Name</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="lastName"
                                            value={settingsForm.lastName}
                                            onChange={handleSettingsChange}
                                            placeholder="Last Name"
                                        />
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label className="form-label">Address</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="address"
                                            value={settingsForm.address}
                                            onChange={handleSettingsChange}
                                            placeholder="Home Address"
                                        />
                                    </div>
                                    <div className="col-sm-6 col-md-4 mb-3">
                                        <label className="form-label">City</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="city"
                                            value={settingsForm.city}
                                            onChange={handleSettingsChange}
                                            placeholder="City"
                                        />
                                    </div>
                                    <div className="col-sm-6 col-md-3 mb-3">
                                        <label className="form-label">Postal Code</label>
                                        <input
                                            className="form-control"
                                            type="number"
                                            name="postalCode"
                                            value={settingsForm.postalCode}
                                            onChange={handleSettingsChange}
                                            placeholder="ZIP Code"
                                        />
                                    </div>
                                    <div className="col-md-5 mb-3">
                                        <label className="form-label">Country</label>
                                        <select
                                            className="form-control"
                                            name="country"
                                            value={settingsForm.country}
                                            onChange={handleSettingsChange}
                                        >
                                            <option value="">--Select--</option>
                                            <option value="Germany">Germany</option>
                                            <option value="Canada">Canada</option>
                                            <option value="USA">USA</option>
                                            <option value="Australia">Australia</option>
                                        </select>
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label className="form-label">About Me</label>
                                        <textarea
                                            className="form-control"
                                            rows="4"
                                            name="aboutMe"
                                            value={settingsForm.aboutMe}
                                            onChange={handleSettingsChange}
                                            placeholder="Enter about your description"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer text-end">
                                <button className="btn btn-primary" type="submit">Update Profile</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditProfile;