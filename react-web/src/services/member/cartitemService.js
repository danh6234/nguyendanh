import  api from './api';
const get = (id) => api.get(`${api.url.saveinfor}/${id}`);
const getSalePrice = (id) => api.get(`${api.url.getcode}/${id}`);
const listCode = () => api.get(api.url.getcode);
const getCode = (id) => api.get(`${api.url.getcode}/${id}`);
const add = (data) => api.post(`${api.url.cartitem}`, data);
const remove=(id) => api.delete(`${api.url.saveinfor}/${id}`);
const clear=(id) => api.delete(`${api.url.saveinfordeleteall}/${id}`);
const getcartitem = (id) => api.get(`${api.url.getcartitem}/${id}`);
const listcartitem = () => api.get(api.url.getcartitem);

const CartItemService = {
    get,
    listCode,
    delete:remove,
    getCode,
    getSalePrice,
    add,
    clear,
    getcartitem,
    listcartitem,
}
export default CartItemService;