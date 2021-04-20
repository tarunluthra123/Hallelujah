import React from "react";

const Layout = (props) => {
    return (
        <>
            <header className="h-20 bg-blue-100 w-full text-2xl flex items-center justify-between py-5 px-16">
                <span className="">Logo</span>
                <nav className="flex w-2/5 justify-between">
                    <span>Link 1</span>
                    <span>Link 2</span>
                    <span>Link 3</span>
                </nav>
            </header>
            <main className="mx-16 mt-5">{props.children}</main>
            <footer></footer>
        </>
    );
};

export default Layout;
