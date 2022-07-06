import React from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { activePointsAtom, colorScale, DraggingPointAtom, linePathesAtom, linesAtom, SchemaAtom, setPointAtom } from '@/store/store';
import { CURVEINFO } from '@/store/datum';
import { clamp, withDigits } from '@/utils/numbers';
import { useDrag } from 'react-use-gesture';
import pointer from '@/utils/pointer';
import { css, styled } from '@/stitches.config';
import { InCanvasInfoPanel } from './InCanvasInfoPanel';
import { HintTooltip, SideMenu } from './SideMenu';

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
    const setPoint = useSetAtom(setPointAtom);
    const setDraggingPoint = useSetAtom(DraggingPointAtom);
    const ref = React.useRef(null);
    const bind = useDrag(({ event, dragging }) => {
        let pt = pointer(event, ref.current).map(coord => +withDigits(coord, 0)) as [number, number];
        pt[0] = clamp(pt[0], dotRadius, svgWidth - dotRadius);
        pt[1] = clamp(pt[1], dotRadius, svgHeight - dotRadius);
        setPoint({ idx, value: pt });
        setDraggingPoint(dragging ? idx : -1);
    });
    return (<>
        <circle ref={ref} {...bind()} className={dotStyles()} cx={cx} cy={cy} r={dotRadius - 2} />
        <path
            transform={`translate(${cx - 10.5}, ${cy - 10.5}) scale(1.2)`} fill="white" stroke="none"
            d="M.6 3.7A7.2 7.2 0 014 .5 5 5 0 015.6 0l.3 2a7 7 0 00-2 1A6.3 6.3 0 002 4.4zm-.3.9A6.7 6.7 0 000 5.9a9.6 9.6 0 000 1.4h.6a6.3 6.3 0 011-2.1z"
        />
    </>);
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
    const points = useAtomValue(activePointsAtom);
    return (
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} {...rest} >
            {/* <rect x={0} y={0} width={'100%'} height={'100%'} fill='red' /> */} {/* corners */}
            <g>
                {points.map((pt, idx) =>
                    <Dot idx={idx} cx={pt[0]} cy={pt[1]} key={idx} />
                )}

                <LinePathes />

                {points.map((pt, idx) =>
                    <DotText idx={idx} cx={pt[0]} cy={pt[1]} key={idx} />
                )}
            </g>
        </svg>
    );
}

function LinePlayground() {
    const { viewer: { background } } = useAtomValue(SchemaAtom);
    return (
        <div className="mx-auto max-w-[600px] lg:max-w-max lg:w-auto select-none">
            {/* <div className="select-none max-w-full sm:max-w-max lg:w-auto mx-auto"> */}

            {/* Viewer and Controls */}
            <div className={`grid grid-cols-1 lg:grid-cols-[minmax(604px,1fr)_max-content]`}>
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
                        <InCanvasInfoPanel />
                    </div>
                    
                </div>

                <SideMenu />
            </div>

            <HintTooltip />
        </div>
    );
}

export default LinePlayground;
