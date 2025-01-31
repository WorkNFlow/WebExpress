import WhyUsCardsInfo from "../constants/WhyUsCardsInfo.jsx";
import { motion } from "framer-motion";

const WhyUs = () => {
    return (
        <section className={"w-full bg-bg lg:px-16 md:px-12 px-8 py-10 flex flex-col md:flex-row xl:flex-col items-center gap-8"}>
            <div className={"flex flex-col items-center gap-6"}>
                <h2 className={"text-5xl font-bold text-center"}>
                    Почему выбирают нас?
                </h2>
                <p className={"max-w-[1024px] text-center"}>
                    Мы верим, что скорость и качество могут идти рука об руку. С 2021 года помогаем бизнесам и частным
                    предпринимателями получать идеальные сайты за рекордные сроки благодаря использованию искусственного интеллекта и умному
                    подходу к командной работе.
                </p>
            </div>
            <div className={"w-full flex flex-col xl:flex-row gap-10 justify-evenly max-w-[1536px] items-stretch"}>
                {WhyUsCardsInfo.map((item, index) => (
                    <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                        className="bg-secondary rounded-xl px-6 py-6 xl:w-[400px] flex flex-col justify-evenly items-center border-4 border-primary"
                    >
                        <div className="flex flex-row items-center xl:w-min gap-4">
                            <p className="text-4xl font-bold">
                                0{index + 1}.
                            </p>
                            <h4 className="font-bold text-2xl text-center">
                                {item.title}
                            </h4>
                        </div>
                        <p className="text-center">
                            {item.text}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default WhyUs;