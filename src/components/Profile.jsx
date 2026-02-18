import ProfileEditor from "./ProfileEditor.jsx";

function Profile({name, setName, job, setJob, desc, setDesc, profileEditor, setProfileEditor}) {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
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
                            <a href={`/movie/${id}`} className="text-decoration-none">{id}</a>
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