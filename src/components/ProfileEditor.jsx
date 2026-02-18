function ProfileEditor({name, setName, job, setJob, desc, setDesc, close}) {

  return (
      <div className="modal modal-overlay show d-block" onClick={close}>
          <div className="modal-dialog" onClick={e => e.stopPropagation()}>
              <div className="modal-content">
                  <div className="modal-header">
                      <h5>Profile Editor</h5>
                      <button className="btn-close" onClick={close}></button>
                  </div>

                  <div className="modal-body">
                      <input className="form-control" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/><br/>
                      <input className="form-control" placeholder="Profession" value={job} onChange={(e) => setJob(e.target.value)}/><br/>
                      <textarea className="form-control" placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)}/>
                  </div>
              </div>
          </div>
      </div>
    );
}

export default ProfileEditor;
