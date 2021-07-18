import React from 'react'
import './menu.css'
import {usePageChanger} from "../../AppContext";

export function Menu() {
    const changePage = usePageChanger();

    function startGame(number) {
        changePage({value: 1, level: number});
    }

    return <div className="menu-container">
        <ul className="list">
            <li><button className='btn' onClick={startGame.bind(null, 9)}>Легкий уровень</button></li>
            <li><button className='btn' onClick={startGame.bind(null, 16)}>Средний уровень</button></li>
            <li><button className='btn' onClick={startGame.bind(null, 25)}>Сложный уровень</button></li>
            <li><button className='btn'>Помощь</button></li>
            <li><button className='btn'>Ваши результаты</button></li>
        </ul>
    </div>
}