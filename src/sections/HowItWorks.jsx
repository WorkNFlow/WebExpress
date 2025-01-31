import React, { useState, useEffect, useRef } from "react";
import Xarrow from "react-xarrows";
import CardsInfo from "../constants/HowItWorksCardsInfo.jsx";

const HowItWorks = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <section ref={sectionRef} className={"w-full bg-bg lg:px-16 md:px-12 px-8 py-10 flex items-center justify-center"}>
            {isVisible && (
                <div className={"w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-40 max-w-[1536px] items-center"}>
                    {CardsInfo.map((item, index) => (
                        <div key={item.title} id={`box${index}`} className={`h-min px-8 py-8 border-4 border-primary text-center rounded-xl flex flex-col items-center justify-center xl:col-span-2 ${item.styles}`}>
                            <h4 className={"font-bold text-[20px] mb-4"}>
                                {item.title}
                            </h4>
                            <p>
                                {item.text}
                            </p>
                        </div>
                    ))}
                    {CardsInfo.map((_, index) => {
                        if (index < CardsInfo.length - 1) {
                            return (
                                <Xarrow
                                    key={`arrow${index}`}
                                    start={`box${index}`}
                                    end={`box${index + 1}`}
                                    color={"#ff7a00"}
                                    animateDrawing={true}
                                    strokeWidth={4}
                                />
                            );
                        }
                        return null;
                    })}
                </div>
            )}
        </section>
    );
};

export default HowItWorks;