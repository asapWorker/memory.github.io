import React, {useEffect, useState} from 'react'
import './wrap.css'
import {useWrapVision} from "../game/GameContext";

export function Wrap() {
    const [number, setNumber] = useState(3);
    const visibility = useWrapVision();

    useEffect(() => {
        if (visibility === "covered") {
            setTimeout(() => {
                setNumber(2);
                setTimeout(() => {
                    setNumber(1);
                }, 1000);
            }, 1000);
        }
    }, [visibility])

    return <div className={"wrap " + visibility}>
        <div className="wrap-content">{number}</div>
    </div>
}