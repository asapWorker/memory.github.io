import React, {useEffect, useRef, useState} from 'react'
import './menu.css'
import {useAssistant, usePageChanger, useTargetElements} from "../../AppContext";
import {wrapMoveByRemoteController, setFocus, chooseElementOnFocusPosition} from "../../MovementFunctions";

export function Menu() {
    const changePage = usePageChanger();
    /* Refs storage for remote controller events */
    const buttonsRefs = useRef([useRef(), useRef(), useRef(), useRef()]);
    /* Variable for assistant actions from App.js */
    const targetElements = useTargetElements();
    targetElements.current = buttonsRefs.current;
    /* State for focus */
    const [focusPosition, setFocusPosition] = useState(-1);
    /* Array for determinate if picture was chosen */
    const arrButtonStatus = useRef(Array(4).fill(true));
    /* Get remote controller function */
    const moveByRemoteController = wrapMoveByRemoteController(4, 0, setFocusPosition, arrButtonStatus.current)
    /* Get assistant */
    const assistant = useAssistant();

    function startGame(number, sideLength) {
        const height = window.outerHeight;
        const width = window.outerWidth;
        if (height <= 800 || width <= 800) {
            changePage({value: 1, level: number - sideLength});
        } else {
            changePage({value: 1, level: number});
        }
    }

    /* Handler for menu options button is clicked event */
    function menuChoiceHandler(level) {
        let number = 0;
        let sideLength = 0;
        switch (level) {
            case "easy":
                number = 9;
                sideLength = 3;
                break;
            case "middle":
                number = 16;
                sideLength = 4;
                break;
            case "hard":
                number = 25;
                sideLength = 4;
                break;
            case "help":
                return function() {
                    assistant.current.sendData({action: {action_id: level}});
                    changePage({value: 3})
                }
        }
        return function() {
            assistant.current.sendData({action: {action_id: level}});
            startGame(number, sideLength);
        }
    }

    /* Add OK event listener */
    useEffect(() => {
        const chooseElementOnFocusPositionGame = chooseElementOnFocusPosition();
        document.addEventListener("keydown", chooseElementOnFocusPositionGame);

        return () => {
            document.removeEventListener("keydown", chooseElementOnFocusPositionGame);
        }
    }, [])

    /* Add remote controller event listener */
    useEffect(() => {
        document.addEventListener("keydown", moveByRemoteController);

        return () => {
            document.removeEventListener("keydown", moveByRemoteController);
        }
    }, [])

    /* Set focus */
    useEffect(() => {
        setFocus(focusPosition, buttonsRefs, 0);
    }, [focusPosition])


    return <div className="menu-container">
        <div className="menu-options">
            <button ref={buttonsRefs.current[0]} tabIndex={1} className='btn btn-level' onClick={menuChoiceHandler("easy")}>Легкий уровень
                <div className="indicator">
                    <div className="sparkle-icon">&#9733;</div>
                    <div className="indicator-icon">&#9733;</div>
                    <div className="indicator-icon">&#9733;</div>
                    <div className="indicator-icon">&#9733;</div>
                    <div className="indicator-icon">&#9733;</div>
                </div>
            </button>
            <button ref={buttonsRefs.current[1]} tabIndex={2} className='btn btn-level' onClick={menuChoiceHandler("middle")}>Средний уровень
                <div className="indicator">
                    <div className="sparkle-icon">&#9733;</div>
                    <div className="sparkle-icon">&#9733;</div>
                    <div className="sparkle-icon">&#9733;</div>
                    <div className="indicator-icon">&#9733;</div>
                    <div className="indicator-icon">&#9733;</div>
                </div>
            </button>
            <button ref={buttonsRefs.current[2]} tabIndex={3} className='btn btn-level' onClick={menuChoiceHandler("hard")}>Сложный уровень
                <div className="indicator">
                    <div className="sparkle-icon">&#9733;</div>
                    <div className="sparkle-icon">&#9733;</div>
                    <div className="sparkle-icon">&#9733;</div>
                    <div className="sparkle-icon">&#9733;</div>
                    <div className="sparkle-icon">&#9733;</div>
                </div>
            </button>
            <button ref={buttonsRefs.current[3]} tabIndex={4} className='btn btn-option btn-help' onClick={menuChoiceHandler("help")}>Помощь</button>
        </div>
    </div>
}