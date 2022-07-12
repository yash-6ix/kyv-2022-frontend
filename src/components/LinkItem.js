import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';

export const LinkItem = ({ to, title, icon, disabled, onClick }) => {
    const location = useLocation();
    const active = location.pathname === to;

    const content = (
        <>
            {' '}
            {icon && (
                <div className="w-6 fill-current 2xl:w-8 text-brand-neutral-200">
                    {icon}
                </div>
            )}
            <h2 className="font-bold 2xl:text-lg font-heading text-brand-olive-900">
                {title}
            </h2>
            {active && (
                <div className="absolute right-0 w-1 h-full ml-auto bg-brand-olive-900"></div>
            )}
        </>
    );
    const linkClass = `w-full py-3 px-6 flex flex-row transition items-center space-x-6 hover:bg-brand-neutral-50 active:bg-brand-neutral-100 relative ${
        active && 'bg-brand-neutral-50'
    }`;

    return (
        <>
            {disabled ? (
                <button className={linkClass} onClick={onClick}>
                    {content}
                </button>
            ) : (
                <Link to={to} className={linkClass} onClick={onClick}>
                    {content}
                </Link>
            )}
        </>
    );
};
