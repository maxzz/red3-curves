import React from 'react';
import { useAtom } from 'jotai';
import { pointsAtom } from '../store/store';

function LinePlayground() {
    const [points] = useAtom(pointsAtom);
    return (
        <div>
            <svg>
                <g>
                    {points.map((pt, idx) => (
                        <circle cx={pt[0]} cy={pt[1]} r={5} key={idx} />
                    ))}
                </g>
            </svg>

        </div>
    );
}

export default LinePlayground;
