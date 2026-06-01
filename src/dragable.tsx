import { useRef } from "react";
import { MotionDiv } from "./components/motion-primitives";

export default function Draggable() {
    const containerRef = useRef(null);

    return (
        <MotionDiv ref={containerRef} className="bg-pink/50 size-60 rounded-lg">
            <MotionDiv
                className="bg-pink size-20 rounded-lg"
                drag
                dragMomentum={false}
                dragConstraints={containerRef}
                dragElastic={0.05}
            />
        </MotionDiv>
    );
}
