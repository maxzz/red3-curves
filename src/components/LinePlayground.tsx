import React from 'react';
import * as d3 from 'd3';
import { useAtom } from 'jotai';
import { colorScale, lineCheckAtom, LineData, linePathesAtom, linesAtom, pointsAtom, setPointAtom } from '../store/store';
import { css, styled } from '@stitches/react';
import { CURVEINFO } from '../store/datum';
import { useDrag } from 'react-use-gesture';
import { pointer } from '../hooks/pointer';

const lineDotStyles = css({
    fill: '#00d7ff5a',
    stroke: '#0018aa',
    strokeWidth: '2',
    cursor: 'move',
    r: 14,
});

const lineDotTextStyles = css({
    fill: '#00d7ff5a',
    stroke: '#0018aa',
    strokeWidth: '.6',
    fontSize: '1.4rem',
});

function LinePoint(props: { idx: number, cx: number, cy: number; }) {
    const { idx, cx, cy } = props;
    const [_, setPoint] = useAtom(setPointAtom);
    const ref = React.useRef(null);

    const bind = useDrag(({ event, xy }) => {
        //console.log('event', xy);

        const newxy = pointer(event, ref.current);
        setPoint({ idx, value: newxy });
    });

    return (
        <>
            <circle ref={ref} {...bind()} className={lineDotStyles()} cx={cx} cy={cy} />
            <text>
                <tspan className={lineDotTextStyles()} x={cx - 24} y={cy - 16}>{idx}</tspan>
            </text>
        </>
    );
}

const LinePath = styled('path', {
    strokeWidth: '7',
    strokeLinejoin: 'round',
    fill: 'none',
    pointerEvents: 'none',
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

function CheckboxRow({ line, idx }: { line: LineData, idx: number; }) {
    const [value, setValue] = useAtom(lineCheckAtom);
    return (
        <label className="flex items-center cursor-pointer" key={idx}>
            {/* space-x-2 */}
            <input
                className="ml-2 h-4 w-4 appearance-none rounded
                    text-green-600 border border-[#006f94]
                    bg-[#ffffff70] 
                    checked:bg-[#ffffff70] checked:border-transparent 
                    checked:bg-ui-check
                    focus:outline-none
                    z-10" type="checkbox"
                checked={value(idx)}
                onChange={(e) => setValue({ idx, value: e.target.checked })}
            />
            <div className="-ml-6 w-12 h-7 rounded" style={{ backgroundColor: colorScale(CURVEINFO[line.idx].grpIdx) }}></div>
            <div className="ml-2">{CURVEINFO[idx].name}</div>
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
            {/* Viewer */}
            <svg viewBox={`0 0 ${svgW} ${svgH}`} className="bg-yellow-50">
                <g>
                    {points.map((pt, idx) => <LinePoint idx={idx} cx={pt[0]} cy={pt[1]} key={idx} />)}
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

            {/* Controls */}
            <div className="">
                <div className="">
                    Info
                </div>
                <div className="p-2 space-y-1 flex flex-col text-sm select-none">
                    {lines.map((line, idx) => <CheckboxRow line={line} idx={idx} key={idx} />)}
                </div>
            </div>
        </div>
    );
}

export default LinePlayground;
