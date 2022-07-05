import React from 'react';

export function Section3_Footer() {
    return (
        <div className="m-4 mb-12 hidden lg:flex flex-col items-center text-sm">
            <span>Created by Max Zakharzhevskiy</span>

            <p>
                Based on <a className="underline" href="https://bl.ocks.org/d3indepth/raw/b6d4845973089bc1012dec1674d3aff8" target="_blank" rel="noopener">
                    D3 Curve Explorer
                </a> from <a
                    className="underline" href="https://www.d3indepth.com/shapes" target="_blank" rel="noopener">D3 in Depth</a> book by Peter Cook
            </p>

            <span>Open sourced on <a className="underline" href="https://github.com/maxzz/red3-curves" target="_blank" rel="noopener">Github</a></span>
        </div>
    );
}
