import React, {useCallback, useContext, useEffect, useRef, useState} from 'react'
import './card.css'
import {usePageState} from "../../AppContext";
import {useSetVision} from "../game/GameContext";

export function Card({reference, count}) {
    const [flag, setFlag] = useState(false);

    const {level} = usePageState();
    const setVision = useSetVision();

    useEffect(() => {
        if (flag) {
            ++count.current;
            console.log(count.current)
            if (count.current === level) {
                setVision(true);
            }
        }
    }, [flag])

    return <div className={"card card-level_" + level}>
        <div className={"card-inner inner-level_" + level}>
            <img onLoad={() => setFlag(true)} src={reference} alt="Game element" className="img"/>
        </div>
    </div>
}