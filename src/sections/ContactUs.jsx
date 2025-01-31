import { motion } from 'framer-motion';

const ContactUs = () => {
    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.3 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <section className="w-full bg-bg flex items-center justify-center lg:px-16 md:px-12 px-8 pb-40">
            <motion.div className="max-w-[1536px]"
                        initial="hidden"
                        whileInView="visible"
                        variants={containerVariants}>
                <motion.h2 className="text-5xl font-bold text-center mb-10 text-primary" variants={itemVariants}>
                    Свяжитесь с нами
                </motion.h2>
                <motion.div className="flex gap-10 lg:gap-20 flex-col lg:flex-row items-center"
                            initial="hidden"
                            whileInView="visible"
                            variants={containerVariants}>
                    <motion.p className="lg:w-[40vw] text-center text-[18px]" variants={itemVariants}>
                        Мы готовы ответить на любые ваши вопросы, обсудить ваши идеи и помочь вам в создании идеального
                        веб-сайта. Напишите нам на электронную почту, и мы свяжемся с вами в кратчайшие сроки!
                    </motion.p>
                    <motion.div className="flex flex-col lg:w-[40vw] items-center gap-6 max-lg:w-full"
                                initial="hidden"
                                whileInView="visible"
                                variants={containerVariants}>
                        <motion.p className="text-[20px]" variants={itemVariants}>
                            web.express.pro@gmail.com
                        </motion.p>
                        <motion.a
                            href="#support"
                            className="px-5 py-3 rounded-xl bg-primary text-center text-text font-medium w-full cursor-pointer hover:bg-hover"
                            variants={itemVariants}
                        >
                            Напишите нам
                        </motion.a>
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default ContactUs;