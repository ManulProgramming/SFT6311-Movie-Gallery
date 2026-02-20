import {Link} from "react-router-dom";

function NotFound(){
    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100 px-2">
            <div className="text-center">
                <h1 className="display-1 fw-bold">404</h1>
                <p className="fs-2 fw-medium mt-4">Oops! Page not found</p>
                <Link to={`/`} className="btn btn-light fw-semibold rounded-pill px-4 py-2 custom-btn">
                    Go Home
                </Link>
            </div>
        </div>
    )
}

export default NotFound;