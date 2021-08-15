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
                <div className="w-full h-full flex place-items-end bg-yellow-700">
                    {/* preserveAspectRatio="none" */}
                    <svg className="h-[96px] bg-red-300" viewBox="0 0 500 96" preserveAspectRatio="none">
                        <g style={{transform: 'scale(.3) translate(0px, 50px)'}}>
                            <text>
                                <tspan className="text-[96px] uppercase" fill="none" stroke="red" x={0} y={'30%'}>Data-Driven Documents Curves</tspan>
                            </text>
                        </g>
                    </svg>

                    {/* <svg className="w-full h-56 bg-purple-100" viewBox="0 0 300 300" >
                        <text>
                            <tspan className="text-[7rem]" fill="black" x={0} y={'60%'}>Data Driven Document Curves</tspan>
                        </text>
                    </svg> */}

                    {/* <tspan className="text-4xl" fill="black" x={0} y={'70%'}>D3 curves</tspan> */}
                </div>
            </div>
            <LinePlayground />
            {/* <OldLinePlayground /> */}
        </div>
    );
}

export default App;
