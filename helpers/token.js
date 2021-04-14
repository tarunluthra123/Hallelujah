export function setToken(token, refreshToken) {
    localStorage.setItem("hallelujah_auth_token", token);
    localStorage.setItem("hallelujah_refresh_token", refreshToken);
}

export function removeToken() {
    localStorage.removeItem("hallelujah_auth_token");
    localStorage.removeItem("hallelujah_refresh_token");
}

export function getAuthToken() {
    return localStorage.getItem("hallelujah_auth_token");
}

export function getRefreshToken() {
    return localStorage.getItem("hallelujah_refresh_token");
}

export async function refreshAuthToken() {
    const refreshUrl = "/api/auth/refresh/token";
    const options = {
        refresh: getRefreshToken(),
    };
    const response = await fetch(refreshUrl, options);
    const data = await response.json();
    const authToken = data.token;
    const refreshToken = data.refresh;
    removeToken();
    setToken(authToken, refreshToken);

    return authToken;
}
