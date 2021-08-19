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

export function useTargetElements() {
    const {targetElements} = useContext(AppContext);
    return targetElements;
}

export function useAssistant() {
    const {assistant} = useContext(AppContext);
    return assistant;
}

export function AppProvider({children, page, setPage, targetElements, assistant}) {
    function changePage(state) {
        setPage(state);
    }

    return <AppContext.Provider value={{page, changePage, targetElements, assistant}}>
        {children}
    </AppContext.Provider>
}