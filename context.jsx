import React, {createContext, useContext, useEffect, useState} from "react";


const AppContext = createContext()


const AppProvider = ({ children }) => {
    const [darkTheme, setDarkTheme] = useState(false);
    const [token, settoken] = useState(null)
    const [adminpass, setadminpass] = useState()

    const toggleBlack = () => {
        setDarkTheme(!darkTheme)
    }
    return (
        <AppContext.Provider value={{ darkTheme, setDarkTheme, toggleBlack, token, settoken, adminpass, setadminpass }}>
            {children}
        </AppContext.Provider>
    );
};

export {AppContext, AppProvider}