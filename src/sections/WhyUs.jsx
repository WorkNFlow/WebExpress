import {useLanguage} from "../App.jsx"
import WhyUsCardsInfo from "../constants/WhyUsCardsInfo.jsx";
import { motion } from "framer-motion";

const WhyUs = () => {
    const {language} = useLanguage()

    return (
        <section className={"w-full bg-bg lg:px-16 md:px-12 px-8 py-10 flex flex-col md:flex-row xl:flex-col items-center gap-8"}>
            <div className={"flex flex-col items-center gap-6"}>
                <h2 className={"lg:text-5xl text-4xl font-bold text-center"}>
                    {language === "ru" ?
                        "Почему выбирают нас?" :
                        "Why choose us?"
                    }
                </h2>
                <p className={"max-w-[1024px] text-center"}>
                    {language === "ru" ?
                        "Мы верим, что скорость и качество могут идти рука об руку. С 2021 года помогаем бизнесам и частным предпринимателями получать идеальные сайты за рекордные сроки благодаря использованию искусственного интеллекта и умному подходу к командной работе." :
                        "We believe that speed and quality can go hand in hand. Since 2021, we've been helping businesses and individuals get perfect websites in record time through the use of artificial intelligence and a smart teamwork approach."
                    }

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
                        <div className="flex flex-row items-center gap-4">
                            <p className="text-4xl font-bold">
                                0{index + 1}.
                            </p>
                            <h4 className="font-bold text-2xl text-center">
                                {item.title[language]}
                            </h4>
                        </div>
                        <p className="text-center">
                            {item.text[language]}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default WhyUs;