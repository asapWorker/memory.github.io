import React, {useState} from "react";
import './App.css';
import {Menu} from './components/menu/menu.js'
import {Game} from './components/game/game'
import {AppProvider} from "./AppContext";

function App() {
    const [page, setPage] = useState({value: 0});


    function renderComponent() {
        switch (page.value) {
            case 1:
                return <Game/>
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
