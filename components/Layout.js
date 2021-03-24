import React from "react";

const Layout = (props) => {
    return (
        <>
            <header></header>
            <main>{props.children}</main>
            <footer></footer>
        </>
    );
};

export default Layout;
