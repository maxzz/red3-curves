import React from 'react';
import { Section1_Header } from './components/Section1_Header';
import { Section2_Main } from '@/components/Section2_Main';
import AppBackground from './assets/bkg/app-bkg.png'; // graphcoders-lil-fiber.png
//import AppBackground from './assets/bkg/pattern.svg';
import './App.css';
import { Section3_Footer } from './components/Section3_Footer';

function Background() {
    return (
        <div className="fixed w-full h-full bg-yellow-200 pointer-events-none z-[-1]"
            style={{ background: `url(${AppBackground}), linear-gradient(to right, #ff7800d4, #ffffff00)` }} //#6e88a0
        />
    );
}

export function App() {
    return (<>
        <Background />

        <div className="App h-screen flex flex-col items-center text-yellow-900 debug-screens">
            <Section1_Header />
            <main className="flex-1 w-full">
                <Section2_Main />
            </main>
            <Section3_Footer />
        </div>
    </>);
}
