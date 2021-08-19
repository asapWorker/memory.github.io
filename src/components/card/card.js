import React, {useEffect, useState, useRef} from 'react'
import './card.css'
import {usePageState} from "../../AppContext";
import {useBtnState, useButtonsRefs, useDisableBtn, useResult, useSetVision, useVision} from "../game/GameContext";

export function Card({reference, isCorrect, count, index}) {
    const [flag, setFlag] = useState(false);
    const [error, setError] = useState(false);
    const [choice, setChoice] = useState("active");

    const {level} = usePageState();
    const setVision = useSetVision();
    const vision = useVision();
    const btnState = useBtnState();
    const disabledBtn = useDisableBtn();
    const result = useResult();

    /* Remove controller */
    const buttonsRefs = useButtonsRefs();

    function choseItem() {
        setChoice("chosen");
    }

    useEffect(() => {
        if (flag) {
            ++count.current;
            if (count.current === level) {
                setVision('ready');
            }
        }
    }, [flag])

    useEffect(() => {
        if (error === true && vision === "invisible-img") {
            setVision('error');
        }
    }, [error])

    useEffect(() => {
        if (choice === "chosen") {
            if (btnState !== "enable") {
                disabledBtn("enable");
            }
            if (isCorrect === "wrong") {
                result.current--;
            } else {
                result.current++;
            }
        }
    }, [choice])

    return <div className={"card card-level_" + level}>
        <div ref={buttonsRefs.current[index - 1] = useRef()} className={"card-inner inner-level_" + level}>
            {(vision !== "btn") && <div className={"cover " + vision}/>}
            {(vision === "btn") && <button disabled={choice === "chosen"} onClick={choseItem} className={"picture-btn " + choice + ' ' + isCorrect}>{index}</button>}
            <img onLoad={() => setFlag(true)} onError={() => {setError(true)}} src={reference} alt="Game element" className="img"/>
        </div>
    </div>
}