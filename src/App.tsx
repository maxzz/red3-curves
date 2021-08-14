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
                <div className="flex-1 self-center text-4xl font-extrabold">D3 cusrves</div>
                <svg viewBox="0 0 300 300">
                    <text>
                        <tspan className="text-[2.5rem]" fill="black" x={0} y={'50%'}>D3 curves</tspan>
                        <tspan className="text-4xl" fill="black" x={0} y={'70%'}>D3 curves</tspan>
                    </text>
                </svg>
            </div>
            <LinePlayground />
            {/* <OldLinePlayground /> */}
        </div>
    );
}

export default App;
