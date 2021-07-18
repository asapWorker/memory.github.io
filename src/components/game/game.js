import React, {useEffect, useRef, useState} from 'react'
import './game.css'
import {CardGrid} from "../cards-grid/card-grid";
import {randomListOfNum} from "../../PicturesUploading";
import {usePageState} from "../../AppContext";
import {GameProvider} from "./GameContext";

export function Game() {
    const [vision, setVision] = useState(false);

    const {level} = usePageState();
    const pictures = useRef(randomListOfNum(level));

    return <GameProvider pictures={pictures.current} setVision={setVision}>
        <div className='game-container'>
            {<CardGrid />}
            {!vision && <div className="cover"></div>}
            {!vision && <div className="loader">
                <div className="spinner">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>}
            <div className='btn-container'>
                <button>Назад</button>
                <button>Начать заново</button>
                <button>Готово</button>
            </div>
        </div>
    </GameProvider>
}