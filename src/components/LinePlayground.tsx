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
            0: {
            },
            1: {
                strokeDasharray: '2,2',
            },
            2: {
                strokeDasharray: '8,8',
            },
        }
    }
});

const categoryScale = d3.scaleOrdinal<number, string>(d3.schemeCategory10);
function colorScale(d: number) { return categoryScale(d); }

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
                    {lines.map((line) => (
                        line.active && <LinePath
                            key={line.idx}
                            d={linePathes[line.idx]}
                            lineStyle={CURVEINFO[line.idx].lineStyle}
                            stroke={colorScale(CURVEINFO[line.idx].grpIdx)}
                        />
                    ))}
                </g>
            </svg>

        </div>
    );
}

export default LinePlayground;
