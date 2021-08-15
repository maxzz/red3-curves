import React from 'react';
import './App.css';
import LinePlayground from './components/LinePlayground';
import OldLinePlayground from './components/OldLinePlayground';
import logoImage from './assets/app-logo.svg';
import { css } from '@stitches/react';

const HeroTitleStyles = css({
    $$borderColor: '#8e34eb7a', // '#8c01ff7a'
    $$shadow: `-2px -2px 0 $$borderColor, 2px -2px 0 $$borderColor, -2px 2px 0 $$borderColor, 2px 2px 0 $$borderColor`,
    color: '#9494e4',
    textShadow: '$$shadow',
    'WebkitTextStroke': '1px #8c01ff',
    'WebkitTextFillColor': '#9494e4'
});

function Header() {
    return (
        <div className="w-full h-64 hidden md:flex items-center ">
            <div className="flex-shrink">
                <img className="" src={logoImage} alt="logo" />
            </div>

            <div className="ml-16 ">
                <div className={`text-[5rem] tracking-tighter font-black ${HeroTitleStyles()}`}>
                    D3 Curves
                </div>
                <div className="text-base">
                    <p>Toggle each of the curve types to activate / deactivate the curve. <br className="hidden md:inline" />
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
