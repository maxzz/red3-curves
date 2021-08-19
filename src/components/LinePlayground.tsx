import React from 'react';
import { a, useSpring } from '@react-spring/web';
import { useAtom } from 'jotai';
import { useUpdateAtom } from 'jotai/utils';
import { activePointsAtom, allLinesSetAtom, colorScale, DarkShemaAtom, DraggingPointAtom, lineCheckAtom, LineData, LineHintIdxAtom, linePathesAtom, linesAtom, maxNPointsAtom, nActiveAtom, pointsAtom, SchemaAtom, setPointAtom } from '../store/store';
import { createCss } from '@stitches/react';
import { CURVEINFO } from '../store/datum';
import { clamp, withDigits } from '../utils/numbers';
import { useDrag, useHover } from 'react-use-gesture';
import pointer from '../utils/pointer';
import Tooltip from 'react-tooltip';
import useClipcoardCopy from '../hooks/useClipcoardCopy';
import lineTypeUrl0 from '../assets/dashed-line0.svg';
import lineTypeUrl1 from '../assets/dashed-line11.svg';
import lineTypeUrl2 from '../assets/dashed-line2.svg';

const { styled, css } = createCss({ // as usual this goes to stitches.config.ts
    media: {
        bp1: '(min-width: 640px)',
        bp2: '(min-width: 768px)',
        bp3: '(min-width: 1024px)',
    },
});

const svgWidth = 600;
const svgHeight = 600;
const dotRadius = 16; // radius 14 plus 2 for stroke

const dotStyles = css({
    fill: '#00d7ff5a',
    stroke: '#0018aa20',
    strokeWidth: '2',
    cursor: 'move',
});

function Dot(props: { idx: number, cx: number, cy: number; }) {
    const { idx, cx, cy } = props;
    const setPoint = useUpdateAtom(setPointAtom);
    const setDraggingPoint = useUpdateAtom(DraggingPointAtom);
    const ref = React.useRef(null);
    const bind = useDrag(({ event, dragging }) => {
        let pt = pointer(event, ref.current).map(coord => +withDigits(coord, 0)) as [number, number];
        pt[0] = clamp(pt[0], dotRadius, svgWidth - dotRadius);
        pt[1] = clamp(pt[1], dotRadius, svgHeight - dotRadius);
        setPoint({ idx, value: pt });
        setDraggingPoint(dragging ? idx : -1);
    });
    return (
        <>
            <circle ref={ref} {...bind()} className={dotStyles()} cx={cx} cy={cy} r={dotRadius - 2} />
            <path
                transform={`translate(${cx - 10.5}, ${cy - 10.5}) scale(1.2)`} fill="white" stroke="none"
                d="M.6 3.7A7.2 7.2 0 014 .5 5 5 0 015.6 0l.3 2a7 7 0 00-2 1A6.3 6.3 0 002 4.4zm-.3.9A6.7 6.7 0 000 5.9a9.6 9.6 0 000 1.4h.6a6.3 6.3 0 011-2.1z"
            />
        </>
    );
}

const dotTextStyles = css({
    fill: '#6f88f8',
    stroke: '#00000040',
    strokeWidth: '1',
    fontSize: '1.5rem',
});

function DotText(props: { idx: number, cx: number, cy: number; }) {
    let { idx, cx, cy } = props;
    cx = cx - 32 < 0 ? cx + 16 : cx - 32;
    cy = cy - dotRadius - 8 < 0 ? cy + 24 : cy - 8;
    return (
        <text>
            <tspan className={dotTextStyles()} x={cx} y={cy}>{idx + 1}</tspan>
        </text>
    );
}

