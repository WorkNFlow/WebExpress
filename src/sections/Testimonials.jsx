import { useEffect, useState, useRef } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';
import { getTestimonials } from '../constants/TestimonialsInfo.js';

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [loading, setLoading] = useState(true);
    const [testimonials, setTestimonials] = useState([]);
    const [mobileIndex, setMobileIndex] = useState(1); // Начинаем с 1, так как первый элемент - клон последнего
    const scrollContainerRef = useRef(null);
    const isScrollingRef = useRef(false);

    useEffect(() => {
        const fetchTestimonials = async () => {
            setLoading(true);
            const data = await getTestimonials();
            setTestimonials(data);
            setLoading(false);
        };

        fetchTestimonials();
    }, []);

    const handleScroll = () => {
        if (!scrollContainerRef.current || isScrollingRef.current) return;

        const container = scrollContainerRef.current;
        const slideWidth = container.clientWidth;
        const currentScroll = container.scrollLeft;
        const currentSlideIndex = Math.round(currentScroll / slideWidth);

        // Определяем текущий индекс с учетом клонированных элементов
        let newIndex = currentSlideIndex - 1; // Вычитаем 1, так как первый элемент - клон
        if (newIndex < 0) newIndex = testimonials.length - 1;
        if (newIndex >= testimonials.length) newIndex = 0;

        setMobileIndex(newIndex);

        // Проверяем, нужно ли перемещать скролл для бесконечного эффекта
        if (currentSlideIndex === 0) {
            // Пользователь дошел до клона последнего элемента
            isScrollingRef.current = true;
            setTimeout(() => {
                container.style.scrollBehavior = 'auto';
                container.scrollLeft = slideWidth * testimonials.length;
                container.style.scrollBehavior = 'smooth';
                isScrollingRef.current = false;
            }, 300);
        } else if (currentSlideIndex === testimonials.length + 1) {
            // Пользователь дошел до клона первого элемента
            isScrollingRef.current = true;
            setTimeout(() => {
                container.style.scrollBehavior = 'auto';
                container.scrollLeft = slideWidth;
                container.style.scrollBehavior = 'smooth';
                isScrollingRef.current = false;
            }, 300);
        }
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container || testimonials.length === 0) return;

        // Устанавливаем начальную позицию скролла на первый реальный элемент
        container.scrollLeft = container.clientWidth;

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, [testimonials.length]);

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

    const scrollToSlide = (index) => {
        const container = scrollContainerRef.current;
        if (!container) return;

        // Добавляем 1 к индексу из-за клонированного первого элемента
        container.scrollTo({
            left: container.clientWidth * (index + 1),
            behavior: 'smooth'
        });
    };

    // Создаем массив с клонированными элементами для бесконечного скролла
    const getExtendedTestimonials = () => {
        if (testimonials.length === 0) return [];
        return [
            testimonials[testimonials.length - 1], // Клон последнего в начало
            ...testimonials,
            testimonials[0] // Клон первого в конец
        ];
    };

    return (
        <section id="testimonials" className="w-full overflow-hidden bg-bg lg:px-16 md:px-12 px-8 lg:py-20 py-10">
            <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
                <div className="flex flex-col items-center lg:mb-20 mb-10">
                    <h2 className="text-primary font-bold lg:text-5xl text-4xl lg:mb-6 mb-2">
                        Отзывы
                    </h2>
                    <p className="font-normal text-[#aaaaaa]">
                        Вот что говорят о нас наши клиенты
                    </p>
                </div>
                {loading ? (
                    <p className="bg-bg text-center font-bold text-3xl">Загрузка...</p>
                ) : (
                    <>
                        {/* Desktop version with buttons */}
                        <div className="hidden md:flex flex-col items-center justify-between w-full">
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
                                                x: { type: "spring", stiffness: 300, damping: 30 },
                                                opacity: { duration: 0.2 }
                                            }}
                                            className="lg:text-2xl text-xl font-bold text-center w-full"
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
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{
                                        x: { type: "spring", stiffness: 300, damping: 30 },
                                        opacity: { duration: 0.2 }
                                    }}
                                    className="flex flex-col items-center text-center"
                                >
                                    <p className="font-medium mb-4">{testimonials[currentIndex].name}</p>
                                    <p className="font-light text-[#aaaaaa]">{testimonials[currentIndex].job}</p>
                                </motion.div>
                            </AnimatePresence>
                            <div className="flex gap-2 mt-8">
                                {testimonials.map((_, index) => (
                                    <div
                                        key={index}
                                        className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                                            currentIndex === index ? 'bg-primary' : 'bg-gray-300'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Mobile version with infinite scroll */}
                        <div className="md:hidden w-full">
                            <div
                                ref={scrollContainerRef}
                                className="flex w-full overflow-x-auto snap-x snap-mandatory scroll-container"
                                style={{ WebkitOverflowScrolling: 'touch' }}
                            >
                                <div className="flex w-full flex-nowrap">
                                    {getExtendedTestimonials().map((testimonial, index) => (
                                        <div
                                            key={index}
                                            className="w-full flex-none snap-center"
                                        >
                                            <div className="flex flex-col items-center px-4">
                                                <p className="lg:text-2xl text-xl font-bold text-center mb-8 w-full break-words">
                                                    {testimonial.text}
                                                </p>
                                                <div className="flex flex-col items-center text-center">
                                                    <p className="font-medium mb-4">{testimonial.name}</p>
                                                    <p className="font-light text-[#aaaaaa]">{testimonial.job}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex justify-center gap-2 mt-4">
                                {testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => scrollToSlide(index)}
                                        className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                                            mobileIndex === index ? 'bg-primary' : 'bg-secondary'
                                        }`}
                                        aria-label={`Перейти к отзыву ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default Testimonials;