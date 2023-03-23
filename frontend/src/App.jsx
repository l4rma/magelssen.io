import Navbar from "./Navbar";
import Home from "./pages/home";
import About from "./pages/about";
import ErrorView from "./pages/ErrorView";
import Articles from "./pages/articles";
import ThisWebsite from "./pages/this-website";
import { Route, Routes } from "react-router-dom"
import { BrowserRouter } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/About" element={<About />} />
                    <Route path="/Articles" element={<Articles />} />
                    <Route path="/Articles/this-website" element={<ThisWebsite />} />
                    <Route path="/*" element={<ErrorView error={404}/>} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
