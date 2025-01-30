import {createContext, useState} from "react"
import About from "./pages/About.jsx"
import BlogPost from "./pages/BlogPost.jsx"
import Blogs from "./pages/Blogs.jsx"
import Contact from "./pages/Contact.jsx"
import Footer from "./sections/Footer.jsx"
import Home from "./pages/Home.jsx"
import Header from "./sections/Header.jsx"
import NotFound from "./pages/NotFound.jsx"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"


export const NavContext = createContext();

export const NavProvider = ({children}) => {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    return (
        <NavContext.Provider value={{isNavOpen, toggleNav, setIsNavOpen}}>
            {children}
        </NavContext.Provider>
    )
}



export default function App() {
    return (
        <NavProvider>
            <Router>
                <Header/>
                <Routes>
                    <Route exact path={"/"} element={<Home/>} />
                    <Route path={"/about"} element={<About/>} />
                    <Route path={"/blogs"} element={<Blogs />} />
                    <Route path="/blogs/:id" element={<BlogPost />} />
                    <Route path={"/contact"} element={<Contact />} />
                    <Route path={"*"} element={<NotFound />} />
                </Routes>
                <Footer />
            </Router>
        </NavProvider>
    )
}