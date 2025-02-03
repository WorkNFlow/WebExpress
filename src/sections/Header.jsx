import {useContext, useRef, useEffect, useState} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {motion, AnimatePresence, useScroll, useSpring} from 'framer-motion';
import navInfo from '../constants/NavInfo.jsx';
import Small from '../assets/Small.png';
import {MdKeyboardArrowDown, MdKeyboardArrowRight} from 'react-icons/md';
import {NavContext, useLanguage} from '../App';
import WorkWithUs from './WorkWithUs';

const Header = () => {
    const {language} = useLanguage();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };
    const {isNavOpen, toggleNav, setIsNavOpen} = useContext(NavContext);
    const navRef = useRef(null); // ref для nav элемента
    const buttonRef = useRef(null); // ref для кнопки
    const {scrollYProgress} = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });
    console.log(isNavOpen)

    // Добавляем обработчик кликов вне nav
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Проверяем, что клик был не по nav и не по кнопке открытия
            if (navRef.current &&
                !navRef.current.contains(event.target) &&
                !buttonRef.current.contains(event.target)) {
                setIsNavOpen(false);
            }
        };

        // Добавляем обработчик только когда nav открыт
        if (isNavOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        // Очищаем обработчик при размонтировании
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isNavOpen, setIsNavOpen]);

    const linkVariants = {
        hidden: {opacity: 0, x: -20},
        visible: {opacity: 1, x: 0}
    };

    const listItemVariants = {
        initial: {
            backgroundSize: '0% 100%'
        },
        hover: {
            backgroundSize: '100% 100%',
            transition: {
                duration: 0.3,
                ease: 'easeInOut'
            }
        }
    };

    const handleNavLinkClick = () => {
        setIsNavOpen(false);
    };

    return (
        <>
            <header
                className="w-full flex flex-col justify-center items-center bg-bg lg:bg-opacity-65 lg:backdrop-blur z-50 lg:fixed lg:top-0 lg:left-0 ">
                <div
                    className="relative w-full h-full px-10 py-6 lg:px-16 lg:py-4 max-lg:gap-3 flex justify-between items-center max-lg:border-b-2 max-lg:border-b-primary">
                    <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary origin-[0%] lg:block hidden"
                        style={{scaleX}}
                    />

                    <motion.div
                        className="flex flex-col lg:flex-row lg:items-center max-lg:gap-3 items-start justify-between font-medium w-full max-w-[380px]"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            visible: {
                                transition: {
                                    staggerChildren: 0.2
                                }
                            }
                        }}
                    >
                        <motion.div variants={linkVariants}>
                            <NavLink to="/" onClick={handleNavLinkClick}>
                                <img src={Small} alt={"A Logo"} className="h-10"/>
                            </NavLink>
                        </motion.div>
                        <motion.div variants={linkVariants}>
                            <NavLink to={`/${language}/about`} onClick={handleNavLinkClick}>
                                {language === "ru" ?
                                    "О нас" :
                                    "About Us"
                                }
                            </NavLink>
                        </motion.div>
                        <motion.div variants={linkVariants}>
                            <NavLink to={`/${language}/blogs`} onClick={handleNavLinkClick}>
                                {language === "ru" ?
                                    "Блог" :
                                    "Blog"
                                }
                            </NavLink>
                        </motion.div>
                        <motion.div
                            ref={buttonRef}
                            onClick={toggleNav}
                            className="flex gap-0.5 items-center justify-center cursor-pointer"
                            variants={linkVariants}>
                            <button>
                                {language === "ru" ?
                                    "Больше" :
                                    "More"
                                }
                            </button>
                            {isNavOpen ? <MdKeyboardArrowDown/> : <MdKeyboardArrowRight/>}
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="flex flex-col lg:flex-row lg:items-center items-end max-lg:gap-10 w-full lg:gap-8 justify-end"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            visible: {
                                transition: {
                                    staggerChildren: 0.2
                                }
                            }
                        }}
                    >
                        <motion.button variants={linkVariants} onClick={toggleModal}
                                       className="px-5 py-2 border rounded-xl font-medium min-h-[45px] text-nowrap">
                            {language === "ru" ?
                                "Работать с нами" :
                                "Work with us"
                            }
                        </motion.button>
                        <motion.div variants={linkVariants}>
                            <Link to={`/${language}/contact`}
                                  className="px-5 py-3 rounded-xl text-center border text-primary cursor-pointer font-medium min-h-[45px] text-nowrap">
                                {language === "ru" ?
                                    "Связаться с нами" :
                                    "Contact Us"
                                }
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>

                <AnimatePresence>
                    {isNavOpen && (
                        <motion.nav
                            ref={navRef}
                            className="w-full bg-bg bg-opacity-95 pt-8 flex flex-col absolute lg:top-[74px] top-[234px] left-0 z-30"
                            initial={{y: -25, opacity: 0}}
                            animate={{y: 0, opacity: 1}}
                            transition={{duration: 0.5}}
                        >
                            <div className={"flex flex-col lg:flex-row gap-10 lg:gap-[25vw] px-16"}>
                                {navInfo.map((item, index) => (
                                    <div key={index} className={"flex flex-col justify-evenly"}>
                                        <p className="font-semibold text-[14px] mb-4">{item.title[language]}</p>
                                        <ul className="flex flex-col gap-2">
                                            {item.links.map((page, index2) => (
                                                <motion.li
                                                    className={"rounded"}
                                                    key={index2}
                                                    initial="initial"
                                                    whileHover="hover"
                                                    variants={listItemVariants}
                                                    style={{
                                                        backgroundImage: 'linear-gradient(to right, rgb(100 100 100), rgb(100 100 100))',
                                                        backgroundRepeat: 'no-repeat',
                                                        backgroundPosition: 'left'
                                                    }}
                                                >
                                                    <NavLink to={page.link} className="flex gap-3 p-2 cursor-pointer"
                                                             onClick={handleNavLinkClick}>
                                                        {page.icon}
                                                        <div>
                                                            <p className="font-semibold">{page.name[language]}</p>
                                                            <p className="text-[14px]">{page.text[language]}</p>
                                                        </div>
                                                    </NavLink>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                            {language === "ru" ?
                                <p className={"bg-[#2e2e2e] text-primary w-full text-start px-16 py-4 mt-4"}>
                                    Готовы запустить свой проект? <NavLink className={"underline cursor-pointer"}
                                                                           to={"/contact"} onClick={handleNavLinkClick}>
                                    Свяжитесь с нами</NavLink>
                                </p> :
                                <p className={"bg-[#2e2e2e] text-primary w-full text-start px-16 py-4 mt-4"}>
                                    Ready to get your project up and running? <NavLink
                                    className={"underline cursor-pointer"}
                                    to={"/contact"} onClick={handleNavLinkClick}>Contact Us</NavLink>
                                </p>
                            }
                        </motion.nav>
                    )}
                </AnimatePresence>
            </header>
            <WorkWithUs
                isOpen={isModalOpen} onClose={toggleModal}
            />
        </>
    );
};

export default Header;