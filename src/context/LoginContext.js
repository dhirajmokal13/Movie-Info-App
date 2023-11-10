import React, { createContext, useState, useContext } from 'react';
const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
    const [loginDetails, setLoginDetails] = useState({
        isLoggedIn: false,
        token: '',
        refreshToken: '',
        userId: ''
    });

    return (
        <LoginContext.Provider value={{ loginDetails, setLoginDetails }}>
            {children}
        </LoginContext.Provider>
    );
}

export const useLoginContext = () => {
    return useContext(LoginContext);
}