import { useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { MotionDiv } from "./components/motion-primitives";

const INTERACTIVE_SELECTOR =
    "a, button, input, textarea, select, label, [role='button'], [data-cursor='pointer']";

const CURSOR_SIZE = 8;
const CURSOR_Z_INDEX = 10;
const HOVERED_INTERACTIVE_Z_INDEX = 20;
const MAX_POINTER_OFFSET = 5;

type SavedElementStyles = {
    zIndex: string;
    position: string;
};

export default function CustomCursor() {
    // const [enabled] = useState(
    //     () =>
    //         typeof window !== "undefined" &&
    //         window.matchMedia("(pointer: fine)").matches,
    // );

    const lastInteractiveRef = useRef<HTMLElement | null>(null);
    const savedStylesRef = useRef<SavedElementStyles | null>(null);

    const targetX = useMotionValue(-100);
    const targetY = useMotionValue(-100);
    const offsetTargetX = useMotionValue(0);
    const offsetTargetY = useMotionValue(0);
    const targetW = useMotionValue(CURSOR_SIZE);
    const targetH = useMotionValue(CURSOR_SIZE);
    const hovering = useMotionValue(0);

    const x = useSpring(targetX, { stiffness: 450, damping: 28 });
    const y = useSpring(targetY, { stiffness: 450, damping: 28 });
    const offsetX = useSpring(offsetTargetX, { stiffness: 350, damping: 20 });
    const offsetY = useSpring(offsetTargetY, { stiffness: 350, damping: 20 });
    const width = useSpring(targetW, { stiffness: 450, damping: 28 });
    const height = useSpring(targetH, { stiffness: 450, damping: 28 });

    const displayX = useTransform(
        () => x.get() + offsetX.get() * hovering.get(),
    );
    const displayY = useTransform(
        () => y.get() + offsetY.get() * hovering.get(),
    );

    const backgroundColor = useTransform(
        hovering,
        [0, 1],
        // ["#f472b6", "#facc15"],
        ["#f472b6", "#f472b6f0"], // from full opacity to 50% opacity
    );
    const borderRadius = useTransform(hovering, [0, 1], [9999, 8]);

    useEffect(() => {
        document.documentElement.classList.add("custom-cursor-active");

        const restoreInteractive = () => {
            const element = lastInteractiveRef.current;
            const saved = savedStylesRef.current;
            if (!element || !saved) return;

            if (saved.zIndex) element.style.zIndex = saved.zIndex;
            else element.style.removeProperty("z-index");

            if (saved.position) element.style.position = saved.position;
            else element.style.removeProperty("position");

            lastInteractiveRef.current = null;
            savedStylesRef.current = null;
        };

        const elevateInteractive = (element: HTMLElement) => {
            if (lastInteractiveRef.current === element) return;

            restoreInteractive();

            savedStylesRef.current = {
                zIndex: element.style.zIndex,
                position: element.style.position,
            };

            if (getComputedStyle(element).position === "static") {
                element.style.position = "relative";
            }

            element.style.zIndex = String(HOVERED_INTERACTIVE_Z_INDEX);
            lastInteractiveRef.current = element;
        };

        const clampOffset = (value: number) =>
            Math.max(-MAX_POINTER_OFFSET, Math.min(MAX_POINTER_OFFSET, value));

        const onMove = (event: MouseEvent) => {
            const target = document.elementFromPoint(
                event.clientX,
                event.clientY,
            );
            const interactive = target?.closest(INTERACTIVE_SELECTOR);

            if (interactive instanceof HTMLElement) {
                elevateInteractive(interactive);

                const rect = interactive.getBoundingClientRect();
                const cursorXRelativeToInteractive = event.clientX - rect.left;
                const cursorYRelativeToInteractive = event.clientY - rect.top;

                targetX.set(rect.left + rect.width / 2);
                targetY.set(rect.top + rect.height / 2);
                offsetTargetX.set(
                    clampOffset(cursorXRelativeToInteractive - rect.width / 2),
                );
                offsetTargetY.set(
                    clampOffset(cursorYRelativeToInteractive - rect.height / 2),
                );
                targetW.set(rect.width + 10);
                targetH.set(rect.height + 10);
                hovering.set(1);
            } else {
                restoreInteractive();

                targetX.set(event.clientX);
                targetY.set(event.clientY);
                offsetTargetX.set(0);
                offsetTargetY.set(0);
                targetW.set(CURSOR_SIZE);
                targetH.set(CURSOR_SIZE);
                hovering.set(0);
            }
        };

        const onMouseDown = (event: MouseEvent) => {
            const target = document.elementFromPoint(
                event.clientX,
                event.clientY,
            );

            const interactive = target?.closest(INTERACTIVE_SELECTOR);

            if (interactive) {
                return;
            }
            // add little animation to the cursor
            width.set(CURSOR_SIZE * 1.5);
            height.set(CURSOR_SIZE * 1.5);
        };

        const onMouseUp = (event: MouseEvent) => {
            const target = document.elementFromPoint(
                event.clientX,
                event.clientY,
            );

            const interactive = target?.closest(INTERACTIVE_SELECTOR);

            if (interactive) {
                return;
            }

            width.set(CURSOR_SIZE);
            height.set(CURSOR_SIZE);
        };

        window.addEventListener("mousemove", onMove);
        window.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mouseup", onMouseUp);

        return () => {
            restoreInteractive();

            document.documentElement.classList.remove("custom-cursor-active");

            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("mouseup", onMouseUp);
        };
    }, [
        hovering,
        offsetTargetX,
        offsetTargetY,
        targetH,
        targetW,
        targetX,
        targetY,
        width,
        height,
    ]);

    return (
        <MotionDiv
            className="pointer-events-none fixed top-0 left-0"
            style={{
                zIndex: CURSOR_Z_INDEX,
                x: displayX,
                y: displayY,
                width,
                height,
                backgroundColor,
                borderRadius,
                translateX: "-50%",
                translateY: "-50%",
            }}
        />
    );
}
