import React, { createContext, useContext, useState } from 'react'

let query: string = ""
// const [query, setQuery] = useState<string>("");

type AppContextProviderProps = {
    children: React.ReactNode
}

const AppContext = createContext(query);

const AppContextProvider = ({ children }: AppContextProviderProps) => {

    return (
        <AppContext.Provider value={query}>
            {children}
        </AppContext.Provider>
    )
};

const useGlobalContext = () => {
    const globalContext = useContext(AppContext);

    if(globalContext === undefined){
        throw new Error('AppContext must be within AppContextProvider');
    }

    return globalContext;
}


export { AppContextProvider, AppContext, useGlobalContext }