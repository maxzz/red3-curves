import React from 'react';
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
    stroke: 'blue',
    strokeWidth: '7',
    fill: 'none',
    variants: {
        lineStyle: {
            0: {
                fill: 'red',
            },
            1: {
                fill: 'tomato',
            },
            2: {
                fill: 'green',
            },
        }
    }
});

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
                        />
                    ))}
                </g>
            </svg>

        </div>
    );
}

export default LinePlayground;
