import { createContext, useState, useEffect, useContext } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom"
import About from "./pages/About.jsx"
import BlogPost from "./pages/BlogPost.jsx"
import Blogs from "./pages/Blogs.jsx"
import Contact from "./pages/Contact.jsx"
import Footer from "./sections/Footer.jsx"
import Home from "./pages/Home.jsx"
import Header from "./sections/Header.jsx"
import NotFound from "./pages/NotFound.jsx"

// Language Context for managing site-wide language
export const LanguageContext = createContext({
    language: 'en',
    setLanguage: () => {}
});

// Language Provider Component
export const LanguageProvider = ({ children }) => {
    // Detect browser language and set initial language
    const getBrowserLanguage = () => {
        const browserLang = navigator.language.split('-')[0];
        return browserLang === 'ru' ? 'ru' : 'en';
    };

    const [language, setLanguage] = useState(getBrowserLanguage());

    // Update language when URL changes
    useEffect(() => {
        const path = window.location.pathname;
        const langMatch = path.match(/^\/([a-z]{2})/);
        if (langMatch) {
            const urlLang = langMatch[1];
            if (urlLang === 'ru' || urlLang === 'en') {
                setLanguage(urlLang);
            }
        }
    }, []);

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    )
}

// Custom hook to use language context
export const useLanguage = () => useContext(LanguageContext);

// Navigation Context (kept as before)
export const NavContext = createContext();

export const NavProvider = ({ children }) => {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    return (
        <NavContext.Provider value={{ isNavOpen, toggleNav, setIsNavOpen }}>
            {children}
        </NavContext.Provider>
    )
}

// Internationalized Route Wrapper
const I18nRoute = ({ children }) => {
    const { language, setLanguage } = useLanguage();
    const location = useLocation();

    // Extract language from path
    const pathLanguage = location.pathname.split('/')[1];

    // Update language if URL language differs from current language
    useEffect(() => {
        if (pathLanguage === 'ru' || pathLanguage === 'en') {
            // If URL language is different, update language state
            if (pathLanguage !== language) {
                setLanguage(pathLanguage);
            }
        }
    }, [pathLanguage, language, setLanguage]);

    // If no language in path, redirect to language-specific route
    if (!['ru', 'en'].includes(pathLanguage)) {
        return <Navigate to={`/${language}`} replace />;
    }

    return children;
}

export default function App() {
    return (
        <LanguageProvider>
            <NavProvider>
                <Router>
                    <Header />
                    <Routes>
                        {/* Routes with language prefix */}
                        <Route path={`/ru/*`} element={<I18nRoute><Routes>
                            <Route index element={<Home />} />
                            <Route path="about" element={<About />} />
                            <Route path="blogs" element={<Blogs />} />
                            <Route path="blogs/:id" element={<BlogPost />} />
                            <Route path="contact" element={<Contact />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes></I18nRoute>} />
                        <Route path={`/en/*`} element={<I18nRoute><Routes>
                            <Route index element={<Home />} />
                            <Route path="about" element={<About />} />
                            <Route path="blogs" element={<Blogs />} />
                            <Route path="blogs/:id" element={<BlogPost />} />
                            <Route path="contact" element={<Contact />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes></I18nRoute>} />

                        {/* Redirect root to language-specific route */}
                        <Route path="/" element={<Navigate to={`/${getBrowserLanguage()}`} replace />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                    <Footer />
                </Router>
            </NavProvider>
        </LanguageProvider>
    )
}

// Utility function to get browser language (can be used outside of React context)
function getBrowserLanguage() {
    const browserLang = navigator.language.split('-')[0];
    return browserLang === 'ru' ? 'ru' : 'en';
}