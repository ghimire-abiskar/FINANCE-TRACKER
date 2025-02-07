import React from "react";
import { Link } from "react-router-dom"; // Fix incorrect import
import { useNavigate } from "react-router-dom"; // Fix incorrect import

function Navbar() {
    const navigate = useNavigate();

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark">
            <div className="container-fluid">


                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link text-dark" to="/">FinanceTracker</Link>
                        </li>
                    </ul>

                    <ul className="navbar-nav ms-auto">
                        {localStorage.getItem("token") == null ? (
                            <>
                                <li className="nav-item">
                                    <Link className="btn btn-primary mx-2" to="/login">
                                        Login
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="btn btn-success" to="/signup">
                                        Signup
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item">
                                <button
                                    className="btn btn-danger"
                                    onClick={() => {
                                        localStorage.removeItem("token");
                                        navigate("/login");
                                    }}
                                >
                                    Logout
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
