import {motion} from "framer-motion";
import {useLanguage} from "../App.jsx"
import ThreeDModel from "../components/ThreeDModel.jsx"
import Typewriter from "../components/TypeWriter.jsx";

const Hero = () => {
    const {language} = useLanguage()

    return (
        <section
            className={"w-full bg-bg font-bold flex flex-col items-center justify-center text-center h-screen lg:px-16 md:px-12 px-8 relative"}>
            {language === "ru" ?
                <Typewriter className={"lg:text-[56px] text-[36px] text-primary max-w-[800px]"}>
                    Ваша идея, наш опыт,<br/>молниеносный результат
                </Typewriter> :
                <Typewriter className={"lg:text-[56px] text-[36px] text-primary max-w-[800px]"}>
                    Your idea, our experience, <br/>lightning fast results.
                </Typewriter>
            }
            <motion.p
                className={"text-primary lg:text-[18px] text-[14px] max-w-[800px] font-light mt-6"}
                initial={{opacity: 0, y: 50}}
                animate={{opacity: 1, y: 0}}
                transition={{type: "spring", stiffness: 100, damping: 10}}
            >
                {language === "ru" ?
                    "Web Express меняет правила игры: искусственный интеллект и уникальная команда — ваш ключ к быстрому старту. Будущее веб-разработки начинается здесь!" :
                    "Web Express is a game changer: artificial intelligence and a unique team are your key to a fast start. The future of web development starts here!"
                }
            </motion.p>
        </section>
    );
};

export default Hero;