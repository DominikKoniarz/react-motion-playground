import { AnimatePresence, Reorder } from "motion/react";
import { useRef, useState } from "react";

export default function Reordable() {
    const [items, setItems] = useState([0, 1, 2, 3]);

    const containerRef = useRef(null);

    return (
        <div className="flex h-fit w-full flex-col gap-y-4 p-4">
            <button
                type="button"
                className="bg-pink w-fit cursor-pointer rounded-lg px-4 py-2 text-sm"
                onClick={() =>
                    setItems((prev) =>
                        prev.length ? [...prev, Math.max(...prev) + 1] : [0],
                    )
                }
            >
                Add Item
            </button>
            <Reorder.Group
                axis="y"
                values={items}
                onReorder={setItems}
                className="flex w-fit min-w-40 flex-col gap-y-2"
                ref={containerRef}
            >
                <AnimatePresence>
                    {items.map((item) => (
                        <Reorder.Item
                            key={item}
                            value={item}
                            drag
                            dragConstraints={containerRef}
                            // dragMomentum={false}
                            // dragElastic={0}
                            // dragSnapToOrigin
                            className="bg-pink/80 flex w-full max-w-50 touch-none items-center justify-between rounded p-2 select-none"
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, y: 0, x: 0 }}
                            exit={{
                                x: "-100%",
                                opacity: 0,
                                transition: {
                                    duration: 0.075,
                                },
                            }}
                        >
                            {item}
                            <button
                                type="button"
                                className="bg-pink/80 cursor-pointer rounded p-1 text-sm"
                                onClick={() =>
                                    setItems(items.filter((i) => i !== item))
                                }
                            >
                                Remove
                            </button>
                        </Reorder.Item>
                    ))}
                </AnimatePresence>
            </Reorder.Group>
        </div>
    );
}
