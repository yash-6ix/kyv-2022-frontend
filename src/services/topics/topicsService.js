import http from '../httpService';

class TopicsService {
    async getAllTopics() {
        try {
            const result = await http
                .get('/api/topics')
                .then((res) => res.data);
            return result;
        } catch (ex) {
            return { apierror: ex.response.data };
        }
    }
    async findTopic(topicId) {
        try {
            const result = await http
                .get(`/api/topics/${topicId}`)
                .then((res) => res.data);
            return result;
        } catch (ex) {
            return { apierror: ex.response.data };
        }
    }
    async findTopicBySlug(slug) {
        try {
            const result = await http
                .get(`/api/topics/slug/${slug}`)
                .then((res) => res.data);
            return result;
        } catch (ex) {
            return { apierror: ex.response.data };
        }
    }
    async createTopic(input) {
        console.log(input);
        try {
            const result = await http
                .post(`/api/topics/`, input)
                .then((res) => res.data);
            return result;
        } catch (ex) {
            return { apierror: ex.response.data };
        }
    }
    async addTopic(updateId, topicId) {
        try {
            const result = await http
                .put(`/api/updates/add/${updateId}`, {
                    topicid: topicId,
                })
                .then((res) => res.data);
            return result;
        } catch (ex) {
            return { apierror: ex.response.data };
        }
    }
    async removeTopic(updateId, topicId) {
        try {
            const result = await http
                .put(`/api/updates/remove/${updateId}`, {
                    topicid: topicId,
                })
                .then((res) => res.data);
            return result;
        } catch (ex) {
            return { apierror: ex.response.data };
        }
    }
}

export default new TopicsService();
