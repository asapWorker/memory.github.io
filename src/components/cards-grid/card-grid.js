import React, {useState, useRef, useEffect} from 'react'
import './card-grid.css'
import {usePageState} from "../../AppContext";
import {Card} from "../card/card";
import {usePicturesArr} from "../game/GameContext";

export function CardGrid() {
    const cardsList = useRef([]);
    const count = useRef(0);

    const {level} = usePageState();
    const refsList = usePicturesArr();

    function showCards() {
        if (cardsList.current.length === 0) {
            refsList.forEach((item, index) => {
                cardsList.current.push(<Card count={count} key={index}
                                             reference={`https://pictures-for-memory-game.s3.eu-north-1.amazonaws.com/${item}.jpg`}/>)
            })
        }
        return cardsList.current;
    }

    return <div className='grid'>
        {showCards()}
    </div>
}