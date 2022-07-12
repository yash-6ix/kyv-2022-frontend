import { useHistory, useParams } from 'react-router';
import { PlusSVG, SettingsSVG } from '../../../components/SVG';
import clientsService from '../../../services/clients/clientsService';
import { useEffect, useState } from 'react';
import emailsService from '../../../services/emails/emailsService';
import { AdminLayout } from '../AdminLayout';
const Client = () => {
    const { clientId } = useParams();
    const [client, setClient] = useState(null);
    const [clientEmails, setClientEmails] = useState([]);
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        (async () => {
            setClient(await clientsService.fetchClientById(clientId));
            setClientEmails(await emailsService.fetchClientEmails(clientId));

            setLoading(false);
        })();
    }, [clientId]);

    return (
        <AdminLayout>
            {!loading && (
                <>
                    <h1 className="py-12 text-4xl border-b border-brand-neutral-100 font-heading">
                        {client.name}
                    </h1>
                    {client.logo &&
                        <div style={{ width: 200, height: 180 }}>
                            <img src={client.logo} alt="logo" />
                        </div>
                    }
                    <div className="flex flex-row py-2 mb-2 space-x-2 border-b border-brand-neutral-100">
                        <Button
                            onClick={() =>
                                history.push(
                                    `/admin/client/${clientId}/edit-email`
                                )
                            }
                        >
                            New Email Campaign
                            <PlusSVG className="w-5 h-5 ml-4 fill-current text-brand-white" />
                        </Button>
                        <Button>All Emails</Button>
                        <Button>Email Analytics</Button>
                        <Button>
                            <SettingsSVG className="w-5 h-5 fill-current text-brand-white" />
                        </Button>
                    </div>
                    <section className="space-y-4">
                        {clientEmails &&
                            clientEmails.length > 0 &&
                            clientEmails.map(({ name, status, _id }) => {
                                return (
                                    <Email
                                        title={name}
                                        status={status}
                                        key={_id}
                                        onClick={() =>
                                            history.push(
                                                `/admin/client/${clientId}/edit-email?emailId=${_id}`
                                            )
                                        }
                                    />
                                );
                            })}
                    </section>
                </>
            )}
        </AdminLayout>
    );
};

const Email = ({ title, status, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="relative w-full h-40 p-6 text-left rounded-lg shadow-lg bg-brand-white"
        >
            <h1 className="text-3xl tracking-wider font-heading">{title}</h1>
            <h2 className="text-md font-body text-brand-neutral">
                Scheduled for: Aug 30th, 2021 - 7 PM
            </h2>
            <EmailStatusBadge status={status} />
        </button>
    );
};

const EDB_STATUS_COLOR_MAPS = {
    schedule: 'bg-brand-bronze-400',
    draft: 'bg-red-500',
    sent: 'bg-brand-olive-600',
};
const EDB_STATUS_MAPS = {
    schedule: 'Scheduled',
    draft: 'Drafted',
    sent: 'Sent',
};

const EmailStatusBadge = ({ status }) => {
    return (
        <div
            className={`absolute top-0 right-0 px-3 py-1 ${EDB_STATUS_COLOR_MAPS[status]} rounded-tr-lg rounded-bl-lg font-body text-brand-white`}
        >
            {EDB_STATUS_MAPS[status]}
        </div>
    );
};

const Button = ({ children, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="flex flex-row items-center px-6 py-3 text-xl font-bold transform border-b-4 rounded-lg border-brand-bronze-500 text-brand-white bg-brand-olive-900 font-heading hover:bg-brand-olive-800 hover:scale-105 active:scale-100"
        >
            {children}
        </button>
    );
};

export default Client;
