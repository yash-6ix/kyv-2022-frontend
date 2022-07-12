import http from '../httpService';

class ClientsService {
    async fetchAllClients() {
        try {
            const result = await http
                .get('/api/clients')
                .then((res) => res.data);
            return result;
        } catch (ex) {
            return { apierror: ex.response.data };
        }
    }
    async fetchClientById(id) {
        try {
            const result = await http
                .get(`/api/clients/${id}`)
                .then((res) => res.data);
            return result;
        } catch (ex) {
            return { apierror: ex.response.data };
        }
    }

    async createClient(data) {
        try {
            const result = await http.post(`/api/clients`, data).then((res) => res.data);
            return result;
        } catch (ex) {
            return { apierror: ex.response.data };
        }
    }
}

export default new ClientsService();
