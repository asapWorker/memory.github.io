import React, {useContext} from 'react'

const AppContext = React.createContext();

export function usePageChanger() {
    const {changePage} = useContext(AppContext);
    return changePage;
}

export function usePageState() {
    const {page} = useContext(AppContext);
    return page;
}

export function AppProvider({children, page, setPage}) {
    function changePage(state) {
        setPage(state);
    }

    return <AppContext.Provider value={{page, changePage}}>
        {children}
    </AppContext.Provider>
}