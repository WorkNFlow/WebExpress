import React from "react";
import { RiCompassDiscoverLine } from "react-icons/ri";
import AboutUsCardsInfo from "../constants/AboutUsCardsInfo.js";
import { motion } from "framer-motion";

const AboutUs = () => {
    return (
        <section className={"px-16 lg:py-16 py-10 w-full bg-bg flex items-center justify-center"}>
            <div className={"w-full max-w-[1536px] flex flex-col lg:flex-row items-center justify-between max-lg:gap-6 lg:gap-10"}>
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.1 }}
                    className={"flex flex-col gap-6 w-full lg:w-1/2"}
                >
                    <RiCompassDiscoverLine className={"text-5xl fill-primary"} />
                    <h2 className={"lg:max-w-[40vw] text-[40px] font-bold"}>
                        Откройте для себя Web Express: Быстрое решение для создания потрясающих веб-сайтов
                    </h2>
                    <p className={"lg:max-w-[40vw] text-[18px]"}>
                        Добро пожаловать в “Web Express” — компанию, которая превращает процесс создания вебсайтов в настоящее искусство скорости и эффективности. Мы знаем, что ваше время бесценно, поэтому наша цель — дать вам высококачественный вебсайт в самые короткие сроки.
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
                                <p className={"text-4xl font-bold"}>
                                    0{index + 1}.
                                </p>
                                <h4 className={"font-bold text-2xl"}>
                                    {item.title}
                                </h4>
                            </div>
                            <p className={"text-center"}>
                                {item.text}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default AboutUs;