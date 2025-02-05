import {NavLink} from "react-router-dom";
import {useLanguage} from "../App.jsx";
import Main from "../assets/Main.png";
import {FaLanguage} from "react-icons/fa6";

const Footer = () => {
    const {language, setLanguage} = useLanguage();

    const toggleLanguage = () => {
        setLanguage(prevLanguage => (prevLanguage === "ru" ? "en" : "ru"));
    };

    return (
        <footer className={"w-full bg-bg lg:px-16 md:px-12 px-8 py-20"}>
            <div className={"w-full flex justify-between items-center mb-20"}>
                <div className={"flex flex-col"}>
                    <img
                        src={Main}
                        width={112}
                        className={"mb-8"}
                    />
                    <p className={"font-semibold mb-1"}>
                        {language === "ru" ? "Контакты:" : "Contacts:"}
                    </p>
                    <a className={"underline mb-6"} href={"mailto:web.express.pro@gmail.com"}>
                        web.express.pro@gmail.com
                    </a>
                    <button onClick={toggleLanguage} className={"flex items-center gap-2 mt-4"}>
                        <p className={"font-semibold"}>
                            {language === "ru" ? "Сменить язык" : "Change language"}
                        </p>
                        <FaLanguage className={"text-2xl"}/>
                    </button>
                </div>

                <div className={"flex gap-5 md:gap-8 font-medium flex-col md:flex-row"}>
                    <NavLink to={`/${language}/`}>
                        {language === "ru" ? "Главная" : "Home"}
                    </NavLink>
                    <NavLink to={`/${language}/about`}>
                        {language === "ru" ? "О нас" : "About Us"}
                    </NavLink>
                    <NavLink to={`/${language}/contact`}>
                        {language === "ru" ? "Связаться" : "Contact Us"}
                    </NavLink>
                    <NavLink to={`/${language}/blogs`}>
                        {language === "ru" ? "Блог" : "Blog"}
                    </NavLink>
                </div>
            </div>
            <div className={"w-full flex flex-col items-center gap-8"}>
                <div className={"h-[2px] w-full bg-primary"}/>
                <p>© 2025 Web Express. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;