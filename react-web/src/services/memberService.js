import api from './api';

const list = () => api.get(api.url.member);
const get = (id) => api.get(`${api.url.member}/${id}`);
const getAvatarUrl = (id) => api.get(`${api.url.member}/avatar-url/${id}`);
// const getAvatarBase64 = (id) => api.get(`${api.url.employees}/avatar-base64/${id}`);
// const getAvatar = (id) => api.get(`${api.url.employees}/avatar/${id}`, {
//     responseType: "blob",
// });
const getPaging = (pageNum, PageLength, searchText) => {
    let queryString = `?p=${pageNum}&r=${PageLength}`;
    if (searchText) queryString += `&q=${searchText}`;
    return api.get(`${api.url.pagingmember}/get-paging${queryString}`);
};
const add = (data) => {
    const formData = new FormData();
    for (const key in data) formData.append(key, data[key]);
    return api.post(api.url.member, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
};

const update = (id, data) => {
    const formData = new FormData();
    for (const key in data) formData.append(key, data[key]);
    return api.post(`${api.url.member}/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    })
};


const remove = (id) => api.delete(`${api.url.member}/${id}`);



const memberServices = {
    list,
    get,
    getAvatarUrl,
    getPaging,
    add,
    update,
    delete: remove,
}
export default memberServices;