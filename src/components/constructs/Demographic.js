export const Demographic = ({ name, value }) => {
    return (
        <div className="flex flex-row items-center px-6 py-2 space-x-2 border-b border-brand-neutral-100">
            <h3 className="w-1/2 font-heading text-brand-neutral-600">
                {name}
            </h3>
            <div className="w-1/2 px-3 py-1 ml-auto border rounded-lg border-brand-neutral-100">
                <h4 className="text-center font-heading text-brand-black">
                    {value}
                </h4>
            </div>
        </div>
    );
};
