import { motion } from "framer-motion";

export default function AnimatedPage({children}) {
    const animations = {
        initial: {opacity: 0, y: 100},
        animate: {opacity: 1, y: 0},
        exit: {opacity: 0, y: -100},
    };

    return (
        <motion.div
            variants={animations}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{duration: 0.5}}
        >
            {children}
        </motion.div>
    );
};