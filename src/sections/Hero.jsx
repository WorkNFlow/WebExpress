import React from 'react';
import { useMediaQuery } from 'react-responsive';
import AnimatedModel from "../components/AnimatedModel.jsx";
import Typewriter from "../components/TypeWriter.jsx";

const Hero = () => {
    const isSmallScreen = useMediaQuery({ query: '(max-width: 640px)' });
    const isMediumScreen = useMediaQuery({ query: '(min-width: 641px) and (max-width: 1024px)' });

    let scale = 3; // Default scale for large screens
    if (isSmallScreen) {
        scale = 1.9;
    } else if (isMediumScreen) {
        scale = 2.5;
    }

    return (
        <section className="w-full bg-bg font-bold relative flex flex-col items-center justify-center text-center h-screen lg:px-16 md:px-12 px-8 z-20">
            <AnimatedModel name={"code"} fov={20} camz={10} scale={scale} />
            <div className="relative z-10"> {/* Wrapper for content to be above the model */}
                <Typewriter className="lg:text-[56px] text-[36px] text-primary max-w-[800px]">
                    Веб разработка,<br />которая опережает время
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