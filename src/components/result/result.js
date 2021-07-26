import React from 'react'
import './result.css'
import {useResult} from "../game/GameContext";

export function Result() {
    const result = useResult();

    return <div className="result-container">
        <div className="results-box">
            <div className="current-result">Текущий результат: <span>{result.current}%</span></div>
            <div className="best-result">Лучший результат: <span>100%</span></div>
        </div>
    </div>
}