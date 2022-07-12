export const withWrapperDiv = (Component) => {
    const WithWrapperDiv = ({ wrapperClassName, ...restProps }) => {
        return (
            <div className={wrapperClassName}>
                <Component {...restProps} />
            </div>
        );
    };
    return WithWrapperDiv;
};
