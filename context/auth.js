import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = (props) => {
    const [currentUser, setCurrentUser] = useState(null);

    const value = {
        currentUser,
        setCurrentUser,
    };

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    return useContext(AuthContext);
}
