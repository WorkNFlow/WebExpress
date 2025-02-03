import { useState } from 'react';
import supportFormFields from '../constants/SupportInfo.js';
import { motion } from 'framer-motion';
import emailjs from "@emailjs/browser";
import { useLanguage } from '../App.jsx';

const Support = () => {
    const { language } = useLanguage();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
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
                alert(language === "ru" ? "Сообщение успешно отправлено!" : "Message sent successfully!");
                setFormData({
                    name: "",
                    email: "",
                    message: "",
                });
            }, (error) => {
                setLoading(false); // loading false
                console.log(error);
                alert(language === "ru" ? "Упс что-то пошло не так, попробуйте позже." : "Oops, something went wrong. Please try again later.");
            });
    };

    const containerVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5, staggerChildren: 0.3 } }
    };

    const questionVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }
    };

    return (
        <section id={"support"} className={"bg-bg w-full lg:px-16 md:px-12 px-8 py-20 flex justify-center items-center"}>
            <div className={"w-full max-w-[1536px]"}>
                <h2 className={"lg:text-5xl text-4xl font-bold text-center mb-2 text-primary"}>
                    {language === "ru" ? "Служба поддержки" : "Support Service"}
                </h2>
                <p className={"text-[#aaaaaa] text-center mb-8"}>
                    {language === "ru" ? "Остались вопросы? Наша команда всегда готова помочь Вам!" : "Have questions? Our team is always ready to help you!"}
                </p>
                <motion.form onSubmit={handleSubmit} className={"flex flex-col gap-6"}
                             initial="hidden"
                             whileInView="visible"
                             variants={containerVariants}>
                    {supportFormFields.map((field, index) => (
                        <motion.div key={index} className={"flex flex-col gap-2"} variants={questionVariants}>
                            <label className={"text-text ml-1"} htmlFor={field.name}>
                                {field.label[language]}
                            </label>
                            {field.type === "textarea" ? (
                                <textarea
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    placeholder={field.placeholder[language]}
                                    className={"p-3 border border-secondary rounded-xl bg-bg text-text focus:border-primary"}
                                    rows="5"
                                    required
                                />
                            ) : (
                                <input
                                    type={field.type}
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    placeholder={field.placeholder[language]}
                                    className={"p-3 border border-secondary rounded-xl bg-bg text-text focus:border-primary"}
                                    required
                                />
                            )}
                        </motion.div>
                    ))}
                    <motion.button type="submit" className={"px-5 py-3 border border-primary rounded-xl font-medium text-primary hover:bg-hover hover:text-text hover:border-hover"} variants={questionVariants}>
                        {loading ? (language === "ru" ? "Отправляю..." : "Sending...") : (language === "ru" ? "Отправить" : "Submit")}
                    </motion.button>
                </motion.form>
            </div>
        </section>
    );
};

export default Support;