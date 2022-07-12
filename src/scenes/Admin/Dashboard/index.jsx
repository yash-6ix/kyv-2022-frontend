import React, { useEffect, useState } from 'react';
import { PlusSVG } from '../../../components/SVG';
import clientsService from '../../../services/clients/clientsService';
import { useHistory } from 'react-router';
import { AdminLayout } from '../AdminLayout';

const AdminDashboard = () => {
    const history = useHistory();
    const [clients, setClients] = useState(null);
    useEffect(() => {
        (async () => {
            setClients(await clientsService.fetchAllClients());
        })();
    }, []);

    return (
        <AdminLayout>
            <h1 className="py-12 text-4xl border-b border-brand-neutral-100 font-heading">
                All Clients
            </h1>
            <div className="grid w-full grid-cols-3 gap-4 mt-2">
                {/* {clients &&
                    clients.map(({ name, _id }) => {
                        return (
                            <ClientButton
                                key={_id}
                                name={name}
                                // client={client}
                                onClick={() =>
                                    history.push(`/admin/client/${_id}`)
                                }
                            />
                        );
                    })} */}
                <NewClientButton />
            </div>
        </AdminLayout>
    );
};

const ClientButton = ({ name, client, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="flex flex-col items-start w-full h-48 p-6 transition transform border-b-4 rounded-lg shadow-lg hover:scale-105 text-brand-white hover:text-brand-white bg-brand-olive-900 border-brand-bronze-500 hover:bg-brand-olive-800 active:scale-100"
        >
            <h1 className="text-3xl font-bold text-left font-heading">
                {name}
            </h1>
            <h2 className="text-xl tracking-tight text-left font-body text-brand-neutral-200">
                {client}
            </h2>
        </button>
    );
};

const NewClientButton = () => {
    const history = useHistory();
    return (
        <button
            onClick={() => {
                history.push('/admin/client/new');
            }}
            className="flex flex-col items-center justify-center w-full h-48 transition transform border-b-4 rounded-lg shadow-lg border-brand-neutral-100 hover:scale-105 bg-brand-white active:bg-brand-neutral-50 active:scale-100"
        >
            <h1 className="mb-4 text-2xl font-bold tracking-tight text-bold font-heading text-brand-olive-900">
                New Client
            </h1>
            <PlusSVG className="w-5 h-5 fill-current text-brand-olive-900" />
        </button>
    );
};

export default AdminDashboard;
