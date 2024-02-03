import api from './api';

const get = () => api.get(`${api.url.profile}`);
const update = (id, data) => {
    const formData = new FormData();
    for (const key in data) formData.append(key, data[key]);
    return api.post(`${api.url.updateprofile}/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    })
};

const profileEmployservice = {
    get,
    update,
}
export default profileEmployservice;