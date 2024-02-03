import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./HeaderEmploy";
import routes from './routes'
import { useSelector } from "react-redux";

const DefaultlayoutEmploy = () => {
    const isLoggedIn = useSelector((state) => state.employ.isLoggedIn);
    return (
        <>
            {!isLoggedIn ? (<Navigate to="/main/main" />
            ) : (
                <>
                    <Header />
                    <Routes>
                        {routes.map((route, idx) => (
                            <Route key={idx} path={route.path} element={route.component} />
                        ))}
                    </Routes>
                </>
            )};
        </>
    )
}
export default DefaultlayoutEmploy;