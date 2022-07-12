import http from '../httpService';

class CandidatesService {
    async fetchCandidates() {
        try {
            const result = await http.get('/api/candidates')
            .then((res) => res.data);
            return result
        } catch (ex) {
            return { apierror: ex.response.data };
        }
    }
}

export default new CandidatesService();
