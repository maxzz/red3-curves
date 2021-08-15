import React from 'react';
import './App.css';
import LinePlayground from './components/LinePlayground';
import OldLinePlayground from './components/OldLinePlayground';
import logoImage from './assets/app-logo.svg';

function App() {
    return (
        <div className="App">
            <div className="w-full h-64 flex items-center">
                <img className="bg-yellow-800" src={logoImage} alt="logo" />
                {/* <div className="flex-1 self-center text-4xl font-extrabold">D3 cusrves</div> */}
                <div className="h-full w-full bg-yellow-700">
                    <svg className="" viewBox="0 0 300 300" preserveAspectRatio="none">
                        <text>
                            <tspan className="text-[20]" fill="black" x={0} y={'50'}>D3 curves</tspan>
                            {/* <tspan className="text-4xl" fill="black" x={0} y={'70%'}>D3 curves</tspan> */}
                        </text>
                    </svg>
                </div>
            </div>
            <LinePlayground />
            {/* <OldLinePlayground /> */}
        </div>
    );
}

export default App;
