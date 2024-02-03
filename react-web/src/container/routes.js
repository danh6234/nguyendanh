
import Product from "./Product";
import Home from "../page/Home"
import Employees from "./Employees";
import Members from "./Members";
import Notfound from "./404NotFound";
import Networkerr from "./NetworkErr";
import NoPermission from "./NoPermission";
import Report from "./Report";
import Productcategory from "./Productcategory";
import CodeforAll from "./CodeforAll";
import Revenue from "./Revenue";

const routes = [
    { path: "", component: <Home /> },
    { path: "home", component: <Home /> },
    { path: "product", component: <Product /> },
    { path: "productcategory", component: <Productcategory /> },
    { path: "code", component: <CodeforAll /> },
    { path: "employee", component: <Employees /> },
    { path: "user/member", component: <Members /> },
    { path: "report", component: <Report /> },
    { path: "revenue", component: <Revenue /> },
    { path: "NetworkErr", component: <Networkerr /> },
    { path: "NoPermission", component: <NoPermission /> },
    { path: "*", component: <Notfound /> },
    { path: "notfound", component: <Notfound /> },
];
export default routes;