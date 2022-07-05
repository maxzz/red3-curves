import React from 'react';
import { Section2_Main } from '@/components/Section2_Main';
import './App.css';
// import AppBackground from './assets/bkg/pattern.svg';
import AppBackground from './assets/bkg/app-bkg.png'; // graphcoders-lil-fiber.png
import { Section1_Header } from './components/Section1_Header';

function Background() {
    return (
        <div className="fixed w-full h-full bg-yellow-200 pointer-events-none z-[-1]"
            style={{ background: `url(${AppBackground}), linear-gradient(to right, #ff7800d4, #ffffff00)` }} //#6e88a0
        />
    );
}

function App() {
    return (
        <>
            <Background />
            
            <div className="App h-screen flex flex-col items-center text-yellow-900">
                <Section1_Header />

                <Section2_Main />

                <div className="m-4 mb-12 hidden lg:flex flex-col items-center text-sm">
                    <span>Created by Max Zakharzhevskiy</span>
                    <p>Based on <a
                        className="underline" href="https://bl.ocks.org/d3indepth/raw/b6d4845973089bc1012dec1674d3aff8" target="_blank" rel="noopener">D3 Curve Explorer</a> from <a
                            className="underline" href="https://www.d3indepth.com/shapes" target="_blank" rel="noopener">D3 in Depth</a> book by Peter Cook
                    </p>
                    <span>Open sourced on <a className="underline" href="https://github.com/maxzz/red3-curves" target="_blank" rel="noopener">Github</a></span>
                </div>
            </div>
        </>
    );
}

export default App;
