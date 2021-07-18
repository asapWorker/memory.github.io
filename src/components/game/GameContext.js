import React, {createContext, useContext} from "react";

const GameContext = createContext();

export function usePicturesArr() {
    const {pictures} = useContext(GameContext);
    return pictures;
}

export function useSetVision() {
    const {setVision} = useContext(GameContext);
    return setVision;
}


export function GameProvider({children, pictures, setVision}) {
    return <GameContext.Provider value={{pictures, setVision}}>
        {children}
    </GameContext.Provider>
}