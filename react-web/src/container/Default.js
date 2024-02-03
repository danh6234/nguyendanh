import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./Header";
import routes from './routes'
import { useSelector } from "react-redux";


const Defaultlayout = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
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
            )}
        </>
    )
}
export default Defaultlayout;