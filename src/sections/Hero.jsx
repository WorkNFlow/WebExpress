import AnimatedModel from "../components/AnimatedModel.jsx"
// import ThreeDModel from "../components/ThreeDModel.jsx"
import Typewriter from "../components/TypeWriter.jsx"

const Hero = () => {
    return (
        <section className="w-full bg-bg font-bold relative flex flex-col items-center justify-center text-center h-screen px-16">
            <AnimatedModel name={"code"} fov={20} camz={10}/>
            <div className="relative z-10"> {/* Wrapper для контента, чтобы он был поверх модели */}
                <Typewriter className="lg:text-[56px] text-[48px] text-primary max-w-[800px]">
                    Веб-разработка, <br />которая опережает время
                </Typewriter>
                <p className="text-primary lg:text-[18px] text-[14px] max-w-[800px] font-light mt-6">
                    Компания Web Express специализируется на создании высококачественных веб-сайтов в рекордно короткие
                    сроки. Мы создаем сайты, пока другие только планируют!
                </p>
            </div>
        </section>
    );
};

export default Hero;