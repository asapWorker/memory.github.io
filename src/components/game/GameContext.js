import React, {createContext, useContext} from "react";

const GameContext = createContext();

export function usePicturesArr() {
    const {pictures} = useContext(GameContext);
    return pictures;
}

export function useAnswerArr() {
    const {answers} = useContext(GameContext);
    return answers;
}

export function useResult() {
    const {result} = useContext(GameContext);
    return result;
}

export function useSetVision() {
    const {setVision} = useContext(GameContext);
    return setVision;
}

export function useVision() {
    const {vision} = useContext(GameContext);
    return vision;
}

export function useWrapVision() {
    const {wrapVision} = useContext(GameContext);
    return wrapVision;
}

export function useDisableBtn() {
    const {setDisableBtn} = useContext(GameContext);
    return setDisableBtn;
}

export function useBtnState() {
    const {disableBtn} = useContext(GameContext);
    return disableBtn;
}

export function GameProvider({children, pictures, answers, result, setVision, vision, wrapVision, disableBtn, setDisableBtn}) {
    return <GameContext.Provider value={{pictures, answers, result, setVision, vision, wrapVision, disableBtn, setDisableBtn}}>
        {children}
    </GameContext.Provider>
}