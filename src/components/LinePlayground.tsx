import React from 'react';
import * as d3 from 'd3';
import { useAtom } from 'jotai';
import { linePathesAtom, linesAtom, pointsAtom } from '../store/store';
import { styled } from '@stitches/react';
import { CURVEINFO } from '../store/datum';

const LinePoint = styled('circle', {
    fill: '#00d7ff5a',
    stroke: '#0018aa',
    strokeWidth: '2',
    cursor: 'move',
    r: 14,
});

const LinePath = styled('path', {
    strokeWidth: '7',
    fill: 'none',
    variants: {
        lineStyle: {
            1: {
                strokeDasharray: '2,2',
            },
            2: {
                strokeDasharray: '8,8',
            },
        }
    }
});

const gColor = [
    '#3366cc',
    '#ff9900',
    '#109618',
    '#990099',
    '#dc3912',
    '#0099c6',
    '#dd4477',
    '#66aa00',
    '#b82e2e',
    '#316395',
    '#994499',
    '#22aa99',
    '#aaaa11',
    '#6633cc',
    '#e67300',
    '#8b0707',
    '#651067',
    '#329262',
    '#5574a6',
    '#3b3eac'
];

// const categoryScale = d3.scaleOrdinal<number, string>(d3.schemeCategory10);
// const categoryScale = d3.scaleOrdinal<number, string>(gColor);
// function colorScale(d: number) { return categoryScale(d); }
function colorScale(n: number) { return gColor[n % gColor.length]; }

function LinePlayground() {
    const [points] = useAtom(pointsAtom);

    const [lines] = useAtom(linesAtom);
    const [linePathes] = useAtom(linePathesAtom);

    const svgW = 600;
    const svgH = 600;

    return (
        <div className="bg-purple-100">
            <svg viewBox={`0 0 ${svgW} ${svgH}`} className="bg-yellow-50">
                <g>
                    {points.map((pt, idx) => (
                        <LinePoint cx={pt[0]} cy={pt[1]} key={idx} />
                    ))}
                </g>
                <g>
                    {lines.map((line) => (line.active &&
                        <LinePath
                            key={line.idx}
                            d={linePathes[line.idx]}
                            lineStyle={CURVEINFO[line.idx].lineStyle}
                            stroke={colorScale(CURVEINFO[line.idx].grpIdx)}
                        />
                    ))}
                </g>
            </svg>

            <div className="">
                <div className="">
                    Info
                </div>
                <div className="bg-[tomato] flex">
                    {lines.map((line, idx) => {
                        return <label className="flex flex-col items-center">
                            <input type="checkbox" />
                            <div className="" style={{writingMode: 'vertical-lr'}}>{CURVEINFO[idx].name}</div>
                        </label>;
                    })}
                </div>

            </div>
        </div>
    );
}

export default LinePlayground;
