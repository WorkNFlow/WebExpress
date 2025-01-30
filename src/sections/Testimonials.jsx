import { useEffect, useState } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';
import { getTestimonials } from '../constants/TestimonialsInfo.js';

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [loading, setLoading] = useState(true);
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        const fetchTestimonials = async () => {
            setLoading(true);
            const data = await getTestimonials();
            setTestimonials(data);
            setLoading(false);
        };

        fetchTestimonials();
    }, []);

    const handlePrev = () => {
        setDirection(-1);
        setCurrentIndex((prevIndex) => (
            prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
        ));
    };

    const handleNext = () => {
        setDirection(1);
        setCurrentIndex((prevIndex) => (
            prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        ));
    };

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? -1000 : 1000,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        })
    };

    return (
        <section id={"testimonials"} className="w-full bg-bg px-16 lg:py-20 py-10 flex items-center justify-center">
            <div className="w-full max-w-7xl flex flex-col items-center">
                <div className="flex flex-col items-center mb-20">
                    <h2 className="text-primary font-bold text-5xl mb-6">
                        Отзывы
                    </h2>
                    <p className="font-normal text-[#aaaaaa]">
                        Вот что говорят о нас наши клиенты
                    </p>
                </div>
                {loading ? <p className={"bg-bg text-center font-bold text-3xl"}>Загрузка...</p> :
                    <div className="flex flex-col items-center justify-between w-full">
                        <div className="flex items-center w-full justify-between mb-16 gap-4">
                            <button
                                onClick={handlePrev}
                                className="p-2 bg-primary text-white rounded-full hover:bg-opacity-90 transition-colors"
                            >
                                <MdKeyboardArrowLeft size={24}/>
                            </button>
                            <div className="w-5/6 flex justify-center items-center min-h-[100px] overflow-hidden relative">
                                <AnimatePresence custom={direction} mode="wait">
                                    <motion.div
                                        key={currentIndex}
                                        custom={direction}
                                        variants={variants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        transition={{
                                            x: {type: "spring", stiffness: 300, damping: 30},
                                            opacity: {duration: 0.2}
                                        }}
                                        className="text-2xl font-bold text-center w-full"
                                    >
                                        {testimonials[currentIndex].text}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                            <button
                                onClick={handleNext}
                                className="p-2 bg-primary text-white rounded-full hover:bg-opacity-90 transition-colors"
                            >
                                <MdKeyboardArrowRight size={24}/>
                            </button>
                        </div>
                        <AnimatePresence custom={direction} mode="wait">
                            <motion.div
                                key={currentIndex}
                                custom={direction}
                                variants={variants}
                                initial={"enter"}
                                animate={"center"}
                                exit={"exit"}
                                transition={{
                                    x: {type: "spring", stiffness: 300, damping: 30},
                                    opacity: {duration: 0.2}
                                }}
                                className="flex flex-col items-center text-center"
                            >
                                <p className="font-medium mb-4">{testimonials[currentIndex].name}</p>
                                <p className="font-light text-[#aaaaaa]">{testimonials[currentIndex].job}</p>
                            </motion.div>
                        </AnimatePresence>
                    </div>}
            </div>
        </section>
    );
};

export default Testimonials;