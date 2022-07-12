import { useRef, useEffect } from 'react';
export const OutsideClick = ({
    children,
    onClickOutside,
    show,
    ...restProps
}) => {
    const modalRef = useRef(null);

    const handleOutsideClick = useRef((e) => {
        if (!modalRef.current.contains(e.target)) {
            onClickOutside();
        }
    }).current;

    useEffect(() => {
        if (show) {
            document.addEventListener('mousedown', handleOutsideClick, false);
        } else {
            document.removeEventListener(
                'mousedown',
                handleOutsideClick,
                false
            );
        }
        return () => {
            document.removeEventListener(
                'mousedown',
                handleOutsideClick,
                false
            );
        };
    }, [show, handleOutsideClick]);

    return (
        <div {...restProps} ref={modalRef}>
            {children}
        </div>
    );
};
