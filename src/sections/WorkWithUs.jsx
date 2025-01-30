import { useState } from 'react';
import supportFormFields from '../constants/WorkWithUsInfo.js';
import emailjs from "@emailjs/browser";

const WorkWithUs = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        resume: null,
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true); // loading true

        emailjs.send(
            "service_ca0cbum",
            "template_08xvs0i",
            {
                from_name: formData.name,
                to_name: "Web Express",
                from_email: formData.email,
                to_email: "web.express.pro@gmail.com",
                message: formData.message
            },
            "qw7SvOTkOB7IW9dm6"
        )
            .then(() => {
                setLoading(false); // loading false
                alert("Сообщение успешно отправлено!");
                setFormData({
                    name: "",
                    email: "",
                    message: "",
                });
            }, (error) => {
                setLoading(false); // loading false
                console.log(error);
                alert("Упс что-то пошло не так, попробуйте позже.");
            });
    };

    const handleOutsideClick = (e) => {
        if (e.target.id === 'workWithUsBackdrop') {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div
            id="workWithUsBackdrop"
            onClick={handleOutsideClick}
            className="fixed inset-0 bg-bg bg-opacity-80 flex justify-center items-center z-50"
        >
            <div className="bg-bg rounded-xl shadow-window shadow-primary w-[35vw] min-w-[400px] max-w-[1024px] p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-4 text-gray-500 hover:text-gray-700"
                >
                    ✕
                </button>
                <h2 className="text-2xl font-bold text-center mb-3 text-primary">
                    Работать с нами
                </h2>
                <p className="text-gray-500 text-center mb-8">
                    Хотите стать частью нашей команды? Мы всегда ищем талантливых людей, увлечённых веб-разработкой.
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    {supportFormFields.map((field, index) => (
                        <div key={index} className="flex flex-col gap-2">
                            <label className="text-gray-700 ml-1" htmlFor={field.name}>
                                {field.label}
                            </label>
                            {field.type === 'textarea' ? (
                                <textarea
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    placeholder={field.placeholder}
                                    className="p-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-primary bg-bg"
                                    rows="5"
                                    required
                                />
                            ) : field.type === 'file' ? (
                                <div className="relative">
                                    <input
                                        type={field.type}
                                        name={field.name}
                                        onChange={handleChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="p-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-primary"
                                    >
                                        Загрузить резюме
                                    </button>
                                </div>
                            ) : (
                                <input
                                    type={field.type}
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    placeholder={field.placeholder}
                                    className="p-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-primary bg-bg"
                                    required
                                />
                            )}
                        </div>
                    ))}
                    <button
                        type="submit"
                        className="px-5 py-3 border border-primary rounded-xl font-medium text-primary hover:bg-hover hover:text-text hover:border-hover"
                    >
                        {loading ? "Отправляю..." : "Отправить заявку"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default WorkWithUs;