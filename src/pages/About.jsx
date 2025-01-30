import HeroAbout from "../sections/HeroAbout.jsx"
import HowItWorks from "../sections/HowItWorks.jsx"
import Testimonials from "../sections/Testimonials.jsx"
import OurTeam from "../sections/OurTeam.jsx"
import WhyUs from "../sections/WhyUs.jsx"

const About = () => {
    return (
        <main>
            <HeroAbout />
            <WhyUs />
            <OurTeam />
            <Testimonials />
            <HowItWorks />
        </main>
    );
};

export default About;
