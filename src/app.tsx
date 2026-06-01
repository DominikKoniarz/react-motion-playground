import Draggable from "./dragable";
import GestureAnimatedButton from "./gesture-animated-button";
import RotatingSquare from "./rotating-square";
import ScrollProgressBar from "./scroll-progress-bar";

export default function App() {
    return (
        <div className="h-[3000px] space-y-10 bg-slate-800">
            <ScrollProgressBar />

            <div className="container space-y-10 py-20">
                <RotatingSquare />

                <GestureAnimatedButton />

                <Draggable />
            </div>
        </div>
    );
}
