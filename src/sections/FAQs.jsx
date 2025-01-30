import { useState } from 'react';
import { motion } from 'framer-motion';
import questions from "../constants/FAQsInfo.js";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from 'react-icons/md';

const FAQs = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleQuestion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
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
        <section
            className="bg-bg w-full px-16 py-20 flex justify-center items-center">
            <motion.div className="w-full max-w-[1536px]"
                        initial="hidden"
                        whileInView="visible"
                        variants={containerVariants}>
                <motion.h2 className="text-5xl font-bold text-center mb-2 text-primary">
                    FAQs
                </motion.h2>
                <motion.p className="text-[#aaaaaa] text-center mb-8">
                    У вас есть вопрос? Возможно, вы найдете ответ здесь
                </motion.p>
                <motion.div className="flex flex-col gap-6"
                            initial="hidden"
                            whileInView="visible"
                            variants={containerVariants}>
                    {questions.map((item, index) => (
                        <motion.div key={index} className="border-b border-secondary pb-6" variants={questionVariants}>
                            <button
                                onClick={() => toggleQuestion(index)}
                                className="w-full text-left text-xl font-medium text-text focus:outline-none ml-2"
                            >
                                {item.question}
                                {openIndex === index ? <MdKeyboardArrowDown className="inline ml-2" /> : <MdKeyboardArrowRight className="inline ml-2" />}
                            </button>
                            {openIndex === index && (
                                <p className="mt-3 text-[#aaaaaa] ml-2">
                                    {item.answer}
                                </p>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
};

export default FAQs;