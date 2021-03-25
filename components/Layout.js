import React from "react";
import styles from "../styles/components/Layout.module.css";

const Layout = (props) => {
    return (
        <>
            <header className={styles.layoutHeader}>
                <span className="logo">Logo</span>
                <nav className={styles.layoutNav}>
                    <span>Link 1</span>
                    <span>Link 2</span>
                    <span>Link 3</span>
                </nav>
            </header>
            <main className={styles.layoutMain}>{props.children}</main>
            <footer></footer>
        </>
    );
};

export default Layout;
