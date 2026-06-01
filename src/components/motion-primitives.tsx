import { motion } from "motion/react";

export function MotionDiv(props: Parameters<typeof motion.div>[0]) {
    return <motion.div {...props} />;
}

export function MotionButton(props: Parameters<typeof motion.button>[0]) {
    return <motion.button {...props} />;
}

export function MotionLink(props: Parameters<typeof motion.a>[0]) {
    return <motion.a {...props} />;
}
