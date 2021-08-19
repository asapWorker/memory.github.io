import React, {useEffect, useRef, useState} from "react";
import "./help.css"
import {useAssistant, usePageChanger, useTargetElements} from "../../AppContext";
import {
    chooseElementOnFocusPosition,
    setFocus,
    wrapMoveByRemoteController
} from "../../MovementFunctions";

export function Help() {
    const [helpPage, setHelpPage] = useState(0);
    const [buttonsVisibility, setButtonsVisibility] = useState(["disabled", "enabled"]);
    /* Refs storage for remote controller events Collection */
    const buttonsRefs = useRef([useRef(), useRef(), useRef()]);
    /* Variable for assistant actions from App.js */
    const targetElements = useTargetElements();
    targetElements.current = buttonsRefs.current;
    /* Variable to control used elements */
    const refsStatus = useRef(Array(3).fill(true));
    /* State for focus */
    const [focusPosition, setFocusPosition] = useState(-1);
    /* Get assistant */
    const assistant = useAssistant();

    /* Handler for navigation between help pages and return to menu */
    function helpHandler(option) {
        switch (option) {
            case "menu":
                return function() {
                    assistant.current.sendData({action: {action_id: option}})
                    goToMenu({value: 0})
                }
            case "back":
                return function() {
                    assistant.current.sendData({action: {action_id: option, payload: helpPage - 1}})
                    setHelpPage(prev => prev - 1)
                }
            case "next":
                return function() {
                    assistant.current.sendData({action: {action_id: option, payload: helpPage + 1}})
                    setHelpPage(prev => prev + 1)
                }
        }
    }

    useEffect(() => {
        /* Add OK event listener */
        const chooseElementOnFocusPositionGame = chooseElementOnFocusPosition();
        document.addEventListener("keydown", chooseElementOnFocusPositionGame);

        return () => {
            document.removeEventListener("keydown", chooseElementOnFocusPositionGame);
        }
    }, [])

    /* Set focus */
    useEffect(() => {
        setFocus(focusPosition, buttonsRefs, 0);
    }, [focusPosition])

    const goToMenu = usePageChanger();

    useEffect(() => {
        /* Variable for remote controller function */
        let moveByRemoteController = null;
        switch (helpPage) {
            case 0:
                setButtonsVisibility(["disabled", "enabled"]);
                refsStatus.current = [true, false, true];
                /* Get function for remote controller */
                moveByRemoteController = wrapMoveByRemoteController(3, 2, setFocusPosition, refsStatus.current);
                document.addEventListener("keydown", moveByRemoteController);
                break;
            case 1:
                setButtonsVisibility(["enabled", "enabled"]);
                refsStatus.current = [true, true, true];
                /* Get function for remote controller */
                moveByRemoteController = wrapMoveByRemoteController(3, 2, setFocusPosition, refsStatus.current);
                document.addEventListener("keydown", moveByRemoteController);
                break;
            case 2:
                setButtonsVisibility(["enabled", "disabled"]);
                refsStatus.current = [true, true, false];
                /* Get function for remote controller */
                moveByRemoteController = wrapMoveByRemoteController(3, 2, setFocusPosition, refsStatus.current);
                document.addEventListener("keydown", moveByRemoteController);
                break;
        }

        return () => {
            document.removeEventListener("keydown", moveByRemoteController);
        }
    }, [helpPage])

    return <div className="btn-container">
        <button ref={buttonsRefs.current[0]} className={"game-btn enabled"} onClick={helpHandler("menu")}>Вернуться к меню</button>
        <button ref={buttonsRefs.current[1]} disabled={buttonsVisibility[0] === "disabled"} className={"game-btn " + buttonsVisibility[0]} onClick={helpHandler("back")}>Предыдущая</button>
        <button ref={buttonsRefs.current[2]} disabled={buttonsVisibility[1] === "disabled"} className={"game-btn " + buttonsVisibility[1]} onClick={helpHandler("next")}>Следующая</button>
    </div>
}