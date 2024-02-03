
import Notfound from "./404NotFound";
import Networkerr from "./NetworkErr";
import NoPermission from "./NoPermission";
import HomeEm from '../../page/HomeEm';
import ProfileMember from "./Profile";
import HandleCartItem from './HandleCartitem';
import OrderDetail from './Oderdetail';
import HandleCartItemShip from "./HandleCartitemShip";
import ReportEm from "./ReportEm";
const routes = [
    { path: "home", component: <HomeEm /> },
    { path: "NetworkErr", component: <Networkerr /> },
    { path: "NoPermission", component: <NoPermission /> },
    { path: "notfound", component: <Notfound /> },
    { path: "profile", component: <ProfileMember /> },
    { path: "handlecartitem", component: <HandleCartItem /> },
    { path: "handlecartitemship", component: <HandleCartItemShip /> },
    { path: "oder/:id", component: <OrderDetail /> },
    { path: "report", component: <ReportEm /> },
    { path: "*", component: <Notfound /> },
];
export default routes;