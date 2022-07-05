import React from 'react'
import { css } from '@stitches/react';
import HeroAttraction from '@/components/UI/HeroAttraction';
import logoImage from '@/assets/app-logo.svg';

const HeroTitleStyles = css({
    $$borderColor: '#8e34eb7a', // '#8c01ff7a'
    $$shadow: `-2px -2px 0 $$borderColor, 2px -2px 0 $$borderColor, -2px 2px 0 $$borderColor, 2px 2px 0 $$borderColor`,
    color: '#9494e4',
    textShadow: '$$shadow',
    'WebkitTextStroke': '1px #8c01ff',
    'WebkitTextFillColor': '#9494e4'
});

export function Section1_Header() {
    return (
        <header className="m-8 hidden lg:flex justify-center items-center ">

            <div className="">
                <div className="">

                    {/* Logo and D3 curves */}
                    <div className="flex items-center">
                        <div className="">
                            <img className="" src={logoImage} alt="logo" />
                        </div>
                        <h1 className={`text-[5rem] -ml-4 self-end tracking-tighter font-black ${HeroTitleStyles()}`}>
                            D3 Curves
                        </h1>
                    </div>

                    <div className="ml-16 mb-4 text-base">
                        <p>Toggle each of the curve types to activate / deactivate the curve. <br className="hidden md:inline" />
                            You can also add/remove/drag the points to change the shape of the curve.</p>
                    </div>
                </div>
                {/* <HeroAttraction /> */}
            </div>
        </header>
    );
}
