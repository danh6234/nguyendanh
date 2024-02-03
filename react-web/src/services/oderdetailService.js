import api from './api';

const list = () => api.get(api.url.oderdetail);

const remove = (id) => api.delete(api.url.clearOderdetail);
const removeOder = (id) => api.delete(api.url.clearOder);

const ordetailServices = {
    list,
    delete: remove,
    deleteOder: removeOder,
}
export default ordetailServices;