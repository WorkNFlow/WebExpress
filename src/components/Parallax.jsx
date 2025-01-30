import { useEffect } from 'react';

const useParallax = () => {
    useEffect(() => {
        const handleScroll = () => {
            const parallaxImages = document.querySelectorAll('.parallax-image');
            parallaxImages.forEach((image) => {
                const speed = -0.5;
                const offset = window.pageYOffset * speed;
                image.style.transform = `translateY(${offset}px) translateZ(-1px) scale(1)`;
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
};

export default useParallax;