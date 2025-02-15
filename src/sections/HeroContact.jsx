import {motion} from "framer-motion";
import Typewriter from "../components/TypeWriter.jsx";
import {useLanguage} from "../App.jsx";

const Hero = () => {
    const {language} = useLanguage();

    return (
        <section
            className={"w-full bg-bg font-bold  h-screen lg:px-16 md:px-12 px-8"}>
            <div className={"flex flex-col items-center justify-center text-center z-20 relative h-full w-full"}>
                {language === "ru" ?
                    <Typewriter className={"lg:text-[56px] text-[36px] text-primary max-w-[800px] z-20"}>
                        Достигаем целей вместе
                    </Typewriter> :
                    <Typewriter className={"lg:text-[56px] text-[36px] text-primary max-w-[800px] z-20"}>
                        Achieving Goals Together
                    </Typewriter>
                }
                <motion.p
                    className={"text-primary lg:text-[18px] text-[14px] max-w-[800px] font-light mt-6 z-20"}
                    initial={{opacity: 0, y: 50}}
                    animate={{opacity: 1, y: 0}}
                    transition={{type: "spring", stiffness: 100, damping: 10}}
                >
                    {language === "ru" ?
                        "Ваши идеи важны для нас. Наша команда готова обсудить их, ответить на вопросы и предоставить профессиональную поддержку." :
                        "Your ideas are important to us. Our team is ready to discuss them, answer questions, and provide professional support."
                    }
                </motion.p>
            </div>
        </section>
    );
};

export default Hero;