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
    const menuRef = useRef(null); // ref для меню
    const {scrollYProgress} = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });
    console.log("nav", isNavOpen)

    // Добавляем обработчик кликов вне nav
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navRef.current &&
                !navRef.current.contains(event.target) &&
                !buttonRef.current.contains(event.target) &&
                !menuRef.current.contains(event.target)) {
                setIsNavOpen(false);
            }
        };

        if (isNavOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

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
            <header className="absolute lg:fixed top-0 left-0 w-full bg-bg lg:bg-opacity-65 lg:backdrop-blur z-40">
                <div className="relative w-full h-full px-6 py-4 lg:px-16 lg:py-4 flex items-center justify-between border-b-2 border-b-primary lg:border-none">
                    <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary origin-[0%] lg:block hidden"
                        style={{scaleX}}
                    />

                    {/* Desktop Navigation and Logo */}
                    <motion.div
                        className="hidden lg:flex items-center gap-8"
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
                                <img src={Small} alt="A Logo" className="h-10" />
                            </NavLink>
                        </motion.div>
                        <motion.div variants={linkVariants}>
                            <NavLink to={`/${language}/about`} onClick={handleNavLinkClick}>
                                {language === "ru" ? "О нас" : "About Us"}
                            </NavLink>
                        </motion.div>
                        <motion.div variants={linkVariants}>
                            <NavLink to={`/${language}/blogs`} onClick={handleNavLinkClick}>
                                {language === "ru" ? "Блог" : "Blog"}
                            </NavLink>
                        </motion.div>
                        <motion.div
                            ref={buttonRef}
                            onClick={toggleNav}
                            className="flex gap-0.5 items-center justify-center cursor-pointer"
                            variants={linkVariants}
                        >
                            <button>
                                {language === "ru" ? "Больше" : "More"}
                            </button>
                            {isNavOpen ? <MdKeyboardArrowDown/> : <MdKeyboardArrowRight/>}
                        </motion.div>
                    </motion.div>

                    {/* Mobile Layout */}
                    <div className="lg:hidden flex items-center w-full">
                        {/* Mobile Menu Button */}
                        <button
                            ref={menuRef}
                            onClick={toggleNav}
                            className="w-8 h-8 flex flex-col justify-center items-center z-[102]"
                        >
                            <div className="w-6 h-6 relative">
                                <span className={`absolute w-full h-0.5 bg-text transition-all duration-300 ${
                                    isNavOpen
                                        ? 'rotate-45 top-1/2 -translate-y-1/2'
                                        : 'top-1/4 -translate-y-1/2'
                                }`} />
                                <span className={`absolute w-full h-0.5 bg-text top-1/2 -translate-y-1/2 transition-opacity duration-300 ${
                                    isNavOpen ? 'opacity-0' : 'opacity-100'
                                }`} />
                                <span className={`absolute w-full h-0.5 bg-text transition-all duration-300 ${
                                    isNavOpen
                                        ? '-rotate-45 top-1/2 -translate-y-1/2'
                                        : 'top-3/4 -translate-y-1/2'
                                }`} />
                            </div>
                        </button>

                        {/* Mobile Logo */}
                        <div className="absolute left-1/2 -translate-x-1/2">
                            <NavLink to="/" onClick={handleNavLinkClick}>
                                <img src={Small} alt="A Logo" className="h-10" />
                            </NavLink>
                        </div>
                    </div>

                    {/* Right section with buttons */}
                    <motion.div
                        className="flex items-center gap-4"
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
                        <motion.button
                            variants={linkVariants}
                            onClick={toggleModal}
                            className="px-4 py-2 border rounded-xl font-medium text-sm md:text-base text-nowrap"
                        >
                            {language === "ru" ? "Работать с нами" : "Work with us"}
                        </motion.button>
                        <Link
                            to={`/${language}/contact`}
                            className="hidden lg:block px-5 py-3 rounded-xl text-center border text-primary cursor-pointer font-medium text-nowrap"
                        >
                            {language === "ru" ? "Связаться с нами" : "Contact Us"}
                        </Link>
                    </motion.div>
                </div>

                {/* Mobile Navigation Menu */}
                <AnimatePresence>
                    {isNavOpen && (
                        <motion.nav
                            ref={navRef}
                            className="absolute top-[72px] left-0 w-full  bg-bg overflow-y-auto z-[101]"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            transition={{duration: 0.2}}
                        >
                            <div className="flex flex-col lg:flex-row gap-10 lg:gap-[25vw] px-6 lg:px-16 pt-8">
                                {navInfo.map((item, index) => (
                                    <div key={index} className="flex flex-col justify-evenly">
                                        <p className="font-semibold text-[14px] mb-4">{item.title[language]}</p>
                                        <ul className="flex flex-col gap-2">
                                            {item.links.map((page, index2) => (
                                                <motion.li
                                                    className="rounded"
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
                                                    <NavLink
                                                        to={page.link[language]}
                                                        className="flex gap-3 p-2 cursor-pointer"
                                                        onClick={handleNavLinkClick}
                                                    >
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
                            <div className="bg-[#2e2e2e] text-primary w-full text-start px-6 lg:px-16 py-4 mt-4">
                                {language === "ru" ? (
                                    <p>
                                        Готовы запустить свой проект?{" "}
                                        <NavLink
                                            className="underline cursor-pointer"
                                            to={`/${language}contact`}
                                            onClick={handleNavLinkClick}
                                        >
                                            Свяжитесь с нами
                                        </NavLink>
                                    </p>
                                ) : (
                                    <p>
                                        Ready to get your project up and running?{" "}
                                        <NavLink
                                            className="underline cursor-pointer"
                                            to={`/${language}contact`}
                                            onClick={handleNavLinkClick}
                                        >
                                            Contact Us
                                        </NavLink>
                                    </p>
                                )}
                            </div>
                        </motion.nav>
                    )}
                </AnimatePresence>
            </header>
            <WorkWithUs isOpen={isModalOpen} onClose={toggleModal} />
        </>
    );
};

export default Header;