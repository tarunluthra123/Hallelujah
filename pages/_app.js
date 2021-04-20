import React from "react";
import store from "../redux/store";
import { Provider } from "react-redux";
import "../styles/global_styles.css";
import "semantic-ui-css/semantic.min.css";
import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}

export default MyApp;
