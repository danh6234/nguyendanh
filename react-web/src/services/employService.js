import api from './api';

const list = () => api.get(api.url.employees);
const get = (id) => api.get(`${api.url.employees}/${id}`);
const getAvatarUrl = (id) => api.get(`${api.url.employees}/avatar-url/${id}`);
// const getAvatarBase64 = (id) => api.get(`${api.url.employees}/avatar-base64/${id}`);
// const getAvatar = (id) => api.get(`${api.url.employees}/avatar/${id}`, {
//     responseType: "blob",
// });
const getPaging = (pageNum, PageLength, searchText) => {
    let queryString = `?p=${pageNum}&r=${PageLength}`;
    if (searchText) queryString += `&q=${searchText}`;
    return api.get(`${api.url.pagingemployee}/get-paging${queryString}`);
};
const add = (data) => {
    const formData = new FormData();
    for (const key in data) formData.append(key, data[key]);
    return api.post(api.url.employees, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
};

const update = (id, data) => {
    const formData = new FormData();
    for (const key in data) formData.append(key, data[key]);
    return api.post(`${api.url.employees}/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    })
};


const remove = (id) => api.delete(`${api.url.employees}/${id}`);

const downloadAvatar = (id) => api.get(`${api.url.employees}/download-avatar/${id}`, {
    responseType: "blob",
});

const employService = {
    list,
    get,
    getAvatarUrl,
    // getAvatarBase64,
    // getAvatar,
    downloadAvatar,
    getPaging,
    add,
    update,
    delete: remove,
}
export default employService;