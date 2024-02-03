
import Product from "./Product";
import ProductCategory from "./Productcategory";
import CartItem from "./CartItem";
import Notfound from "./404NotFound";
import Networkerr from "./NetworkErr";
import NoPermission from "./NoPermission";
import ProfileMember from "./Profile";
import HandleCartItem from './HandleCartitem';
const routes = [
    { path: "product", component: <Product /> },
    { path: "productcategory/:id", component: <ProductCategory /> },
    { path: "cartitem", component: <CartItem /> },
    { path: "NetworkErr", component: <Networkerr /> },
    { path: "NoPermission", component: <NoPermission /> },
    { path: "notfound", component: <Notfound /> },
    { path: "profile", component: <ProfileMember /> },
    { path: "handlecartitem", component: <HandleCartItem /> },
    { path: "*", component: <Notfound /> },
];
export default routes;