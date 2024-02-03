import api from './api';

const list = () => api.get(api.url.productcategory);
const get = (id) => api.get(`${api.url.productcategory}/${id}`);

const add = (data) => {
    const formData = new FormData();
    for (const key in data) formData.append(key, data[key]);
    return api.post(api.url.productcategory, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
};

const getPaging = (pageNum, PageLength, searchText) => {
    let queryString = `?p=${pageNum}&r=${PageLength}`;
    if (searchText) queryString += `&q=${searchText}`;
    return api.get(`${api.url.productcategory}/get-paging${queryString}`);
};

const update = (id, data) => api.put(`${api.url.productcategory}/${id}`, data).then((res) => (res));


const remove = (id) => api.delete(`${api.url.productcategory}/${id}`);

const productcategoryServices = {
    list,
    getPaging,
    get,
    add,
    update,
    delete: remove,
}
export default productcategoryServices;