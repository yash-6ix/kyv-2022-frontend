import http from '../httpService';

class UpdatesService {
    async fetchUpdates(query = {}, options = {}) {
        const { populateTopics } = options;
        const { topicId } = query;

        let url = `/api/updates?`;
        if (topicId) url = url + `&topicId=${topicId}`;
        if (populateTopics) url = url + `&populateTopics=true`;

        try {
            const result = await http.get(url).then((res) => res.data);
            return result;
        } catch (ex) {
            return { apierror: ex.response.data };
        }
    }
    async putUpdate(id, data) {
        try {
            const result = await http
                .put(`/api/updates/${id}`, data)
                .then((res) => res.data);
            return result;
        } catch (ex) {
            return { apierror: ex.response.data };
        }
    }
    async fetchUpdateById(id, options = {}) {
        const { populateTopics } = options;

        let url = `/api/updates/${id}`;
        if (populateTopics === true) url = url + `?populateTopics=true`;

        try {
            const result = await http.get(url).then((res) => res.data);
            return result;
        } catch (ex) {
            return { apierror: ex.response.data };
        }
    }
    async createUpdate(data) {
        try {
            const result = await http
                .post(`/api/updates`, data)
                .then((res) => res.data);
            return result;
        } catch (ex) {
            return { apierror: ex.response.data };
        }
    }
    async deleteUpdate(updateId) {
        console.log("service call to delete")
        try {
            const result = await http
                .post(`/api/updates/delete`, {updateid: updateId})
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

export default new UpdatesService();
