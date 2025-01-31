import {motion} from "framer-motion";
import ThreeDModel from "../components/ThreeDModel.jsx"
import Typewriter from "../components/TypeWriter.jsx";

const Hero = () => {
    return (
        <section
            className={"w-full bg-bg font-bold flex flex-col items-center justify-center text-center h-screen lg:px-16 md:px-12 px-8 relative"}>
            <Typewriter className={"lg:text-[56px] text-[48px] text-primary max-w-[800px]"}>
                Ваша идея, наш опыт,<br/>молниеносный результат
            </Typewriter>
            <motion.p
                className={"text-primary lg:text-[18px] text-[14px] max-w-[800px] font-light mt-6"}
                initial={{opacity: 0, y: 50}}
                animate={{opacity: 1, y: 0}}
                transition={{type: "spring", stiffness: 100, damping: 10}}
            >
                Web Express меняет правила игры: искусственный интеллект и уникальная команда — ваш ключ к быстрому
                старту. Будущее веб-разработки начинается здесь!
            </motion.p>
        </section>
    );
};

export default Hero;