import Testimonials from "../sections/Testimonials.jsx"
import Projects from "../sections/Projects.jsx"
import AboutUs from "../sections/AboutUs.jsx"
import Hero from "../sections/Hero.jsx"


const Home = () => {
    return (
        <main>
            <Hero />
            <AboutUs />
            <Projects />
            <Testimonials />
        </main>
    );
};

export default Home;
