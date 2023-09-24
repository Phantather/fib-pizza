import React from 'react';
import Header from "./Header/Header";
import {Outlet} from "react-router-dom";
import Footer from "./Footer/Footer";

const Layout = () => {
    return (
        <>
            <Header/>
            <main className="main">
                <Outlet/>
            </main>
            <Footer/>
        </>
    );
};

export default Layout;