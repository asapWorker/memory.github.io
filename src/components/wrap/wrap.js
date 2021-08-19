import React, {useEffect, useState} from 'react'
import './wrap.css'
import {useDeleteWrapTimeout, useWrapVision} from "../game/GameContext";

export function Wrap() {
    const [number, setNumber] = useState(3);
    const visibility = useWrapVision();
    const deleteWrapTimeout = useDeleteWrapTimeout();

    useEffect(() => {
        if (visibility === "covered") {
            deleteWrapTimeout.current =  setInterval(() => {setNumber((prev) => {
                if (prev === 1) {
                    clearInterval(deleteWrapTimeout.current);
                    return 3;
                } else {
                    return prev - 1;
                }
            })}, 1000)
        }
    }, [visibility])

    return <div className={"wrap " + visibility}>
        <div className="wrap-content">{number}</div>
    </div>
}