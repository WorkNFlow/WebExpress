import React from "react";
import { RiCompassDiscoverLine } from "react-icons/ri";
import {useLanguage} from "../App.jsx"
import AboutUsCardsInfo from "../constants/AboutUsCardsInfo.js";
import { motion } from "framer-motion";

const AboutUs = () => {
    const {language} = useLanguage();

    return (
        <section className={"lg:px-16 md:px-12 px-8 lg:py-16 py-10 w-full bg-bg flex items-center justify-center"}>
            <div className={"w-full max-w-[1536px] flex flex-col lg:flex-row items-center justify-between max-lg:gap-6 lg:gap-10"}>
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.1 }}
                    className={"flex flex-col gap-6 w-full lg:w-1/2"}
                >
                    <RiCompassDiscoverLine className={"lg:text-5xl text-4xl fill-primary"} />
                    <h2 className={"lg:max-w-[40vw] lg:text-[40px] text-2xl font-bold leading-10"}>
                        {language === "ru" ?
                            "Откройте для себя Web Express: Быстрое решение для создания потрясающих веб-сайтов" :
                            "Discover Web Express: A fast solution for creating stunning websites"
                        }
                    </h2>
                    <p className={"lg:max-w-[40vw] lg:text-[18px]"}>
                        {language === "ru" ?
                            "Добро пожаловать в “Web Express” — компанию, которая превращает процесс создания вебсайтов в настоящее искусство скорости и эффективности. Мы знаем, что ваше время бесценно, поэтому наша цель — дать вам высококачественный вебсайт в самые короткие сроки." :
                            "Welcome to Web Express, a company that turns the website building process into a true art of speed and efficiency. We know that your time is invaluable, so our goal is to give you a high quality website in the shortest possible time."
                        }
                    </p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    variants={{
                        hidden: {},
                        visible: {
                            transition: {
                                staggerChildren: 0.3
                            }
                        }
                    }}
                    className={"lg:max-w-[40vw] flex flex-col gap-4 w-full lg:w-1/2"}
                >
                    {AboutUsCardsInfo.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ x: 100, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: false }}
                            transition={{ duration: 1 }}
                            className={"bg-secondary rounded-xl px-6 py-6 min-h-[170px] flex flex-col justify-evenly border-4 border-primary"}
                        >
                            <div className={"flex items-center justify-center gap-4"}>
                                <p className={"lg:text-4xl text-3xl font-bold"}>
                                    0{index + 1}.
                                </p>
                                <h4 className={"font-bold lg:text-2xl text-xl"}>
                                    {item.title[language]}
                                </h4>
                            </div>
                            <p className={"text-center"}>
                                {item.text[language]}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default AboutUs;