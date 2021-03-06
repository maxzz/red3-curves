import React from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { DarkShemaAtom, DraggingPointAtom, maxNPointsAtom, nActiveAtom, pointsAtom } from '@/store/store';
import { a, useSpring } from '@react-spring/web';
import { IconDarkLight, IconCopy, IconInfo } from '../UI/UIIcons';
import useClipcoardCopy from '@/hooks/useClipcoardCopy';
import { clamp } from '@/utils/numbers';
import { classNames } from '@/utils/classnames';

function Button({ children, className, disabled = false, title, onClick }: { children: React.ReactNode; className?: string; disabled?: boolean, title: string, onClick: () => void; }) {
    return (
        <div
            className={classNames(
                "w-6 h-6 text-green-900 border bg-green-200 border-green-600 rounded shadow ",
                "flex items-center justify-center cursor-pointer select-none",
                disabled ? 'active:scale-1' : 'active:scale-[.97]',
                disabled ? 'opacity-50' : 'opacity-1',
                className
            )}
            style={{ boxShadow: '#00000022 1px 1px 0px 0px' }}
            title={title}
            onClick={onClick}
        >
            {children}
        </div>
    );
}

function BuildPointsText() {
    const points = useAtomValue(pointsAtom); // TODO: use nActive to show italic
    const dragginPoint = useAtomValue(DraggingPointAtom);
    return (<>
        [{points.map((pt, idx) => {
            const sep = idx === points.length - 1 ? '' : ',';
            const str = JSON.stringify(pt);
            return idx === dragginPoint ? <b key={idx}>{str}{sep}</b> : <span key={idx}>{str}{sep}</span>;
        })}]
    </>);
}

function GeneratedPathInfo({ open }: { open: boolean; }) {
    const [copyResult, copy] = useClipcoardCopy();
    const textRef = React.useRef<HTMLSpanElement>(null);
    const styles = useSpring({ width: open ? '100%' : '0%', opacity: open ? 1 : 0, config: { tension: 700 }, });
    return (
        <a.div style={styles} className="relative ml-1 text-[0.65rem] flex items-center">

            <span ref={textRef} className="flex-none">
                <BuildPointsText />
            </span>

            <span
                className="ml-1 h-4 w-4 text-green-900 bg-green-200 border border-green-600 rounded shadow cursor-pointer select-none"
                title="Copy the coordinates of points to clipboard"
                onClick={async () => copy(textRef.current?.innerText)}
            >
                <IconCopy />
            </span>

            {copyResult.message &&
                <div className="absolute right-5 -top-1/2">
                    <div className={`p-2 rounded shadow-md ${copyResult.error ? 'bg-[red] text-white' : 'bg-[green] text-white'}`}>
                        {copyResult.error ? 'Copy failed (check console)' : 'Copied'}
                    </div>
                </div>
            }
        </a.div>
    );
}

export function EditorCanvasInfoPanel() {
    const [nActive, setNActive] = useAtom(nActiveAtom);
    const [darkMode, setDarkMode] = useAtom(DarkShemaAtom);
    const [showInfo, setShowInfo] = React.useState(false);
    const maxNPoints = useAtomValue(maxNPointsAtom);
    return (
        <div className="flex items-center">
            {/* Buttons */}
            <div className="flex items-center space-x-1">
                {/* - */}
                <Button
                    title="Remove point (minimnum is 2 points)"
                    onClick={() => setNActive(clamp(nActive - 1, 2, maxNPoints))} // setNActive((prev) => prev--); what???
                    disabled={nActive <= 2}
                    className="pb-1"
                >-</Button>

                {/* + */}
                <Button
                    title="Add point (maximum is 7 points)"
                    onClick={() => setNActive(clamp(nActive + 1, 2, maxNPoints))}
                    disabled={nActive >= maxNPoints}
                    className="pb-1"
                >+</Button>

                {/* Color mode */}
                <Button
                    title="Set dark / light mode"
                    onClick={() => setDarkMode(!darkMode)}
                    className="p-1"
                ><IconDarkLight dark={!darkMode} /></Button>

                {/* Info bar */}
                <Button
                    title="Show/Hide the coordinates of points"
                    onClick={() => setShowInfo((prev) => !prev)}
                    className="p-0.5"
                ><IconInfo strokeWidth={1.2} /></Button>
            </div>

            <GeneratedPathInfo open={showInfo} />
        </div>
    );
}
