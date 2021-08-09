import React from 'react';
import * as d3 from 'd3';
import { useAtom } from 'jotai';
import { colorScale, LineData, linePathesAtom, linesAtom, pointsAtom } from '../store/store';
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

function CheckboxRow({ line, idx }: { line: LineData, idx: number }) {
    return (
        <label className="flex items-center space-x-2 cursor-pointer" key={idx}>
            <input className="w-4 h-4 mb-0.5" type="checkbox" />
            <div className="w-12 h-4" style={{ backgroundColor: colorScale(CURVEINFO[line.idx].grpIdx) }}></div>
            <div className="">{CURVEINFO[idx].name}</div>
        </label>
    );
}

function LinePlayground() {
    const [points] = useAtom(pointsAtom);
    const [linePathes] = useAtom(linePathesAtom);
    const [lines] = useAtom(linesAtom);

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
                <div className="p-2 bg-[tomato] flex flex-col text-sm select-none">
                    {lines.map((line, idx) => <CheckboxRow line={line} idx={idx} key={idx} />)}
                </div>

            </div>
        </div>
    );
}

export default LinePlayground;
