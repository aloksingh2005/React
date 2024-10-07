import { AuthContext } from "app/hooks/context";
import { useContext } from "react";
import { Link } from "react-router-dom";

const ProfileGreeting = () => {

    const { userData } = useContext(AuthContext);

    return (
        <div className="col-sm-6 col-xl-4">
            <div className="card profile-greeting card-hover">
                <div className="card-body">
                    <div className="img-overlay">
                        <h1>Good day, {userData?.name || "User"}    </h1>
                        <p>Welcome to the Edmin family! We are delighted that you have visited our dashboard.</p>
                        <Link className="btn btn-primary" to="/pricing">Go Premium</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileGreeting;
