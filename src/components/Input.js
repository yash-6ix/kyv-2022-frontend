import { motion, useAnimation } from 'framer-motion';
import { useRef, useEffect, useCallback } from 'react';
import { withWrapperDiv } from './withWrapperDiv';

const Input = (props) => {
    const { name, id, label, value, onChange } = props;

    const controls = useAnimation();

    const variants = {
        focus: { y: 0, scale: 0.8 },
        blur: { y: 24, scale: 1 },
    };

    useEffect(() => {
        if (value === '') {
            controls.start('blur');
        } else {
            controls.start('focus');
        }
    }, [value, controls]);

    const onBlur = () => {
        if (!value) controls.start('blur');
    };
    const onFocus = useCallback(() => {
        controls.start('focus');
    }, [controls]);

    /**
     * deals with field labels not animating when autofill occurs
     */
    const inputRef = useRef(null);
    useEffect(() => {
        if (!inputRef.current) return;
        inputRef.current.addEventListener('onautocomplete', onFocus);
    }, [inputRef, onFocus]);
    return (
        <>
            <label htmlFor={id} className="sr-only">
                {label}
            </label>
            <motion.h3
                initial="blur"
                animate={controls}
                variants={variants}
                transition={{ duration: 0.16 }}
                style={{ originX: 0 }}
                className="text-sm pointer-events-none text-brand-neutral-400 font-body"
            >
                {label}
            </motion.h3>
            {/* <input
                {...props}
                onFocus={onFocus}
                onBlur={onBlur}
                ref={inputRef}
                className="w-full h-full bg-transparent border-b border-brand-neutral-100 focus:outline-none text-brand-neutral-600 font-body"
                // value={value}
                // name={name}
                // id={id}
                // onChange={onChange}
            /> */}
            <input
                {...props}
                onFocus={onFocus}
                onBlur={onBlur}
                ref={inputRef}
                className="w-full h-full bg-transparent border-b border-brand-neutral-100 focus:outline-none text-brand-neutral-600 font-body"
                // value={value}
                name={name}
                id={id}
                onChange={onChange}
                value={value}
            ></input>
        </>
    );
};

export default withWrapperDiv(Input);
