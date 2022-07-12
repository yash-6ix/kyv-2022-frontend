import { motion, AnimatePresence } from 'framer-motion';
import { ArrowSVG } from '../SVG';
import { useState } from 'react';

export const Dropdown = ({ name, children }) => {
    const [active, setActive] = useState(true);
    return (
        <div className="mb-2">
            <button
                onClick={() => setActive(!active)}
                className="flex flex-row items-center w-full px-6 py-1 transition bg-black hover:bg-brand-neutral-800 active:bg-brand-neutral-700"
            >
                <h2 className="text-base font-bold tracking-wide text-white 2xl:text-lg font-heading">
                    {name}
                </h2>
                <ArrowSVG
                    className={`fill-current text-white w-4 ml-auto transform ${
                        !active && 'rotate-180'
                    }`}
                />
            </button>
            <div className="overflow-hidden">
                <AnimatePresence>
                    {/* this is an expensive way of animating height, room for improvement */}
                    {active && (
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                            {children}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
