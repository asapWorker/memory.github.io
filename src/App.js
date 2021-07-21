import React, {useEffect, useState} from "react";
import './App.css';
import {Menu} from './components/menu/menu.js'
import {Game} from './components/game/game'
import {AppProvider} from "./AppContext";
import {Result} from "./components/result/result";

function App() {
    const [page, setPage] = useState({value: 0});

    function renderComponent() {
        switch (page.value) {
            case 1:
                return <Game/>
            case 2:
                setTimeout(() => setPage({...page, value: 1}), 0)
                return <div/>
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
