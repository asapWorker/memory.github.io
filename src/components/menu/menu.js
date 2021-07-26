import React, {useEffect, useRef} from 'react'
import './menu.css'
import {usePageChanger} from "../../AppContext";

export function Menu() {
    const picturesCount = useRef(0);
    const changePage = usePageChanger();

    function startGame(number, sideLength) {
        const height = window.outerHeight;
        const width = window.outerWidth;
        if (height <= 800 || width <= 800) {
            changePage({value: 1, level: number - sideLength});
        } else {
            changePage({value: 1, level: number});
        }
    }

    return <div className="menu-container">
        <div className="menu-options">
            <button tabIndex={1} className='btn btn-level' onClick={startGame.bind(null, 9, 3)}>Легкий уровень
                <div className="indicator">
                    <div className="sparkle-icon">&#9733;</div>
                    <div className="indicator-icon">&#9733;</div>
                    <div className="indicator-icon">&#9733;</div>
                    <div className="indicator-icon">&#9733;</div>
                    <div className="indicator-icon">&#9733;</div>
                </div>
            </button>
            <button tabIndex={2} className='btn btn-level' onClick={startGame.bind(null, 16, 4)}>Средний уровень
                <div className="indicator">
                    <div className="sparkle-icon">&#9733;</div>
                    <div className="sparkle-icon">&#9733;</div>
                    <div className="sparkle-icon">&#9733;</div>
                    <div className="indicator-icon">&#9733;</div>
                    <div className="indicator-icon">&#9733;</div>
                </div>
            </button>
            <button tabIndex={3} className='btn btn-level' onClick={startGame.bind(null, 25, 4)}>Сложный уровень
                <div className="indicator">
                    <div className="sparkle-icon">&#9733;</div>
                    <div className="sparkle-icon">&#9733;</div>
                    <div className="sparkle-icon">&#9733;</div>
                    <div className="sparkle-icon">&#9733;</div>
                    <div className="sparkle-icon">&#9733;</div>
                </div>
            </button>
            <button tabIndex={4} className='btn btn-option btn-help' onClick={() => changePage({value: 3})}>Помощь</button>
            <button tabIndex={5} className='btn btn-option btn-result'>Ваши результаты</button>
        </div>
    </div>
}