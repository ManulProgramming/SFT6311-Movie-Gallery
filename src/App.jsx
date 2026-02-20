import {useEffect, useState} from "react";
import MovieGallery from "./components/MovieGallery";
import WindowSize from "./components/WindowSize";
import { Routes, Route } from "react-router-dom";
import Profile from "./components/Profile.jsx";
import SpecificMoviePage from "./components/SpecificMoviePage.jsx";
import NavBar from "./components/NavBar.jsx";
import NotFound from './components/NotFound.jsx';

function App() {
  const [dark, setDark] = useState(() => {
      const stored = localStorage.getItem("dark");
      return stored ? JSON.parse(stored) : false;
  });
  const [name, setName] = useState(() => {
      const stored = localStorage.getItem("name");
      return stored ? stored : "Anonymous";
  });
  const [job, setJob] = useState(() => {
      const stored = localStorage.getItem("job");
      return stored ? stored : "Unknown Job";
  });
  const [desc, setDesc] = useState(() => {
      const stored = localStorage.getItem("desc");
      return stored ? stored : "Lorem Ipsum";
  });
  const [profileEditor, setProfileEditor] = useState(false);
  useEffect(() => {
    if (dark) {
      document.body.classList.add('bg-dark');
      document.body.classList.remove('bg-light');
    }else{
      document.body.classList.remove('bg-dark');
      document.body.classList.add('bg-light');
    }
    localStorage.setItem("dark", dark);
  }, [dark]);
  useEffect(() => {
    localStorage.setItem("name", name);
  }, [name]);
  useEffect(() => {
    localStorage.setItem("desc", desc);
  }, [desc]);
  useEffect(() => {
    localStorage.setItem("job", job);
  }, [job]);

  return (
    <div className={dark ? "bg-dark text-light min-vh-100" : "bg-light min-vh-100"} data-bs-theme={dark ? "dark" : "light"}>
      <div className="container py-4">
        <NavBar dark={dark} setDark={setDark} />

        <Routes>
          <Route path="/" element={<MovieGallery dark={dark} />} />
          <Route path="/profile" element={<Profile name={name} setName={setName} job={job} setJob={setJob} desc={desc} setDesc={setDesc} profileEditor={profileEditor} setProfileEditor={setProfileEditor} />} />
          <Route path="/movie/:movieId" element={<SpecificMoviePage />}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <WindowSize />
      </div>
    </div>
  );
}

export default App;










