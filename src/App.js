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
            token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZTFmNTQxODM0NzEwNjkyNzAzM2QwYTQ0ODFmMTNkNTJiMTA1N2NhMWNkY2I0OTg0ZGNiMWQxZjQzMzdhMzYyNTM5YmU5MjcwMDQyNjI5OCIsImF1ZCI6IlZQUyIsImV4cCI6MTYyOTgxNjQ5MiwiaWF0IjoxNjI5NzMwMDgyLCJpc3MiOiJLRVlNQVNURVIiLCJ0eXBlIjoiQmVhcmVyIiwianRpIjoiZDIyMDg2ZjYtNzg3Mi00NzhkLTk4ZDYtZTUxZmRlN2E3M2U1Iiwic2lkIjoiNzk3NGQ0NjEtM2QzNy00ODkwLWIyNzctZDc5NzBlZTI1N2EwIn0.V00m28LiarZ-28OzJZEQLB6_P2OUY46nzjGp0ENy2pavsCpjLqsq0UvtwamNDYii5qxQKQRasC2v-J1gmZ1ZbPoxeQTDXxS6MEYctWsG8BNnByi54BsblGvHiyXKyI0PC6j-7Uhvy_ANcuqD67OWWL3DtRT9AJIRPCvMQcW2MCqyp-kkntnuLGA0gZWL6cYn3_e7F9GZH5FjLDXCVJseFImymQHQmd869q-5P3MRkMwThsYGzsipZ4wUi41c_9hW-aNDLK24QkeEfOyccBOLzASi4Io2A0LNJfsnLTxff2O828ad9acGigLF_n4YNxVOqR51y-TEpcqRjJLaGrZfgJN1Y4ARIgMiukYr7xO3nCIAqK7rrNKtpJ1-3NBxOrfgjwQUVmdg_1peTwYIjxQr40PXa85cFqW1FCPpZTnohTUhmRGUsIpfb_162vH8q9FgX_grixAjw8mPo20OUZJ32cEyi1v1MwD2jCy5yXlT-daYsJsJtuZWLYPTAWBTu1gbNsQR0tVOhUOSK1fN6WoJ0U2gSIRVJHr6CxkzWBHnhdo1ZRZe2Ce7SqkvislwpuEkOsGyi7KRjXUR-VwY8DZbxAbx_Bldq2YNyGesnqyNoSjgr0bshXf-idH2CThaE5ffjN-Hoa88kp_KgTNRT58n3PRr41rPj8aHovPyvdKoIbA",
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
