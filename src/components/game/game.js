import React, {useEffect, useRef, useState} from 'react'
import './game.css'
import {CardGrid} from "../cards-grid/card-grid";
import {randomListOfNum} from "../../PicturesUploading";
import {useAssistant, usePageChanger, usePageState, useTargetElements} from "../../AppContext";
import {GameProvider} from "./GameContext";
import {Wrap} from "../wrap/wrap";
import {Result} from "../result/result";
import {
    wrapMoveByRemoteController,
    setFocus,
    chooseElementOnFocusPosition,
    setSpecialStatusForChosen
} from "../../MovementFunctions";

export function Game(setPage) {
    const [vision, setVision] = useState('invisible-img');
    const [wrapVision, setWrapVision] = useState("none");
    const [disableBtn, setDisableBtn] = useState('disabled-ready');
    const [resultPage, setResultPage] = useState("not-result");
    const deleteTimeout = useRef({});
    const deleteWrapTimeout = useRef({});

    /* Refs storage for remote controller events */
    const buttonsRefs = useRef([]);
    /* Refs for control buttons */
    const gameButtonsRefs = useRef([useRef(), useRef(), useRef()]);
    const resultButtonsRefs = useRef([useRef(), useRef()]);
    const refs = useRef([]);
    /* State for focus */
    const [focusPosition, setFocusPosition] = useState(-1);

    /* State for changing remote controller actions */
    const [remoteController, setRemoteController] = useState(0);

    const {level} = usePageState();
    const pictures = useRef(randomListOfNum(level));
    const result = useRef(pictures.current[2]);

    /* Array for determinate if picture was chosen */
    const arrButtonStatus = useRef(Array(level + 3).fill(true));

    const pageChanger = usePageChanger();

    /* Variable for assistant actions from App.js */
    const targetElements = useTargetElements();
    targetElements.current = [].concat(buttonsRefs.current, gameButtonsRefs.current, resultButtonsRefs.current);

    /* Get assistant */
    const assistant = useAssistant();

    function setTimeoutVisible() {
        deleteTimeout.current = setTimeout(() => {
            setWrapVision("covered");
        }, 2000);
    }

    function setTimeoutTimer() {
        deleteTimeout.current = setTimeout(() => {
            setWrapVision("none");
            setVision("btn");
            /* set state for pictures + 2 buttons for remote controller */
            setRemoteController(1);
            /* Message for assistant */
            assistant.current.sendData({action: {action_id: 'can_chose_card'}})
        }, 3000)
    }

    function setReadyTimer() {
        deleteTimeout.current = setTimeout(() => {
            setWrapVision("none");
            setVision("visible");
        }, 3000)
    }

    function moveToMenuFromGame() {
        assistant.current.sendData({action: {action_id: "menu"}});
        setVision("cleanup");
    }

    function moveToMenuFromResult() {
        assistant.current.sendData({action: {action_id: "menu"}});
        pageChanger(0);
    }

    function restartGame() {
        clearTimeout(deleteTimeout.current);
        clearInterval(deleteWrapTimeout.current);
        assistant.current.sendData({action: {action_id: "restart"}});
        pageChanger({value: 2, level});
    }

    function moveToResult() {
        result.current = Math.floor(result.current * 100 / level);
        assistant.current.sendData({action: {action_id: "ready", payload: result.current}})
        setResultPage("is-result");
        setVision('vision');
    }

    function renderRelevantBtn() {
        if (resultPage === "not-result") {
            return <div className='btn-container'>
                <button ref={gameButtonsRefs.current[0]} className="game-btn enabled" onClick={moveToMenuFromGame}>Выбрать уровень</button>
                <button ref={gameButtonsRefs.current[1]} className="game-btn enabled" onClick={restartGame}>Начать заново</button>
                <button ref={gameButtonsRefs.current[2]} className={"game-btn " + (disableBtn !== "enable" ? "disabled" : "enabled")} onClick={moveToResult} disabled={disableBtn !== "enable"}>Готово</button>
            </div>
        }
        return <div className="result-btn-container">
            <button ref={resultButtonsRefs.current[0]} className="game-btn enabled" onClick={restartGame}>Повторить попытку</button>
            <button ref={resultButtonsRefs.current[1]} className="game-btn enabled" onClick={moveToMenuFromResult}>Выбрать уровень</button>
        </div>
    }

    /* Add OK event listener */
    useEffect(() => {
        const chooseElementOnFocusPositionGame = chooseElementOnFocusPosition();
        document.addEventListener("keydown", chooseElementOnFocusPositionGame);

        return () => {
            document.removeEventListener("keydown", chooseElementOnFocusPositionGame);
        }
    }, [])

    useEffect(() => {
        if (vision === "ready") {
            setWrapVision("covered");
        } else if (vision === "visible") {
            setTimeoutVisible();
        } else if (vision === 'cleanup') {
            clearTimeout(deleteTimeout.current);
            clearInterval(deleteWrapTimeout.current);
            pageChanger({value: 0});
        }
    }, [vision])

    useEffect(() => {
        if (wrapVision === "covered") {
            if (vision === "ready") {
                setReadyTimer();
            } else {
                setTimeoutTimer();
            }
        }
    }, [wrapVision])
    
    useEffect(() => {
        if (resultPage === "is-result") {
            /* set state for result page for remove controller */
            setRemoteController(3);
        }
    }, [resultPage])

    useEffect(() => {
        if (disableBtn === "enable") {
            /* set state for pictures + 3 buttons for remove controller */
            setRemoteController(2);
        }
    }, [disableBtn])

    /* Listen remove controller state changing */
    useEffect(() => {
        let wrapMoveByRemoteControllerGame = null;
        switch (remoteController) {
            case 0:
                refs.current = gameButtonsRefs.current.slice(0, 2);
                wrapMoveByRemoteControllerGame = wrapMoveByRemoteController(2, 0, setFocusPosition, arrButtonStatus.current);
                document.addEventListener("keydown", wrapMoveByRemoteControllerGame);
                break;
            case 1:
                refs.current = [].concat(buttonsRefs.current, gameButtonsRefs.current.slice(0, 2));
                setFocusPosition((prev) => {
                    if (prev === -1) return -1;
                    else return prev + level;
                });
                wrapMoveByRemoteControllerGame = wrapMoveByRemoteController(level + 2, Math.sqrt(level), setFocusPosition, arrButtonStatus.current);
                document.addEventListener("keydown", wrapMoveByRemoteControllerGame);
                break;
            case 2:
                refs.current =[].concat(buttonsRefs.current, gameButtonsRefs.current);
                wrapMoveByRemoteControllerGame = wrapMoveByRemoteController(level + 3, Math.sqrt(level), setFocusPosition, arrButtonStatus.current);
                document.addEventListener("keydown", wrapMoveByRemoteControllerGame);
                break;
            case 3:
                refs.current = resultButtonsRefs.current;
                setFocusPosition(-1);
                wrapMoveByRemoteControllerGame = wrapMoveByRemoteController(2, 0, setFocusPosition, arrButtonStatus.current);
                document.addEventListener("keydown", wrapMoveByRemoteControllerGame);
                break;
        }
        return () => {
            document.removeEventListener("keydown", wrapMoveByRemoteControllerGame);
        }
    }, [remoteController])

    /* Set focus */
    useEffect(() => {
        switch (remoteController) {
            case 0:
                setFocus(focusPosition, refs, 0);
                break;
            case 1:
                setFocus(focusPosition, refs, Math.sqrt(level));
                break;
            case 2:
                setFocus(focusPosition, refs, Math.sqrt(level));
                break;
            case 3:
                setFocus(focusPosition, refs, 0);
                break;
        }
        const clickHandler = setSpecialStatusForChosen(focusPosition, level, arrButtonStatus.current);
        document.addEventListener("click", clickHandler);

        return () => {
            document.removeEventListener("click", clickHandler);
        }
    }, [focusPosition])

    return <GameProvider pictures={pictures.current[0]} answers={pictures.current[1]} result={result} setVision={setVision} vision={vision} wrapVision={wrapVision} disableBtn={disableBtn} setDisableBtn={setDisableBtn} buttonsRefs={buttonsRefs} deleteWrapTimeout={deleteWrapTimeout}>
        <Wrap/>
        <div className={"game-container " + resultPage}>
            {(resultPage === "is-result") && <Result className="result"/>}
            <div className='game-inner'>
                <CardGrid/>
                {(vision === "error") && <div className={"error-wrapper"}>
                    <div className="error-content">Упс... Что-то пошло не так. Проверьте подключение к интернету</div>
                </div>}
                {(vision === 'invisible-img') && <div className="loader">
                    <div className="spinner">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>}
                {renderRelevantBtn()}
            </div>
        </div>
    </GameProvider>
}