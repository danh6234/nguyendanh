import api from './api';

const list = () => api.get(api.url.codeforall);
const get = (id) => api.get(`${api.url.codeforall}/${id}`);

const add = (data) => {
    const formData = new FormData();
    for (const key in data) formData.append(key, data[key]);
    return api.post(api.url.codeforall, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
};


const update = (id, data) => {
    const formData = new FormData();
    for (const key in data) formData.append(key, data[key]);
    return api.post(`${api.url.codeforall}/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    })
};



const remove = (id) => api.delete(`${api.url.codeforall}/${id}`);

const codeforallServices = {
    list,
    get,
    add,
    update,
    delete: remove,
}
export default codeforallServices;