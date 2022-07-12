import http from '../httpService';

class CommitmentsService {
    async createCommitment(data) {
        try {
            const result = await http
                .post(`/api/commitments`, data)
                .then((res) => res.data);
            return result;
        } catch (ex) {
            return { apierror: ex.response.data };
        }
    }
    async updateCommitment(id, data) {
        try {
            const result = await http
                .put(`/api/commitments/${id}`, data)
                .then((res) => res.data);
            return result;
        } catch (ex) {
            return { apierror: ex.response.data };
        }
    }
    async fetchCommitmentById(id, options = {}) {
        const { populateTopics } = options;

        let url = `/api/commitments/${id}`;
        if (populateTopics === true) url = url + `?populateTopics=true`;

        try {
            const result = await http.get(url).then((res) => res.data);
            return result;
        } catch (ex) {
            return { apierror: ex.response.data };
        }
    }
    async fetchCommitments(options = {}) {
        const { populateTopics } = options;
        let url = `/api/commitments/`;
        if (populateTopics === true) url += '?populateTopics=true';

        try {
            const result = await http.get(url).then((res) => res.data);
            return result;
        } catch (ex) {
            return { apierror: ex.response.data };
        }
    }
    async addTopic(commitmentId, topicId) {
        try {
            const result = await http

                .put(`/api/commitments/add/${commitmentId}/topic`, {
                    topicid: topicId,
                })
                .then((res) => res.data);
            return result;
        } catch (ex) {
            return { apierror: ex.response.data };
        }
    }
    async removeTopic(commitmentId, topicId) {
        try {
            const result = await http
                .put(`/api/commitments/remove/${commitmentId}/topic`, {
                    topicid: topicId,
                })
                .then((res) => res.data);
            return result;
        } catch (ex) {
            return { apierror: ex.response.data };
        }
    }
}
export default new CommitmentsService();
