import React, {useEffect, useRef, useState} from 'react'
import './game.css'
import {CardGrid} from "../cards-grid/card-grid";
import {randomListOfNum} from "../../PicturesUploading";
import {usePageChanger, usePageState} from "../../AppContext";
import {GameProvider} from "./GameContext";
import {Wrap} from "../wrap/wrap";
import {Result} from "../result/result";

export function Game() {
    const [vision, setVision] = useState('invisible');
    const [wrapVision, setWrapVision] = useState("none");
    const [disableBtn, setDisableBtn] = useState('disabled-ready');
    const [resultPage, setResultPage] = useState("not-result");
    const deleteTimeout = useRef({});

    const {level} = usePageState();
    const pictures = useRef(randomListOfNum(level));
    const result = useRef(pictures.current[2]);

    const pageChanger = usePageChanger();

    function setTimeoutVisible() {
        deleteTimeout.current = setTimeout(() => {
            setWrapVision("covered");
            setDisableBtn("disabled-all")
        }, 2000);
    }

    function setTimeoutTimer() {
        setTimeout(() => {
            setWrapVision("none");
            setVision("btn");
            setDisableBtn('disable-ready');
        }, 3000)
    }

    function restartGame() {
        clearTimeout(deleteTimeout.current);
        pageChanger({value: 2, level});
    }

    function moveToResult() {
        result.current = Math.floor(result.current * 100 / level);
        setResultPage("is-result");
        setVision('vision');
    }

    function renderRelevantBtn() {
        if (resultPage === "not-result") {
            return <div className='btn-container'>
                <button className="game-btn" onClick={() => setVision("cleanup")} disabled={disableBtn === "disabled-all"}>Выбрать уровень</button>
                <button className="game-btn" onClick={restartGame} disabled={disableBtn === "disabled-all"}>Начать заново</button>
                <button className="game-btn" onClick={() => moveToResult()} disabled={disableBtn !== "enable"}>Готово</button>
            </div>
        }
        return <div className="result-btn-container">
            <button className="game-btn" onClick={restartGame}>Повторить попытку</button>
            <button className="game-btn" onClick={() => pageChanger(0)}>Выбрать уровень</button>
        </div>
    }

    useEffect(() => {
        if (vision === 'visible') {
            setTimeoutVisible();
        } else if (vision === 'cleanup') {
            clearTimeout(deleteTimeout.current);
            pageChanger({value: 0});
        }
    }, [vision])

    useEffect(() => {
        if (wrapVision === "covered") {
            setTimeoutTimer();
        }
    }, [wrapVision])

    return <GameProvider pictures={pictures.current[0]} answers={pictures.current[1]} result={result} setVision={setVision} vision={vision} wrapVision={wrapVision} disableBtn={disableBtn} setDisableBtn={setDisableBtn}>
        <Wrap/>
        <div className={"game-container " + resultPage}>
            {(resultPage === "is-result") && <Result className="result"/>}
            <div className='game-inner'>
                <CardGrid/>
                {(vision === "error") && <div className={"error-wrapper"}>
                    <div className="error-content">Упс... Что-то пошло не так. Проверьте подключение к интернету</div>
                </div>}
                {(vision === 'invisible') && <div className="loader">
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
                {renderRelevantBtn()}
            </div>
        </div>
    </GameProvider>
}