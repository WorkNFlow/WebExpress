import { useState, useEffect } from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { motion } from 'framer-motion';
import {useLanguage} from "../App.jsx"
import { getProjects } from '../constants/ProjectsInfo.js';

const Projects = ({ full }) => {
    const {language} = useLanguage();

    const [showAll, setShowAll] = useState(false);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                const data = await getProjects();
                setProjects(data);
            } catch (error) {
                console.error('Ошибка при загрузке проектов:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const visibleProjects = full || showAll ? projects : projects.slice(0, 2);


    return (
        <section id="projects" className="w-full bg-bg lg:px-16 md:px-12 px-8 lg:py-20 py-10 flex items-center justify-center">
            <div className="w-full max-w-[1536px] flex flex-col items-center z-20">
                <p className="font-semibold mb-4 text-primary">
                    {language === "ru" ?
                        "Портфолио" :
                        "Portfolio"
                    }
                </p>
                <h2 className="font-bold lg:text-5xl text-4xl mb-6">
                    {language === "ru" ?
                        "Наши Недавние Проекты" :
                        "Our Recent Projects"
                    }
                </h2>
                <p className="font-normal mb-20 text-[#aaaaaa]">
                    {language === "ru" ?
                        "Ознакомьтесь с нашими разнообразными веб-решениями" :
                        "Discover our diverse web solutions"
                    }
                </p>
                {loading ? <p className={"bg-bg text-center font-bold text-3xl"}>Загрузка...</p> :
                    <div className="flex flex-col gap-16">
                        {visibleProjects.map((item, index) => (
                            <motion.a
                                key={item.id}
                                href={item.link}
                                target="_blank"
                                initial={{opacity: 0, y: 50}}
                                whileInView={{opacity: 1, y: 0}}
                                transition={{duration: 2, delay: index * 0.2}}
                                className="block"
                            >
                                <img
                                    src={item.img}
                                    alt="project preview"
                                    className="mb-6 rounded-xl"
                                />
                                <div
                                    className="flex flex-col lg:flex-row items-start lg:items-center gap-6 justify-between px-6">
                                    <div className="flex flex-col gap-2">
                                        <h4 className="text-2xl font-bold">
                                            {language === "ru" ? item.titleru : item.titleen}
                                        </h4>
                                        <p className="font-light text-[#aaaaaa]">
                                            {language === "ru" ? item.textru : item.texten}
                                        </p>
                                    </div>
                                    <div className="flex items-center lg:gap-3">
                                        <p className="font-light ">
                                            {language === "ru" ?
                                                "Посмотреть проект" :
                                                "View project"
                                            }
                                        </p>
                                        <MdKeyboardArrowRight className="mt-[1px]"/>
                                    </div>
                                </div>
                            </motion.a>
                        ))}
                    </div>}
                {!full && !showAll && projects.length > 2 && (
                    <button
                        onClick={() => setShowAll(true)}
                        className="mt-10 px-6 py-2 bg-primary text-white font-semibold rounded-xl"
                    >
                        {language === "ru" ?
                            "Посмотреть все" :
                            "Show all"
                        }
                    </button>
                )}
            </div>
        </section>
    );
};

export default Projects;