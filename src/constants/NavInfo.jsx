import { AiOutlineTeam } from "react-icons/ai";
import { BsBriefcase } from "react-icons/bs";
import { FaQuoteLeft } from "react-icons/fa6";
import { IoMailOutline } from "react-icons/io5";
import { FaRegNewspaper, FaHandshake } from "react-icons/fa";
import { MdHelpOutline } from "react-icons/md";
import { BiSupport } from "react-icons/bi";

const IconsSize = "text-xl";

const navInfo = [
    {
        title: {
            ru: 'Наши страницы',
            en: 'Our Pages'
        },
        links: [
            {
                icon: <AiOutlineTeam className={IconsSize} />,
                name: {
                    ru: "О нас",
                    en: "About Us"
                },
                text: {
                    ru: "Узнайте больше о нашей команде",
                    en: "Learn more about our team"
                },
                link: {
                    ru: "/ru/about",
                    en: "/en/about"
                }
            },
            {
                icon: <BsBriefcase className={IconsSize} />,
                name: {
                    ru: "Портфолио",
                    en: "Portfolio"
                },
                text: {
                    ru: "Посмотрите наши последние проекты и работы",
                    en: "Check out our latest projects and works"
                },
                link: {
                    ru: "/ru/#projects",
                    en: "/en/#projects"
                }
            },
            {
                icon: <FaQuoteLeft className={IconsSize} />,
                name: {
                    ru: "Отзывы",
                    en: "Testimonials"
                },
                text: {
                    ru: "Вот что говорят о нас наши клиенты",
                    en: "Here's what our clients say about us"
                },
                link: {
                    ru: "/ru/#testimonials",
                    en: "/en/#testimonials"
                }
            },
            {
                icon: <IoMailOutline className={IconsSize} />,
                name: {
                    ru: "Связаться с нами",
                    en: "Contact Us"
                },
                text: {
                    ru: "Свяжитесь с нашей командой",
                    en: "Get in touch with our team"
                },
                link: {
                    ru: "/ru/contact",
                    en: "/en/contact"
                }
            },
        ]
    },
    {
        title: {
            ru: 'Дополнительные ресурсы',
            en: 'Additional Resources'
        },
        links: [
            {
                icon: <FaRegNewspaper className={IconsSize} />,
                name: {
                    ru: "Блог",
                    en: "Blog"
                },
                text: {
                    ru: "Прочитайте о наших последних нововведениях",
                    en: "Read about our latest updates"
                },
                link: {
                    ru: "/ru/blogs",
                    en: "/en/blogs"
                }
            },
            {
                icon: <MdHelpOutline className={IconsSize} />,
                name: {
                    ru: "FAQs",
                    en: "FAQs"
                },
                text: {
                    ru: "Найдите ответ на популярные вопросы",
                    en: "Find answers to popular questions"
                },
                link: {
                    ru: "/ru/contact",
                    en: "/en/contact"
                }
            },
            {
                icon: <BiSupport className={IconsSize} />,
                name: {
                    ru: "Служба поддержки",
                    en: "Support"
                },
                text: {
                    ru: "Здесь Вам всегда готовы помочь",
                    en: "We are always ready to help you here"
                },
                link: {
                    ru: "/ru/contact",
                    en: "/en/contact"
                }
            },
            {
                icon: <FaHandshake className={IconsSize} />,
                name: {
                    ru: "Работа",
                    en: "Careers"
                },
                text: {
                    ru: "Станьте частью нашей профессиональной команды",
                    en: "Join our professional team"
                },
                link: {
                    ru: "/ru/contact",
                    en: "/en/contact"
                }
            },
        ]
    }
];

export default navInfo;