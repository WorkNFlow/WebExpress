import { NavLink } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-bg text-primary">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <p className="text-2xl mb-8">Страница не найдена</p>
            <NavLink to="/" className="px-5 py-2 border rounded-xl font-medium">
                Вернуться на главную
            </NavLink>
        </div>
    );
};

export default NotFound;