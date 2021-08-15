import React from 'react';
import './App.css';
import LinePlayground from './components/LinePlayground';
import OldLinePlayground from './components/OldLinePlayground';
import logoImage from './assets/app-logo.svg';

function Header() {
    // const borderColor = '#8c01ff7a';
    const borderColor = '#8e34eb7a';
    const shadow = `-2px -2px 0 ${borderColor}, 2px -2px 0 ${borderColor}, -2px 2px 0 ${borderColor}, 2px 2px 0 ${borderColor}`;
    return (
        <div className="w-full h-64 hidden md:flex items-center ">
            <img className="" src={logoImage} alt="logo" />

            <div className="ml-16 ">
                <div className="text-[5rem] tracking-tighter font-black "
                    style={{
                        color: 'white', //#9494e4
                        textShadow: shadow,
                        'WebkitTextStroke': '1px #8c01ff',
                        'WebkitTextFillColor': '#9494e4'
                    }}
                >
                    D3 Curves
                </div>
                <div className="">
                    <p>Toggle each of the curve types to activate / deactivate the curve. <br className="hidden md:inline"/>
                    You can also add/remove/drag the points to change the shape of the curve.</p>
                </div>
            </div>
        </div>
    );
}

function Background() {
    return (
        <div className="fixed w-full h-full bg-yellow-200 pointer-events-none z-[-1]"></div>
    );
}

function App() {
    return (
        <>
            <Background />
            <div className="App h-screen flex flex-col">
                <Header />
                <div className="flex-1">
                    <LinePlayground />
                </div>
                {/* <OldLinePlayground /> */}
            </div >
        </>
    );
}

export default App;
