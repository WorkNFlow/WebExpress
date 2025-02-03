import { motion } from "framer-motion";
import Typewriter from "../components/TypeWriter.jsx";
import { useLanguage } from "../App.jsx";

const Hero = () => {
    const { language } = useLanguage();

    return (
        <section className={"w-full bg-bg font-bold flex flex-col items-center justify-center text-center h-screen lg:px-16 md:px-12 px-8"}>
            <Typewriter className={"lg:text-[56px] text-[36px] text-primary max-w-[800px]"}>
                {language === "ru" ? "Достигаем целей вместе" : "Achieving Goals Together"}
            </Typewriter>
            <motion.p
                className={"text-primary lg:text-[18px] text-[14px] max-w-[800px] font-light mt-6"}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 10 }}
            >
                {language === "ru" ?
                    "Ваши идеи важны для нас. Наша команда готова обсудить их, ответить на вопросы и предоставить профессиональную поддержку." :
                    "Your ideas are important to us. Our team is ready to discuss them, answer questions, and provide professional support."
                }
            </motion.p>
        </section>
    );
};

export default Hero;