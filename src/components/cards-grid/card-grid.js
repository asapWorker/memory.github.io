import React, {useRef} from 'react'
import './card-grid.css'
import {usePageState} from "../../AppContext";
import {Card} from "../card/card";
import {useAnswerArr, usePicturesArr} from "../game/GameContext";

export function CardGrid() {
    const cardsList = useRef([]);
    const count = useRef(0);

    const {level} = usePageState();
    const refsList = usePicturesArr();
    const isAnswerList = useAnswerArr();

    function showCards() {
        if (cardsList.current.length === 0) {
            for (let i = 0; i <level; i++) {
                cardsList.current.push(<Card count={count} index={i + 1} key={i} isCorrect={isAnswerList[i]} reference={`https://pictures-for-memory-game.s3.eu-north-1.amazonaws.com/${refsList[i]}.jpg`}/>)
            }
        }
        return cardsList.current;
    }

    return <div className='grid'>
        {showCards()}
    </div>
}