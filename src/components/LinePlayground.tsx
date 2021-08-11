import React from 'react';
import * as d3 from 'd3';
import { a, useSpring } from '@react-spring/web';
import { useAtom } from 'jotai';
import { allLinesSetAtom, colorScale, lineCheckAtom, LineData, LineHintIdxAtom, linePathesAtom, linesAtom, pointsAtom, setPointAtom } from '../store/store';
import { css, styled } from '@stitches/react';
import { CURVEINFO } from '../store/datum';
import { useDrag, useHover } from 'react-use-gesture';
import { pointer } from '../hooks/pointer';
import lineTypeUrl0 from '../assets/dashed-line0.svg';
import lineTypeUrl1 from '../assets/dashed-line11.svg';
import lineTypeUrl2 from '../assets/dashed-line2.svg';
import Tooltip from 'react-tooltip';

const dotStyles = css({
    fill: '#00d7ff5a',
    stroke: '#0018aa20',
    strokeWidth: '2',
    cursor: 'move',
});

function Dot(props: { idx: number, cx: number, cy: number; }) {
    const { idx, cx, cy } = props;
    const [_, setPoint] = useAtom(setPointAtom);
    const ref = React.useRef(null);
    const bind = useDrag(({ event }) => setPoint({ idx, value: pointer(event, ref.current) }));
    return (
        <>
            <circle ref={ref} {...bind()} className={dotStyles()} cx={cx} cy={cy} r={14} />
            <path
                transform={`translate(${cx - 10.5}, ${cy - 10.5}) scale(1.2)`} fill="white" stroke="none"
                d="M.6 3.7A7.2 7.2 0 014 .5 5 5 0 015.6 0l.3 2a7 7 0 00-2 1A6.3 6.3 0 002 4.4zm-.3.9A6.7 6.7 0 000 5.9a9.6 9.6 0 000 1.4h.6a6.3 6.3 0 011-2.1z"
            />
        </>
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
            <tspan className={dotTextStyles()} x={cx - 32} y={cy - 8}>{idx + 1}</tspan>
        </text>
    );
}

const LinePath = styled('path', {
    strokeWidth: '5',
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

function Viewer() {
    const [points] = useAtom(pointsAtom);
    const [linePathes] = useAtom(linePathesAtom);
    const [lines] = useAtom(linesAtom);

    const svgW = 600;
    const svgH = 600;

    return (
        <svg viewBox={`0 0 ${svgW} ${svgH}`} className="select-none bg-yellow-50">
            <g>
                {points.map((pt, idx) => <Dot idx={idx} cx={pt[0]} cy={pt[1]} key={idx} />)}
                {lines.map((line) => (line.active &&
                    <LinePath
                        key={line.idx}
                        d={linePathes[line.idx]}
                        lineStyle={CURVEINFO[line.idx].lineStyle}
                        stroke={`${colorScale(CURVEINFO[line.idx].grpIdx)}cf`}
                    />
                ))}
                {points.map((pt, idx) => <DotText idx={idx} cx={pt[0]} cy={pt[1]} key={idx} />)}
            </g>
        </svg>
    );
}

function InfoPanel() {
    const [hint] = useAtom(LineHintIdxAtom);
    return (
        <div className="info h-20 p-2 text-xs rounded bg-blue-100 flex flex-col justify-between">
            <span className="default">
                {
                    hint === -1 ?
                        (<>
                            <p>Toggle each of the curve types to activate / deactivate the curve.</p>
                            <p>You can also add/remove/drag the points to change the shape of the curve.</p>
                        </>)
                        :
                        <p>{CURVEINFO[hint].info}</p>
                }
            </span>
            <span className="text"></span>
            <span className="points"></span>
        </div>
    );
}

function MenuHeader() {
    const [all, setAll] = useAtom(allLinesSetAtom);
    return (
        <div className="mt-2 pl-2 pr-3 flex justify-between items-center">
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
                title="Toggle all"
            />
        </div>
    );
}

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

const tooltipStyles = css({
    maxWidth: '20rem',
    backgroundColor: '#28284e !important',
    '&::after': {
        borderLeftColor: '#28284e !important',
    }
});

function MenuCheckboxRow({ line, idx }: { line: LineData, idx: number; }) {
    const [_, setHint] = useAtom(LineHintIdxAtom);
    const [value, setValue] = useAtom(lineCheckAtom);
    const checked = value(idx);
    const curve = CURVEINFO[line.idx];
    const { width } = useSpring({ to: { width: checked ? 0 : 48 }, config: { tension: 500 } });
    const hoverRef = useHover(({ hovering: e }) => {
        setHint(e ? idx : -1);
    });

    return (
        <label className="flex items-center justify-between cursor-pointer" key={idx} {...hoverRef()}>
            <div className="flex items-center">
                {/* Checkbox */}
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
                {/* Bar */}
                <a.div style={{ '--size': width } as any}>
                    <CheckboxBar
                        className="-ml-6 w-16 h-7 rounded"
                        style={{ '--color': colorScale(curve.grpIdx) } as any}
                        lineStyle={value(idx) ? curve.lineStyle : -1}
                    />
                </a.div>
                {/* Text */}
                <div className="ml-2">{CURVEINFO[idx].name}</div>
            </div>
            {/* Info icon */}
            <div className="text-gray-600" data-tip="" data-class={`${tooltipStyles()}`}>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
        </label>
    );
}

function Menu() {
    const [lines] = useAtom(linesAtom);
    return (
        <div className="p-2 space-y-1 flex flex-col text-sm select-none">
            {lines.map((line, idx) => <MenuCheckboxRow line={line} idx={idx} key={idx} />)}
        </div>
    );
}

function LinePlayground() {
    const [hint] = useAtom(LineHintIdxAtom);
    return (
        <div className="bg-purple-100">
            <Viewer />
            <div className="">
                <InfoPanel />
                <MenuHeader />
                <Menu />
            </div>
            <Tooltip delayShow={200} effect="solid">{hint === -1 ? '' : CURVEINFO[hint].info}</Tooltip>
        </div>
    );
}

export default LinePlayground;
