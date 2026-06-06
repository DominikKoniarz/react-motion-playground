import { useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { MotionDiv } from "./components/motion-primitives";

export default function ScrollLinkedText() {
    const scrollingTextRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress: scrollingTextProgress } = useScroll({
        target: scrollingTextRef,
        offset: ["start end", "end start"],
    });

    const scrollingTextX = useTransform(
        scrollingTextProgress,
        [0, 1],
        ["-50%", "100%"],
    );

    const smoothScrollingTextX = useSpring(scrollingTextX, {
        stiffness: 150,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <div
            ref={scrollingTextRef}
            className="bg-pink mt-10 overflow-visible rounded-lg py-2"
        >
            <MotionDiv
                className="px-4 whitespace-nowrap"
                style={{ x: smoothScrollingTextX }}
            >
                Hello, I am scrolling from left to right
            </MotionDiv>
        </div>
    );
}
