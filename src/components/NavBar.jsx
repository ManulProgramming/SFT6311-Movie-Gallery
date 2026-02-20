import { Link } from "react-router-dom";
import {CameraReelsFill} from "react-bootstrap-icons";
import ThemeToggle from "./ThemeToggle.jsx";

function NavBar({dark, setDark}) {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link to={`/`} className="navbar-brand" style={{ cursor: "pointer" }}><h1 className="fw-bold"><CameraReelsFill /> Movie Gallery</h1></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to={`/`} className="nav-link" style={{ cursor: "pointer" }}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={`/profile`} className="nav-link" style={{ cursor: "pointer" }}>Profile</Link>
                        </li>
                    </ul>
                    <ThemeToggle dark={dark} setDark={setDark} />
                </div>
            </div>
        </nav>
    )
}
export default NavBar;