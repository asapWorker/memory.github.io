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
            token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZTFmNTQxODM0NzEwNjkyNzAzM2QwYTQ0ODFmMTNkNTJiMTA1N2NhMWNkY2I0OTg0ZGNiMWQxZjQzMzdhMzYyNTM5YmU5MjcwMDQyNjI5OCIsImF1ZCI6IlZQUyIsImV4cCI6MTYzMDA3NjIzMSwiaWF0IjoxNjI5OTg5ODIxLCJpc3MiOiJLRVlNQVNURVIiLCJ0eXBlIjoiQmVhcmVyIiwianRpIjoiNmRiY2VlMzYtMDk2YS00YmEzLWExZmUtZTc3YzZlZjg4YTYwIiwic2lkIjoiZDFjMDFjMGItZmY1Ni00Mzk1LWJmMWMtYTI3MmFlNzhmZGI2In0.UhGWG1X_p0SHdY-Bnf3KT4AmYUtyrmYNwQcfFVb1YGBKlGEoDroPwabgtisIbpcgZSZnITwpIpIdjCVYajy9V3SS6-0kiCI-3Nq5IaGrsl8qiLyiP0gk143GLxUcJEhBbLfdAP_XPlU7t5DsZ2RjTm7OTNkHxUecia6cpi_-Hc-_wJD0gn2CTOxSw9IE14GOBdl_xj_Yi9UM79QtMKL9MQRxWTwyvtfAIeSBbIx5NdEKzO6DRNvqWIc2u8HEuAW8hNHTMZv6n8Kjf2M5Shtv8cQQv3XpPyHkADIXH7sscajZkpCsGHnTM9940dzi-YTMrfWF1CLM9pj_iNUVQlWMO-SvsMt2O9zRul7lEVezRpff5_cNEhn1ZOuvalKHkb9-1i2NnmHufgPMCU4ngsEE5Fl-OeAwyCxfJJMfC0lsi6EqqLcNg5s2B9kjCodO29fuAlL-3jc60HO5MRJQEPMDhac5XZH9fzZoO3YWcrBW9y0Wz1gnPYtec5bHCvhMFWvoKvJfo8PirmzduNI0sl8rNX4g8ZF1VGNmpRQAuO38hJ-jhw6OKKDSEQrBitzb8OfWm2SVUHxcHE5rsXyLOVLXcVpigk9AFVBkHl9URNOxac4qS5vN2XV4TyNAJfqqVoCAFAATY9MRPloINqRS_WmZKTzSdDJ6m1cV78p93_7twCE",
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
