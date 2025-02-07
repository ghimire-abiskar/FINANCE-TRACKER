import React from "react";
import { Link } from "react-router"
function Navbar() {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark">
                <div className="container-fluid">

                    <div className="navbar-nav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item"> <Link className="nav-link active" aria-current="page" to={'/'}>Home</Link></li>
                            <li className="nav-item"> <Link className="btn btn-primary mx-3" to={'/login'}>Login</Link></li>
                            <li className="nav-item"> <Link className="btn btn-primary" to={'/signup'}>Signup</Link></li>
                        </ul>
                    </div>

                </div>
            </nav>

        </>
    );
}

export default Navbar;