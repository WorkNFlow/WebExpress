import { motion } from "framer-motion";

const OurTeam = () => {
    return (
        <section className={"w-full min-h-screen bg-bg lg:px-16 md:px-12 px-8 py-40 flex justify-center items-center"}>
            <div className={"max-w-7xl w-full h-full flex flex-col lg:flex-row gap-16 justify-evenly items-stretch"}>
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 10 }}
                    className={"lg:flex-1 flex items-center justify-center flex-col text-center border-4 border-primary border-dashed px-8 py-8 rounded-xl"}
                >
                    <h2 className={"lg:text-4xl text-3xl font-bold text-primary mb-8"}>
                        Наша команда
                    </h2>
                    <p className={"lg:text-xl"}>
                        Мы — это группа увлеченных профессионалов, объединенных одной целью: создавать сайты, которые
                        делают мир вашего бизнеса лучше. Наши дизайнеры, разработчики и стратеги работают как единый
                        механизм, чтобы воплотить ваши идеи в реальность.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 10 }}
                    className={"lg:flex-1 flex items-center flex-col border-4 border-primary border-dashed px-8 py-8 rounded-xl"}>
                    <h2 className={"lg:text-4xl text-3xl font-bold text-primary mb-8"}>
                        Наши технологии
                    </h2>
                    <p className={"lg:text-xl"}>
                        Мы используем только современные инструменты и технологии, чтобы ваши сайты были быстрыми,
                        надежными и удобными:
                    </p>
                    <ul className={"list-disc pl-5 text-[18px]"}>
                        <li><span className={"font-bold"}>React</span> для динамичного интерфейса</li>
                        <li><span className={"font-bold"}>Tailwind CSS</span> для стильного и адаптивного дизайна</li>
                        <li><span className={"font-bold"}>Framer Motion</span> для создания анимаций, которые оживляют страницы</li>
                        <li><span className={"font-bold"}>ИИ</span> для оптимизации всего процесса разработки</li>
                    </ul>
                </motion.div>
            </div>
        </section>
    );
};

export default OurTeam;