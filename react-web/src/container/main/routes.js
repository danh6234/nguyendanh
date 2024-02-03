
import LoginMember from "../../page/LoginMem";
import LoginEmploy from "../../page/LoginEm";
import Album from "./Main";
import Notfound from "./404NotFound";
import SignUp from "../../page/SingUp";
import SignInMember from "../../page/SingInMember";

const routes = [
    { path: "loginemploy", component: <LoginEmploy /> },
    { path: "loginmember", component: <LoginMember /> },
    { path: "singin", component: <SignInMember /> },
    { path: "main", component: <Album /> },
    { path: "singup", component: <SignUp /> },
    { path: "*", component: <Notfound /> },
];
export default routes;