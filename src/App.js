import React, {useState} from "react";
import './App.css';
import {Menu} from './components/menu/menu.js'
import {Game} from './components/game/game'
import {AppProvider} from "./AppContext";
import {Help} from "./components/help/help";

function App() {
    const [page, setPage] = useState({value: 0});

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
        <AppProvider page={page} setPage={setPage}>
            <div className="App">
                {renderComponent()}
            </div>
        </AppProvider>
    );
}

export default App;
