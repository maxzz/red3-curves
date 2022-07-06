import React from 'react';
import { useAtom } from 'jotai';
import { DarkShemaAtom, DraggingPointAtom, maxNPointsAtom, nActiveAtom, pointsAtom } from '@/store/store';
import { clamp } from '@/utils/numbers';
import { a, useSpring } from '@react-spring/web';
import useClipcoardCopy from '@/hooks/useClipcoardCopy';
import { DarkLightIcon, InfoIcon } from '../UI/UIIcons';

function ViewerButton({ children, className, disabled = false, title, onClick }: { children: React.ReactNode; className?: string; disabled?: boolean, title: string, onClick: () => void; }) {
    return (
        <div
            className={`w-6 h-6 text-green-900 border bg-green-200 border-green-600 rounded shadow 
                flex items-center justify-center cursor-pointer select-none 
                ${disabled ? 'active:scale-1' : 'active:scale-[.97]'}
                ${disabled ? 'opacity-50' : 'opacity-1'} ${className}`
            }
            style={{ boxShadow: '#00000022 1px 1px 0px 0px' }}
            title={title}
            onClick={onClick}
        >
            {children}
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

function GeneratedPathInfo({ expanded }: { expanded: boolean; }) {
    const { width, opacity } = useSpring({ width: expanded ? '100%' : '0%', opacity: expanded ? 1 : 0, config: { tension: 700 }, });
    const textRef = React.useRef<HTMLSpanElement>(null);
    const [copyResult, copy] = useClipcoardCopy();
    return (
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
    );
}

export function EditorCanvasInfoPanel() {
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
                ><InfoIcon strokeWidth={1.2} /></ViewerButton>
            </div>

            <GeneratedPathInfo expanded={expanded} />
        </div>
    );
}
