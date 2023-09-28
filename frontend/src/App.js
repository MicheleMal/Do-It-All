import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FormLogin from "./components/Authentication/FormLogin";
import Home from "./components/Home";
import FormRegister from "./components/Authentication/FormRegister";
import Profile from "./components/Profile/Profile";
import PageNotFound from "./components/PageNotFound";

function App() {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<FormLogin />} />
                <Route path="/registration" element={<FormRegister />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
