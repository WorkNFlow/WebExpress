import { motion } from "framer-motion";
import {useLanguage} from "../App.jsx"

const OurTeam = () => {
    const { language } = useLanguage();

    return (
        <section className={"w-full min-h-screen bg-bg lg:px-16 md:px-12 px-8 py-40 flex justify-center items-center"}>
            <div className={"max-w-7xl w-full h-full flex flex-col lg:flex-row gap-16 justify-evenly items-stretch z-20"}>
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 10 }}
                    className={"lg:flex-1 flex items-center justify-center flex-col text-center border-4 border-primary border-dashed px-8 py-8 rounded-xl"}
                >
                    <h2 className={"lg:text-4xl text-3xl font-bold text-primary mb-8"}>
                        {language === "ru" ?
                            "Наша команда" :
                            "Our Team"
                        }
                    </h2>
                    <p className={"lg:text-xl"}>
                        {language === "ru" ?
                            "Мы — это группа увлеченных профессионалов, объединенных одной целью: создавать сайты, которые делают мир вашего бизнеса лучше. Наши дизайнеры, разработчики и стратеги работают как единый механизм, чтобы воплотить ваши идеи в реальность." :
                            "We are a group of passionate professionals united by one goal: to create websites that make your business world a better place. Our designers, developers and strategists work as a single mechanism to turn your ideas into reality."
                        }
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 10 }}
                    className={"lg:flex-1 flex items-center flex-col border-4 border-primary border-dashed px-8 py-8 rounded-xl z-20"}>
                    <h2 className={"lg:text-4xl text-3xl font-bold text-primary mb-8"}>
                        {language === "ru" ?
                            "Наши технологии" :
                            "Our Technologies"
                        }
                    </h2>
                    <p className={"lg:text-xl"}>
                        {language === "ru" ?
                            "Мы используем только современные инструменты и технологии, чтобы ваши сайты были быстрыми, надежными и удобными" :
                            "We use only modern tools and technologies to make your websites fast, reliable and user-friendly"
                        }
                    </p>
                    <ul className={"list-disc pl-5 text-[18px]"}>
                        <li><span className={"font-bold"}>React </span>
                            {language === "ru" ?
                                "для динамичного интерфейса" :
                                "for dynamic interfaces"
                            }
                        </li>
                        <li><span className={"font-bold"}>Tailwind CSS </span>
                            {language === "ru" ?
                                "для стильного и адаптивного дизайна" :
                                "for stylish and responsive design"
                            }
                        </li>
                        <li><span className={"font-bold"}>Framer Motion </span>
                            {language === "ru" ?
                                "для создания анимаций, которые оживляют страницы" :
                                "for creating animations that bring pages to life"
                            }
                        </li>
                        <li><span className={"font-bold"}>
                            {language === "ru" ?
                                "ИИ " :
                                "AI "
                            }
                        </span>
                            {language === "ru" ?
                                "для оптимизации всего процесса разработки" :
                                "for optimizing the entire development process"
                            }
                        </li>
                    </ul>
                </motion.div>
            </div>
        </section>
    );
};

export default OurTeam;