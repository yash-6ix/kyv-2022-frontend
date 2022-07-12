export const AdminLayout = ({ children }) => {
    return (
        <div className="flex flex-col items-center flex-1 bg-brand-neutral-25">
            <main className="flex flex-col w-full max-w-5xl p-6 pb-64">
                {children}
            </main>
        </div>
    );
};
