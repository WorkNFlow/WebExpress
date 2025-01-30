import { motion, useInView, useAnimation } from 'framer-motion';
import { useEffect, useRef, Children, isValidElement, cloneElement } from 'react';

const Typewriter = ({ children, className = '', speed = 0.05 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        } else {
            controls.start("hidden");
        }
    }, [isInView, controls]);

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: speed,
            },
        },
    };

    const child = {
        hidden: {
            opacity: 0,
            x: -20,
        },
        visible: {
            opacity: 1,
            x: 0,
        },
    };

    const processNode = (node) => {
        // Если это JSX элемент
        if (isValidElement(node)) {
            return cloneElement(node, {
                key: Math.random(),
                className: `${node.props.className || ''} ${className}`,
                style: {
                    ...node.props.style,
                    display: 'inline-block'
                }
            });
        }

        // Если это текст, разбиваем его на слова
        if (typeof node === 'string') {
            return node.split(/(\s+)/).map((word, index) => (
                <motion.span
                    key={index}
                    variants={child}
                    className={className}
                    style={{ display: 'inline-block', whiteSpace: 'pre' }}
                >
                    {word}
                </motion.span>
            ));
        }

        return null;
    };

    const processChildren = (children) => {
        return Children.map(children, child => processNode(child));
    };

    return (
        <motion.div
            ref={ref}
            variants={container}
            initial="hidden"
            animate={controls}
        >
            {processChildren(children)}
        </motion.div>
    );
};

export default Typewriter;