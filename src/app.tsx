import Draggable from "./dragable";
import GestureAnimatedButton from "./gesture-animated-button";
import RotatingSquare from "./rotating-square";
import ScrollProgressBar from "./scroll-progress-bar";
import VisibleWhileInView from "./visible-while-in-view";

export default function App() {
    return (
        <div className="h-[1500px] space-y-10 bg-slate-800">
            <ScrollProgressBar />

            <div className="container space-y-10 py-20">
                <RotatingSquare />

                <GestureAnimatedButton />

                <Draggable />

                {/* <Reordable /> */}

                <VisibleWhileInView />
            </div>
        </div>
    );
}
