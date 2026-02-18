import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { MovieProvider } from "./context/MovieContext";
import './App.css'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {SMovieProvider} from "./context/SMovieContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <MovieProvider>
        <SMovieProvider>
            <App />
        </SMovieProvider>
    </MovieProvider>
  </BrowserRouter>
);
