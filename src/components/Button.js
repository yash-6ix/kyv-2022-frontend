import { withWrapperDiv } from './withWrapperDiv';
const SIZE_MAP = {
    sm: 'px-3 py-1 text-base',
    md: 'px-6 py-3 text-xl',
};

export const Button = withWrapperDiv(
    ({
        children,
        onClick,
        size = 'md',
        disabled = false,
        className,
        ...restProps
    }) => {
        const sizeClass = SIZE_MAP[size];

        return (
            <button
                {...restProps}
                onClick={onClick}
                disabled={disabled}
                className={` bg-brand-olive-900 hover:bg-brand-olive-800 transition transform hover:scale-105 active:scale-100 border-brand-bronze-500 flex flex-row items-center ${sizeClass} self-start font-bold transform border-b-4 rounded-lg  text-brand-white  font-heading ${
                    !!disabled &&
                    'cursor-default transform-none transition-none bg-brand-neutral-500 hover:bg-brand-neutral-500 border-brand-neutral-600'
                }`}
            >
                {children}
            </button>
        );
    }
);
