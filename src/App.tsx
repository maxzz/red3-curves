import React from 'react';
import './App.css';
import LinePlayground from './components/LinePlayground';
import OldLinePlayground from './components/OldLinePlayground';
import logoImage from './assets/app-logo.svg';
import { css } from '@stitches/react';
import HeroAttraction from './components/HeroAttraction';
// import AppBackground from './assets/bkg/pattern.svg';
import AppBackground from './assets/bkg/app-bkg.png'; // graphcoders-lil-fiber.png

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
        <div className="m-8 hidden md:flex justify-center items-center ">

            <div className="">
                <div className="">

                    <div className="flex items-center">
                        <div className="">
                            <img className="" src={logoImage} alt="logo" />
                        </div>
                        <div className={`text-[5rem] -ml-4 place-self-end tracking-tighter font-black ${HeroTitleStyles()}`}>
                            D3 Curves
                        </div>
                    </div>

                    <div className="text-base">
                        <p>Toggle each of the curve types to activate / deactivate the curve. <br className="hidden md:inline" />
                            You can also add/remove/drag the points to change the shape of the curve.</p>
                    </div>
                </div>
                {/* <HeroAttraction /> */}
            </div>

            {/* <div className="flex-shrink max-w-[128px]">
                <img className="" src={logoImage} alt="logo" />
            </div> */}

        </div>
    );
}

function Background() {
    return (
        <div className="fixed w-full h-full bg-yellow-200 pointer-events-none z-[-1]"
        style={{background: `url(${AppBackground}), linear-gradient(to right, #6e88a0, #ffffff00)`}}
        >
        </div>
    );
}

function App() {
    return (
        <>
            <Background />
            <div className="App h-screen flex flex-col items-center text-gray-900">
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
