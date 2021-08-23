import React, {useState, useEffect, useRef, useReducer} from "react";
import './App.css';
import {Menu} from './components/menu/menu.js'
import {Game} from './components/game/game'
import {AppProvider} from "./AppContext";
import {Help} from "./components/help/help";
import {createSmartappDebugger, createAssistant, AssistantAppState} from "@sberdevices/assistant-client";
import {reducer} from "./reducer";

const initializeAssistant = (getState) => {
    if (process.env.NODE_ENV === "development") {
        return createSmartappDebugger({
            token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZTFmNTQxODM0NzEwNjkyNzAzM2QwYTQ0ODFmMTNkNTJiMTA1N2NhMWNkY2I0OTg0ZGNiMWQxZjQzMzdhMzYyNTM5YmU5MjcwMDQyNjI5OCIsImF1ZCI6IlZQUyIsImV4cCI6MTYyOTcwOTM1MSwiaWF0IjoxNjI5NjIyOTQxLCJpc3MiOiJLRVlNQVNURVIiLCJ0eXBlIjoiQmVhcmVyIiwianRpIjoiNzIyZmI2ZGUtYmYxYS00N2NhLTlhNTMtZmRmYWQ3MWNiZWNkIiwic2lkIjoiNmRlZmM2YmItZDRiYS00YTc5LTgwNjMtMzg1MGI0ODYyZjM1In0.aufncU-hLIUmdbmbThlHvS3lSSYBZw-IuQFenx6IvjeTGEt9d5_A_jV5fhFWiOVQO7W5Bgj_b8Ddm8o5Xo_LlSPEB9LfK7btySeO0M4B2TWJwt_chTFDL3nf4URk1NO6G1rOINHMCUxHEhDBO-umTi5WWK55xru8YYhTRLbX3YatTXyEEFs-QK4-cScrEaAWRUSpXPfc9k5TWOWPEckycxQXtQ3f7tpDtpmaJ3yfc2w7M5lNqbY_ZZtUiYmHBB8UiZv-IETh_lPFWwTqcDkBo6AwfZyaUr6xfPwGdgu8pX88JruYDrZo1ZSbQj_uuBj_N5ne4WX9MMliQDKXPix_mYmuebxw5rXS8-QWj9oXL-A0aMYVdhce1s-xol2KA59Bdn1kFkzAk6sWP31BX0yV8OfuL3DArmz8CYFrUjg3BGQ3878WH4ftxTefyen8o8kmF9lzjmQDvJMbUK9B9tdl64YWTS9ePajYb-yuP7pCAfjRpEvSiP3-3FYocOArP7PiE8CrrZIXJLi2T7uvHg3NbE_1jCJ0V32mxxAaOeAeojVQEaXOnZpWuANN8sPiMJsyysRcCr9XuqgwMvGpINlM1MD8Qy4wTSuvyBxBQYLfRMBulAq_D4hF1W1jgSuoQGqos9VGiOCoDTvJyEX2mhTX6D0avCRUFeVhZkIT6iSwSFk",
            initPhrase: `Запусти тренажер памяти`,
            getState,
        });
    }

    return createAssistant({ getState });
};

function App() {
    const [page, setPage] = useState({value: 0});

    /* Assistant */
    const targetElementsRefs = useRef([]);

    const [appState, dispatch] = useReducer(reducer, {environment: "initial"});

    const assistantStateRef = useRef();
    const assistantRef = useRef();

    useEffect(() => {
        assistantRef.current = initializeAssistant(() => assistantStateRef.current);

        assistantRef.current.on("data", ({ action }) => {
            if (action) {
                dispatch(action);
            }
        });
    }, []);

    useEffect(() => {
        if (appState.environment !== "initial") {
            if (appState.value < 0) {
                const position = targetElementsRefs.current.length + appState.value;
                targetElementsRefs.current[position].current.click();
                if (appState.value === -3 && targetElementsRefs.current[position].current.disabled) {
                    assistantRef.current.sendData({action: {action_id: "ready_disabled"}});
                }
            } else if (appState.environment === "card") {
                const length = targetElementsRefs.current.length;
                if (appState.value > length - 5) {
                    assistantRef.current.sendData({action: {action_id: "not_card"}});
                } else {
                    targetElementsRefs.current[appState.value - 1].current.querySelector(".picture-btn").click();
                    assistantRef.current.sendData({action: {action_id: "is_card"}});
                }
            } else if (!targetElementsRefs.current[appState.value].current.disabled) {
                targetElementsRefs.current[appState.value].current.click();
            } else {
                let pageId = "";
                if (appState.value === 1) {
                    pageId = "help_first"
                } else {
                    pageId = "help_last"
                }
                assistantRef.current.sendData({action: {action_id: pageId}})
            }
        }
    }, [appState]);

    /* Render components */
    function renderComponent() {
        switch (page.value) {
            case 1:
                return <Game/>
            case 2:
                setTimeout(() => setPage({...page, value: 1}), 0)
                return <div/>
            case 3:
                return <Help/>
            default:
                return <Menu/>
        }
    }

    return (
        <AppProvider page={page} setPage={setPage} targetElements={targetElementsRefs} assistant={assistantRef}>
            <div className="App">
                {renderComponent()}
            </div>
        </AppProvider>
    );
}

export default App;
