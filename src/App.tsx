import React from 'react';
import './App.css';
import LinePlayground from './components/LinePlayground';
import OldLinePlayground from './components/OldLinePlayground';
import logoImage from './assets/app-logo.svg';

function App() {
    return (
        <div className="App">
            <div className="">
                <img src={logoImage} alt="logo" />
            </div>
            <LinePlayground />
            {/* <OldLinePlayground /> */}
        </div>
    );
}

export default App;
