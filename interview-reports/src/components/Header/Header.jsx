import { Link } from "react-router-dom";
import "./Header.css";

export const Header = ({ setLoggedIn }) => {

    
    const logOut = () => {
        localStorage.removeItem("tokenNibble");
        setLoggedIn(false);
    }


    return (
        <header className="container-fluid p-0">
            <nav className="navbar bg-info navbar-expand-lg fw-bold static-top">

                <Link className="interviewsReports ms-5" to="/home">
                    <h1 className="text-dark">
                        Interviews Reports
                    </h1>
                </Link>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                    <i className="fas fa-bars"></i>
                </button>


                <div className="pagesButtons collapse navbar-collapse justify-content-lg-end" id="collapsibleNavbar">
                    <div className="navbar-nav ml-auto col-xs-12 text-center">
                        <Link className="candidatesLinks" to="/home">
                            <button type="button" className="btnCandidates btn btn-light btn-outline-secondary nav-item mx-0 mx-lg-1">
                                Candidates
                            </button>
                        </Link>

                        <Link className="reportsLinks" to="/reports">
                            <button type="button" className="btnReports btn btn-light btn-outline-secondary nav-item mx-0 mx-lg-1">
                                Reports
                            </button>
                        </Link>
                        <div className="me-lg-5">
                            <button type="button" onClick={logOut} className="btnLogOut btn btn-light btn-outline-secondary nav-item mx-0 me-lg-5">
                                Log Out
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};
