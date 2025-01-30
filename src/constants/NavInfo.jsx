import {AiOutlineTeam} from "react-icons/ai"
import { BsBriefcase } from "react-icons/bs";
import { FaQuoteLeft } from "react-icons/fa6";
import { IoMailOutline } from "react-icons/io5";
import { FaRegNewspaper, FaHandshake} from "react-icons/fa";
import { MdHelpOutline } from "react-icons/md";
import { BiSupport } from "react-icons/bi";

const IconsSize = "text-xl"


const navInfo = [
    {
        title: 'Наши страницы',
        links: [
            {
                icon: <AiOutlineTeam className={IconsSize}/>,
                name: "О нас",
                text: "Узнайте больше о нашей команде",
                link: "/about"
            },
            {
                icon: <BsBriefcase className={IconsSize}/>,
                name: "Портфолио",
                text: "Посмотрите наши последние проекты и работы",
                link: "/#projects"
            },
            {
                icon: <FaQuoteLeft className={IconsSize}/>,
                name: "Отзывы",
                text: "Вот что говорят о нас наши клиенты",
                link: "/#testimonials"
            },
            {
                icon: <IoMailOutline className={IconsSize}/>,
                name: "Связаться с нами",
                text: "Свяжитесь с нашей командой",
                link: "/contact"
            },
        ]
    },
    {
        title: 'Дополнительные ресурсы',
        links: [
            {
                icon: <FaRegNewspaper className={IconsSize}/>,
                name: "Блог",
                text: "Прочитайте о наших последних нововведениях",
                link: "/blogs"
            },
            {
                icon: <MdHelpOutline className={IconsSize}/>,
                name: "FAQs",
                text: "Найдите ответ на популярные вопросы",
                link: "/contact"
            },
            {
                icon: <BiSupport className={IconsSize}/>,
                name: "Служба поддержки",
                text: "Здесь Вам всегда готовы помочь",
                link: "/contact"
            },
            {
                icon: <FaHandshake className={IconsSize}/>,
                name: "Работа",
                text: "Станьте частью нашей профессиональной команды",
                link: "/contact"
            },
        ]
    }
]


export default navInfo;