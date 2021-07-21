import React from 'react'
import './result.css'
import {useResult} from "../game/GameContext";

export function Result() {
    const result = useResult();

    return <div className="result-container">{result.current}</div>
}