const LinePath = styled('path', {
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

//stroke: #7cdb77; stroke-width: 7;

function LinePathes() {
    const [linePathes] = useAtom(linePathesAtom);
    const [lines] = useAtom(linesAtom);
    return (
        <>
            {lines.map((line) => (line.active &&
                <React.Fragment key={line.idx}>
                    {/* <LinePath
                        //key={`shadow${line.idx}`}
                        d={linePathes[line.idx]}
                        lineStyle={CURVEINFO[line.idx].lineStyle}
                        stroke={`red`}
                        strokeWidth={7}
                    /> */}
                    <LinePath
                        //key={line.idx}
                        d={linePathes[line.idx]}
                        lineStyle={CURVEINFO[line.idx].lineStyle}
                        stroke={`${colorScale(CURVEINFO[line.idx].grpIdx)}cf`}
                        strokeWidth={5}
                    />
                </React.Fragment>
            ))}
        </>
    );
}

function Viewer({ svgWidth, svgHeight, ...rest }: { svgWidth: number, svgHeight: number; } & React.HTMLAttributes<SVGSVGElement>) {
    const [points] = useAtom(activePointsAtom);
    return (
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} {...rest} >
            {/* <rect x={0} y={0} width={'100%'} height={'100%'} fill='red' /> */} {/* corners */}
            <g>
                {points.map((pt, idx) => <Dot idx={idx} cx={pt[0]} cy={pt[1]} key={idx} />)}
                <LinePathes />
                {points.map((pt, idx) => <DotText idx={idx} cx={pt[0]} cy={pt[1]} key={idx} />)}
            </g>
        </svg>
    );
}

function MenuHeader() {
    const [all, setAll] = useAtom(allLinesSetAtom);
    return (
        <div className="mt-2 pl-2 pr-3 flex justify-between items-center">
            <a className="flex items-center" href="https://github.com/d3/d3-shape#curves" target="_blank" rel="noreferrer">
                D3 curve types to interpolate a set of points:
                <svg className="h-4 w-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
            </a>
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

function InfoIcon({stroke = 1}: {stroke?: number}) {
    return (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={stroke} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );
}

function MenuCheckboxRow({ line, idx }: { line: LineData, idx: number; }) {
    const [value, setValue] = useAtom(lineCheckAtom);
    const checked = value(idx);
    const curve = CURVEINFO[line.idx];
    const { width } = useSpring({ to: { width: checked ? 0 : 48 }, config: { tension: 500 } });

    const setHint = useUpdateAtom(LineHintIdxAtom);
    const hoverRef = useHover(({ hovering: e }) => setHint(e ? idx : -1));

    return (
        <label className="flex items-center cursor-pointer" key={idx}>
            {/* Info icon */}
            <div className="mr-1 h-6 w-6 text-gray-600" data-tip="" data-class={`${tooltipStyles()}`} {...hoverRef()}>
                <InfoIcon />
            </div>
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

function CombinedPathPoints(props: any, ref: React.Ref<HTMLSpanElement>) {
    const [points] = useAtom(pointsAtom); // TODO: use nActive to show italic
    const [dragginPoint] = useAtom(DraggingPointAtom);
    return (
        <span ref={ref} className="flex-none">
            [{points.map((pt, idx) => {
                const sep = idx === points.length - 1 ? '' : ',';
                const s = JSON.stringify(pt);
                return idx === dragginPoint ? <b key={idx}>{s}{sep}</b> : <span key={idx}>{s}{sep}</span>;
            })}]
        </span>
    );
}

const CombinedPathPointsRef = React.forwardRef(CombinedPathPoints);

function PathInfo({ expanded }: { expanded: boolean; }) {
    const { width, opacity } = useSpring({ width: expanded ? '100%' : '0%', opacity: expanded ? 1 : 0, config: { tension: 700 }, });
    const textRef = React.useRef<HTMLSpanElement>(null);
    const [copyResult, copy] = useClipcoardCopy();
    return (
        <div className="">
            <a.div style={{ width, opacity }} className="relative ml-1 text-[0.65rem] flex items-center justify-between">
                <CombinedPathPointsRef ref={textRef} />
                <span
                    className="ml-1 h-4 w-4 text-green-900 bg-green-200 border border-green-600 rounded shadow cursor-pointer select-none"
                    title="Copy the coordinates of points to clipboard"
                    onClick={async () => copy(textRef.current?.innerText)}
                >
                    <svg className="" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                    </svg>
                </span>
                {copyResult.message && <div className="absolute right-5 -top-1/2">
                    <div className={`p-2 rounded shadow-md ${copyResult.error ? 'bg-[red] text-white' : 'bg-[green] text-white'}`}>{copyResult.error ? 'Copy failed (check console)' : 'Copied'}</div>
                </div>}
            </a.div>
        </div>
    );
}

function DarkLightIcon({ dark }: { dark: boolean; }) {
    return (dark
        ?
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
        :
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
    );
}

function ViewerButton({ children, className, disabled = false, title, onClick }: { children: React.ReactNode; className?: string; disabled?: boolean, title: string, onClick: () => void; }) {
    return (
        <div
            className={`w-6 h-6 text-green-900 border bg-green-200 border-green-600 rounded shadow 
                flex items-center justify-center cursor-pointer select-none 
                active:scale-[.97]
                ${disabled ? 'opacity-50' : 'opacity-1'} ${className}`
            }
            style={{boxShadow: '#00000022 1px 1px 0px 0px'}}
            title={title}
            onClick={onClick}
        >
            {children}
        </div>
    );
}

function InfoPanel() {
    const [expanded, setExpanded] = React.useState(false);
    const [nActive, setNActive] = useAtom(nActiveAtom); // const setNActive = useUpdateAtom(nActiveAtom);
    const [maxNPoints] = useAtom(maxNPointsAtom);
    const [darkMode, setDarkMode] = useAtom(DarkShemaAtom);
    return (
        <div className="flex items-center">
            {/* Buttons */}
            <div className="flex items-center space-x-1">
                {/* - */}
                <ViewerButton
                    title="Remove point (minimnum is 2 points)"
                    onClick={() => setNActive(clamp(nActive - 1, 2, maxNPoints))} // setNActive((prev) => prev--); what???
                    disabled={nActive <= 2}
                    className="pb-1"
                >-</ViewerButton>

                {/* + */}
                <ViewerButton
                    title="Add point (maximum is 7 points)"
                    onClick={() => setNActive(clamp(nActive + 1, 2, maxNPoints))}
                    disabled={nActive >= maxNPoints}
                    className="pb-1"
                >+</ViewerButton>

                {/* Color mode */}
                <ViewerButton
                    title="Set dark / light mode"
                    onClick={() => setDarkMode(!darkMode)}
                    className="p-1"
                ><DarkLightIcon dark={!darkMode} /></ViewerButton>

                {/* Info bar */}
                <ViewerButton
                    title="Show/Hide the coordinates of points"
                    onClick={() => setExpanded((prev) => !prev)}
                    className="p-0.5"
                ><InfoIcon stroke={2} /></ViewerButton>
            </div>
            {/* Generated text */}
            <PathInfo expanded={expanded} />
        </div>
    );
}

const tooltipStyles = css({
    maxWidth: '20rem',
    backgroundColor: '#28284e !important',
});

function HintTooltip() {
    const [hint] = useAtom(LineHintIdxAtom);
    return (
        <Tooltip delayShow={200} effect="solid">{hint === -1 ? '' : CURVEINFO[hint].info}</Tooltip>
    );
}

const containerStyles = css({
    '@bp3': {
        gridTemplateColumns: 'minmax(604px, 1fr) max-content'
    },
});

function LinePlayground() {
    const [{ viewer: { background } }] = useAtom(SchemaAtom);
    return (
        <div className="select-none max-w-[600px] lg:max-w-max lg:w-auto mx-auto">
            {/* <div className="select-none max-w-full sm:max-w-max lg:w-auto mx-auto"> */}
            {/* Viewer and Controls */}
            <div className={`grid grid-cols-1 ${containerStyles()}`}>

                {/* Viewer bg-yellow-100 lg:bg-purple-500 */}
                {/* Viewer bg-[#bb86003b] lg:bg-purple-500 */}
                <div className={`
                    relative w-full 
                    border-8 shadow-lg
                    before:block before:pb-[100%]
                    after:absolute after:inset-0 after:border after:border-gray-300 after:pointer-events-none`}
                    style={{ backgroundColor: background }}
                >
                    <div className="absolute inset-0">
                        <Viewer svgWidth={svgWidth} svgHeight={svgHeight} className="w-full h-full" />
                    </div>

                    <div className="absolute left-2 bottom-2">
                        <InfoPanel />
                    </div>
                </div>

                {/* Menu */}
                <div className="">
                    <MenuHeader />
                    <Menu />
                </div>
            </div>

            {/* Tooltip */}
            <HintTooltip />
        </div>
    );
}

export default LinePlayground;
