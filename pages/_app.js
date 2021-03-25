import { AuthProvider } from "../context/auth";
import "../styles/global_styles.css";
import "semantic-ui-css/semantic.min.css";

function MyApp({ Component, pageProps }) {
    return (
        <AuthProvider>
            <Component {...pageProps} />
        </AuthProvider>
    );
}

export default MyApp;
