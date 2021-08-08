import React from 'react';
import { useAtom } from 'jotai';
import { linePathesAtom, linesAtom, pointsAtom } from '../store/store';
import { styled } from '@stitches/react';

const LinePoint = styled('circle', {
    fill: '#00d7ff5a',
    stroke: '#0018aa',
    strokeWidth: '2',
    cursor: 'move',
    r: 14,
});

const LinePath = styled('path', {

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
                        line.active && <LinePath d={linePathes[line.idx]} key={line.idx} />
                    ))}
                </g>
            </svg>

        </div>
    );
}

export default LinePlayground;
