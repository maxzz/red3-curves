import React from 'react';
import * as d3 from 'd3';
import { a, useSpring } from '@react-spring/web';
import { useAtom } from 'jotai';
import { colorScale, lineCheckAtom, LineData, linePathesAtom, linesAtom, pointsAtom, setPointAtom } from '../store/store';
import { css, styled } from '@stitches/react';
import { CURVEINFO } from '../store/datum';
import { useDrag } from 'react-use-gesture';
import { pointer } from '../hooks/pointer';
import lineTypeUrl0 from '../assets/dashed-line0.svg';
import lineTypeUrl1 from '../assets/dashed-line11.svg';
import lineTypeUrl2 from '../assets/dashed-line2.svg';

const dotStyles = css({
    fill: '#00d7ff5a',
    stroke: '#0018aa',
    strokeWidth: '2',
    cursor: 'move',
});

function Dot(props: { idx: number, cx: number, cy: number; }) {
    const { idx, cx, cy } = props;
    const [_, setPoint] = useAtom(setPointAtom);
    const ref = React.useRef(null);
    const bind = useDrag(({ event }) => setPoint({ idx, value: pointer(event, ref.current) }));
    return (
        <circle ref={ref} {...bind()} className={dotStyles()} cx={cx} cy={cy} r={14} />
    );
}

const dotTextStyles = css({
    fill: '#0018aa',
    stroke: '#ffffff40',
    strokeWidth: '1',
    fontSize: '1.5rem',
});

function DotText(props: { idx: number, cx: number, cy: number; }) {
    const { idx, cx, cy } = props;
    return (
        <text>
            <tspan className={dotTextStyles()} x={cx - 32} y={cy - 8}>{idx}</tspan>
        </text>
    );
}

const LinePath = styled('path', {
    strokeWidth: '7',
    strokeLinejoin: 'round',
    fill: 'none',
    pointerEvents: 'none',
    variants: {
        lineStyle: {
            1: { strokeDasharray: '2,2', },
            2: { strokeDasharray: '8,8', },
        }
    }
});

const CheckboxBar = styled('div', {
    position: 'relative',
    overflow: 'hidden',
    outline: '1px solid #79797942',
    backgroundColor: '#80808020',

    '&::before': {
        content: "",
        position: "absolute",
        inset: "0",
        backgroundColor: "var(--color)",
        borderRadius: '4px',
        transform: "scaleX(calc(calc(100 - var(--size)) * 1%))",
        transformOrigin: "left"
    },

    '&::after': {
        content: "",
        position: 'absolute',
        inset: 0,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '32% 120%',
        backgroundPosition: '85% -65%',
        mixBlendMode: 'multiply',
        //transform: 'scaleX(calc(calc(100 - var(--size)) * 1%))',
    },
    variants: {
        lineStyle: {
            0: { '&::after': { backgroundImage: `url("${lineTypeUrl0}")` } },
            1: { '&::after': { backgroundImage: `url("${lineTypeUrl1}")` } },
            2: { '&::after': { backgroundImage: `url("${lineTypeUrl2}")` } },
        }
    },
});

function CheckboxRow({ line, idx }: { line: LineData, idx: number; }) {
    const [value, setValue] = useAtom(lineCheckAtom);
    const checked = value(idx);
    const curve = CURVEINFO[line.idx];
    const pro = useSpring({ to: { width: checked ? 0 : 48 }, config: { tension: 500 } });

    return (
        <label className="flex items-center cursor-pointer" key={idx}>
            <input
                className="ml-2 h-4 w-4 flex-none appearance-none rounded
                    text-green-600 border border-[#006f94]
                    bg-[#ffffff70] 
                    checked:bg-[#ffffff70] checked:border-transparent 
                    checked:bg-ui-check
                    focus:outline-none
                    z-10" type="checkbox"
                checked={value(idx)}
                onChange={(e) => setValue({ idx, value: e.target.checked })}
            />
            <a.div style={{ '--size': pro.width } as any}>
                <CheckboxBar
                    className="-ml-6 w-16 h-7 rounded"
                    style={{ '--color': colorScale(curve.grpIdx) } as any}
                    lineStyle={value(idx) ? curve.lineStyle : -1}
                />
            </a.div>
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

    const [all, setAll] = React.useState(false);

    return (
        <div className="bg-purple-100">
            {/* Viewer */}
            <svg viewBox={`0 0 ${svgW} ${svgH}`} className="bg-yellow-50">
                <g>
                    {points.map((pt, idx) => <Dot idx={idx} cx={pt[0]} cy={pt[1]} key={idx} />)}
                    {lines.map((line) => (line.active &&
                        <LinePath
                            key={line.idx}
                            d={linePathes[line.idx]}
                            lineStyle={CURVEINFO[line.idx].lineStyle}
                            stroke={colorScale(CURVEINFO[line.idx].grpIdx)}
                        />
                    ))}
                    {points.map((pt, idx) => <DotText idx={idx} cx={pt[0]} cy={pt[1]} key={idx} />)}
                </g>
            </svg>

            {/* Controls */}
            <div className="">
                {/* Info panel */}
                <div className="info h-20 p-2 text-xs rounded bg-blue-100 flex flex-col justify-between">
                    <span className="default">
                        <p>Toggle each of the curve types to activate / deactivate the curve.</p>
                        <p>You can also add/remove/drag the points to change the shape of the curve.</p>
                    </span>
                    <span className="text"></span>
                    <span className="points"></span>
                </div>


                {/* Menu header */}
                <div className="mt-2 px-2 flex justify-between items-center">
                    <div className="flex items-center space-x-1">
                        <span>D3 curve types to interpolate a set of points:</span>
                        <a className="" href="https://github.com/d3/d3-shape#curves" target="_blank">
                        
                            <svg className="h-4 w-4 pt-0.5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                            </svg>
                        </a>
                    </div>
                    <input
                        className="ml-2 h-4 w-4 flex-none appearance-none rounded
                            text-green-100 border border-[#006f94]
                            bg-[#ffffff70]
                            checked:bg-[#ffffff70]
                            checked:bg-ui-check
                            focus:outline-none
                            z-10" type="checkbox"
                        checked={all}
                        onChange={(e) => setAll(e.target.checked)}
                    />
                </div>

                {/* Menu */}
                <div className="p-2 space-y-1 flex flex-col text-sm select-none">
                    {lines.map((line, idx) => <CheckboxRow line={line} idx={idx} key={idx} />)}
                </div>
            </div>
        </div>
    );
}

export default LinePlayground;
