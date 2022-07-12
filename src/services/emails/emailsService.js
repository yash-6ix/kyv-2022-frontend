import http from "../httpService";

class EmailsService {
    async fetchClientEmails(clientid) {
        try {
            const result = await http
                .get(`/api/emails?clientid=${clientid}`)
                .then((res) => res.data);
            return result;
        } catch (ex) {
            return { apierror: ex.response.data };
        }
    }
    async getEmail(emailid) {
        try {
            const result = await http.get(`/api/emails/${emailid}`).then((res) => res.data);
            return result;
        } catch (ex) {
            return { apierror: ex.response.data };
        }
    }
    async getUpdatesInEmail(emailid) {
        try {
            const result = await http.get(`/api/emails/${emailid}`).then((res) => res.data);

            const updates = result.updates.map(({ id, type, showimg }) => ({
                ...id,
                updateType: type,
                showimg,
            }));

            return updates;
        } catch (ex) {
            return { apierror: ex.response.data };
        }
    }
    async createEmail(name, subject, preview, topbody, topbody2, img, clientid) {
        try {
            const result = await http
                .post(`/api/emails/`, {
                    name,
                    clientid: clientid,
                    subject,
                    preview,
                    topbody,
                    topbody2,
                    img,
                })
                .then((res) => res.data);
            return result;
        } catch (ex) {
            return { apierror: ex.response.data };
        }
    }
    async updateEmail(id, data) {
        try {
            const result = await http.put(`/api/emails/${id}`, data).then((res) => res.data);
            return result;
        } catch (ex) {
            return { apierror: ex.response.data };
        }
    }
    async addUpdateType(emailid, type) {
        try {
            const result = await http
                .post(`/api/emails/update-type/add/${emailid}`, {
                    type: type,
                })
                .then((res) => res.data);
            return result;
        } catch (ex) {
            return { apierror: ex.response.data };
        }
    }
    async removeUpdateType(emailid, type) {
        try {
            const result = await http
                .post(`/api/emails/update-type/remove/${emailid}`, {
                    type: type,
                })
                .then((res) => res.data);
            return result;
        } catch (ex) {
            return { apierror: ex.response.data };
        }
    }

    async sendTestEmail(emailid, type, data) {
        try {
            const result = await http
                .post(`/api/emails/send-campaign/${type}/${emailid}`, data)
                .then((res) => res.data);
            return result;
        } catch (ex) {
            return { apierror: ex.response.data };
        }
    }
    async toggleShowImage(emailId, sectionId, updateId) {
        try {
            const result = await http
                .put(`/api/emails/toggle-update-img/${emailId}/${sectionId}`, {
                    updateid: updateId,
                })
                .then((res) => res.data);
            return result;
        } catch (ex) {
            return { apierror: ex.response.data };
        }
    }
    async addSection(emailId, sectionName) {
        try {
            console.log(sectionName);
            const result = await http
                .put(`/api/emails/addsection/${emailId}`, {
                    sectionName: sectionName,
                })
                .then((res) => res.data);
            return result;
        } catch (ex) {
            return { apierror: ex.response.data };
        }
    }
    async addUpdate(emailId, sectionId, updateId, showimg) {
        try {
            const result = await http
                .put(`/api/emails/section/addupdate/${emailId}`, {
                    sectionid: sectionId,
                    updateid: updateId,
                    showimg: showimg,
                })
                .then((res) => res.data);
            return result;
        } catch (ex) {
            return { apierror: ex.response.data };
        }
    }
    async removeUpdate(emailid, sectionId, updateId) {
        console.log(sectionId, updateId);
        try {
            const result = await http
                .put(`/api/emails/section/removeupdate/${emailid}`, {
                    sectionid: sectionId,
                    updateid: updateId,
                })
                .then((res) => res.data);
            return result;
        } catch (ex) {
            return { apierror: ex.response.data };
        }
    }
    async removeSection(emailId, sectionId) {
        try {
            const result = await http
                .put(`/api/emails/removesection/${emailId}`, {
                    sectionid: sectionId,
                })
                .then((res) => res.data);
            return result;
        } catch (ex) {
            return { apierror: ex.response.data };
        }
    }

    async sendEmailCampaign(data) {
        try {
            const result = await http
                .post(`/api/emails/schedule-email`, data)
                .then((res) => res.data);
            return result;
        } catch (ex) {
            return { apierror: ex.response.data };
        }
    }
    async reorderUpdate(emailid, sectionId, updateId, newIdx) {
        try {
            const result = await http
                .put(`/api/emails/reorder/update/${emailid}`, {
                    sectionid: sectionId,
                    updateid: updateId,
                    newIdx: newIdx,
                })
                .then((res) => res.data);
            return result;
        } catch (ex) {
            return { apierror: ex.response.data };
        }
    }
    async reorderSection(emailId, sectionId, newIdx) {
        try {
            const result = await http
                .put(`/api/emails/reorder/section/${emailId}`, {
                    sectionid: sectionId,
                    newIdx: newIdx,
                })
                .then((res) => res.data);
            return result;
        } catch (ex) {
            return { apierror: ex.response.data };
        }
    }
}

//
export default new EmailsService();
