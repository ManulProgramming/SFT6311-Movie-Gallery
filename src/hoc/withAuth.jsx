import { useMovies } from "../context/MovieContext";
import {useEffect} from "react";

const withAuth = (WrappedComponent) => {
    return function AuthComponent(props) {
        const { isAuthenticated, setIsAuthenticated } = useMovies();
        useEffect(() => {
            const storedAuth = localStorage.getItem("auth");
            if (storedAuth === "true" && !isAuthenticated) {
                setIsAuthenticated(true);
            }
        }, [isAuthenticated, setIsAuthenticated]);
        if (!isAuthenticated) {
            return (
                <div className="alert alert-warning mt-3">
                    Access denied. Please log in.
                </div>
            );
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;