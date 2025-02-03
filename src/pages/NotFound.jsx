import { NavLink } from 'react-router-dom';
import {useLanguage} from "../App.jsx"

const NotFound = () => {
    const {language} = useLanguage()

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-bg text-primary">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <p className="text-2xl mb-8">
                {language === "ru" ?
                    "Страница не найдена" :
                    "Page Not Found"
                }
            </p>
            <NavLink to="/" className="px-5 py-2 border rounded-xl font-medium">
                {language === "ru" ?
                    "Вернуться на главную" :
                    "Return to Home Page"
                }
            </NavLink>
        </div>
    );
};

export default NotFound;