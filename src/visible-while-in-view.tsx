import { MotionDiv } from "./components/motion-primitives";

export default function VisibleWhileInView() {
    return (
        <MotionDiv
            className="bg-pink mt-100 rounded-lg"
            initial={{
                opacity: 0,
                width: 100,
            }}
            whileInView={{
                opacity: 1,
                width: "100%",
                transition: { duration: 1 },
            }}
            // persist the animation after element in in view
            viewport={{ once: true }}
        >
            Hello
        </MotionDiv>
    );
}
