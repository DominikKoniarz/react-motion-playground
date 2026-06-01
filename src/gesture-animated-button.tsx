import { MotionButton } from "./components/motion-primitives";

export default function GestureAnimatedButton() {
    return (
        <MotionButton
            className="bg-pink size-20 cursor-pointer rounded-lg text-sm"
            whileHover={{ scale: 1.1, transition: { duration: 0.15 } }}
            whileTap={{ scale: 0.9, transition: { duration: 0.15 } }}
        >
            Click me!
        </MotionButton>
    );
}
