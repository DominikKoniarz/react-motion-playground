import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const INTERVAL_DURATION = 10000;

export default function RotatingSquare() {
    const [mount, setMount] = useState(true);

    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const onMountButtonClick = () => {
        setMount((prev) => !prev);

        if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        // reschedule the interval
        timerRef.current = setInterval(() => {
            setMount((prev) => !prev);
        }, INTERVAL_DURATION);
    };

    useEffect(() => {
        timerRef.current = setInterval(() => {
            setMount((prev) => !prev);
        }, INTERVAL_DURATION);

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []);

    return (
        <div className="flex flex-col items-start gap-y-8">
            <button
                type="button"
                onClick={onMountButtonClick}
                className="cursor-pointer rounded-lg bg-teal-500 px-4 py-2"
            >
                {mount ? "Unmount" : "Mount"}
            </button>

            <AnimatePresence>
                {mount && (
                    <motion.div
                        initial={{ opacity: 0.3, rotate: 0, scale: 0.5 }}
                        exit={{
                            rotate: 0,
                            scale: 0.5,
                            opacity: 0,
                            transition: {
                                duration: 0.5,
                                ease: "easeIn",
                            },
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            rotate: 360,
                            transition: {
                                duration: 1,
                                ease: "easeInOut",
                            },
                        }}
                        className="size-20 rounded-lg bg-pink-500"
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
