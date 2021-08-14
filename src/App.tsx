import React from 'react';
import './App.css';
import LinePlayground from './components/LinePlayground';
import OldLinePlayground from './components/OldLinePlayground';
import logoImage from './assets/app-logo.svg';

function App() {
    return (
        <div className="App">
            <div className="flex">
                <img src={logoImage} alt="logo" />
                <div className="flex-1 self-center text-[4rem] font-extrabold">D3 cusrves</div>
            </div>
            <LinePlayground />
            {/* <OldLinePlayground /> */}
        </div>
    );
}

export default App;
