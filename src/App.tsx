import React from 'react';
import './App.css';
import LinePlayground from './components/LinePlayground';
import OldLinePlayground from './components/OldLinePlayground';
import logoImage from './assets/app-logo.svg';

function Header() {
    // const borderColor = '#8c01ff7a';
    const borderColor = '#8e34eb7a';
    return (
        <div className="w-full h-64 flex items-center ">
            <img className="" src={logoImage} alt="logo" />
            <div className="text-[5rem] tracking-tighter font-black "
                style={{//bg-yellow-700 //bg-yellow-800

                    color: 'white', //#9494e4

                    textShadow:
                        `
            -2px -2px 0 ${borderColor},
            2px -2px 0 ${borderColor},
            -2px 2px 0 ${borderColor},
            2px 2px 0 ${borderColor}
            `,

                    '-webkit-text-stroke': '1px #8c01ff',
                    '-webkit-text-fill-color': '#9494e4'
                } as React.CSSProperties}
            >
                D3 Curves
            </div>
        </div>
    );
}

function App() {
    return (
        <div className="App bg-yellow-50">
            <Header />
            <LinePlayground />
            {/* <OldLinePlayground /> */}
        </div >
    );
}

export default App;

