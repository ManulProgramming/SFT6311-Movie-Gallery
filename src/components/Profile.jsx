import { useMovies } from "../context/MovieContext";
import { useState, useEffect } from "react";
import ProfileEditor from "./ProfileEditor.jsx";
import {Link} from 'react-router-dom';

function Profile({name, setName, job, setJob, desc, setDesc, profileEditor, setProfileEditor}) {
    const { isAuthenticated, setIsAuthenticated } = useMovies();
    const [password, setPassword] = useState("");
    const handleLogin = (e) => {
        e.preventDefault();

        if (password === "1234") {
            setIsAuthenticated(true);
            localStorage.setItem("auth", "true");
        } else {
            alert("Wrong password");
        }
    };
    useEffect(() => {
        const storedAuth = localStorage.getItem("auth");
        if (storedAuth === "true") {
            setIsAuthenticated(true);
        }
    }, []);
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!isAuthenticated) {
        return (
            <div className="card mt-3 p-3">
                <h5>Login</h5>
                <form onSubmit={handleLogin}>
                    <div className="mb-2">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="mb-2">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Job"
                            value={job}
                            onChange={(e) => setJob(e.target.value)}
                        />
                    </div>

                    <div className="mb-2">
                        <textarea
                            className="form-control"
                            placeholder="Description"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    </div>

                    <div className="mb-2">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button className="btn btn-success w-100">
                        Login
                    </button>
                </form>
            </div>
        );
    }
    return (
        <>{profileEditor && (
            <ProfileEditor name={name} setName={setName} desc={desc} setDesc={setDesc} job={job} setJob={setJob} close={() => setProfileEditor(false)}/>
        )}
        <div className="card d-flex shadow-sm h-100 mt-3">
            <div className="card-header">
                <h5>Profile</h5>
            </div>
            <div className="card-body">
                <p><b>Name:</b> {name}</p>
                <p><b>Job:</b> {job}</p>
                <p><b>Description:</b> {desc}</p>
            </div>
            <div className="card-footer">
                <button
                    className="btn btn-primary"
                    onClick={() => setProfileEditor(true)}
                >
                    Editor
                </button>
            </div>
        </div>
            <div>
                <h5 className="mt-3">Favorites</h5>
                <ul className="list-group">
                    {favorites.length>0 ? favorites.map((id) => (
                        <li key={id} className="list-group-item">
                            <Link to={`/movie/${id}`} className="text-decoration-none">{id}</Link>
                        </li>
                    )): (
                          <p>No favorites yet :o</p>
                      )}
                </ul>
            </div>
        </>
    );
}

export default Profile;