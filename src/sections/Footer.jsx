import {NavLink} from "react-router-dom"
import Main from "../assets/Main.png"


const Footer = () => {
    return (
        <footer className={"w-full bg-bg lg:px-16 md:px-12 px-8 px-8 py-20"}>
            <div className={"w-full flex justify-between items-center mb-20"}>
                <div className={"flex flex-col"}>
                    <img
                        src={Main}
                        width={112}
                        className={"mb-8"}
                    />
                    <p className={"font-semibold mb-1"}>
                        Контакты:
                    </p>
                    <a className={"underline"} href={"mailto:web.express.pro@gmail.com"}>
                        web.express.pro@gmail.com
                    </a>
                </div>

                <div className={"flex gap-4 md:gap-8 font-medium flex-col md:flex-row"}>
                    <NavLink to={"/"}>Главная</NavLink>
                    <NavLink to={"/about"}>О нас</NavLink>
                    <NavLink to={"/contact"}>Связаться</NavLink>
                    <NavLink to={"/blogs"}>Блог</NavLink>
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
