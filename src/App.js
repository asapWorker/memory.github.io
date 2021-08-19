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
            token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZTFmNTQxODM0NzEwNjkyNzAzM2QwYTQ0ODFmMTNkNTJiMTA1N2NhMWNkY2I0OTg0ZGNiMWQxZjQzMzdhMzYyNTM5YmU5MjcwMDQyNjI5OCIsImF1ZCI6IlZQUyIsImV4cCI6MTYyOTQ3NDE4NywiaWF0IjoxNjI5Mzg3Nzc3LCJpc3MiOiJLRVlNQVNURVIiLCJ0eXBlIjoiQmVhcmVyIiwianRpIjoiN2EzYmYyZTAtNjdiMy00N2JiLWJiZmQtZjIzNWZmMzQ4OTFkIiwic2lkIjoiOWQ4MzI3ZmMtZGUwMC00MmU3LWJjNWUtYmYwZTcyOTdiNzJkIn0.YCNkHB9BGF4FTDxSHJkCWQSi7hb_Hdnip29XNWe0DACgHS_9I3Ez4hbveEzO1ugKG9Ftnv52Z5F7-MK36_qEMrA0-fP1qJYezEtBX780C4f1uHhZ4YQ8O3IPKXRPuPNXd8eLelJbVl7-1YhyB3VDMIUDboZiR4uu6XpdWj75hkzB3gyyxO778GJVi7DRr4Ot2uWRZRaEWVUA5WY-_tLmw2JN5ucI0yd6xHRfwN9--dORRNX6rlS8OCIH3Z6ELoIrsIyiNdyvogJkz6WT57tRqrVDhbR4ZNFhZyb3skj6AePlofzQHPF9RG7TcIs9UmqMj2A2pg9RLfRvqxOuchRrHkD-k4o7MmV5407kYWB8YHCHBqQrYA-2HfzW1Djvvl9HofNigy3AnC3MsLzzAHbpkV6Z7cOmhQ0CLhtgexiKWhLdYDk8U35t1Kpo6dPbdt-KT7tompTSvWr4SXMrrrhDHwiHh2URqv-8KfNFUzHGo7EHabYHQ0rexoXO2E6Pl2xuQo84yIKcZVMGmyWLy4sx8OMgXhYKPpGC4cyNvhBpKA_bQ6zje1ftYwUFFcQedVqNir6o1nCndWPNsgqK5PReugJyD-kooPPgpfkkm-VX4HNNU2ZPSAJMZc1SaUo81DHTz5j82fNVaRZNrfZzVjYgNEBiMTgeEGOcZScG8-K1POE",
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
