import React from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { allLinesSetAtom, colorScale, lineCheckAtom, LineData, LineHintIdxAtom, linesAtom } from '@/store/store';
import { a, useSpring } from '@react-spring/web';
import { css, styled } from '@/stitches.config';
import Tooltip from 'react-tooltip';
import lineTypeUrl0 from '@/assets/dashed-line0.svg';
import lineTypeUrl1 from '@/assets/dashed-line11.svg';
import lineTypeUrl2 from '@/assets/dashed-line2.svg';
import { CURVEINFO } from '@/store/datum';
import { useHover } from 'react-use-gesture';
import { InfoIcon } from './InCanvasInfoPanel';

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

function MenuCheckboxRow({ line, idx }: { line: LineData, idx: number; }) {
    const [value, setValue] = useAtom(lineCheckAtom);
    const checked = value(idx);
    const curve = CURVEINFO[line.idx];

    const { width } = useSpring({ to: { width: checked ? 0 : 48 }, config: { tension: 500 } });

    const setHint = useSetAtom(LineHintIdxAtom);
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
                        z-10"
                    type="checkbox"
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
                <div className="ml-2">
                    {CURVEINFO[idx].name}
                </div>
            </div>
        </label>
    );
}

function Menu() {
    const [lines] = useAtom(linesAtom);
    return (
        <div className="p-2 space-y-1 flex flex-col text-sm select-none">
            {lines.map((line, idx) =>
                <MenuCheckboxRow line={line} idx={idx} key={idx} />
            )}
        </div>
    );
}

const tooltipStyles = css({
    maxWidth: '20rem',
    backgroundColor: '#28284e !important',
});

export function HintTooltip() {
    const hint = useAtomValue(LineHintIdxAtom);
    return (
        <Tooltip delayShow={200} effect="solid">
            {hint === -1 ? '' : CURVEINFO[hint].info}
        </Tooltip>
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
                    z-10"
                type="checkbox"
                checked={all}
                onChange={(e) => setAll(e.target.checked)}
                title="Toggle all"
            />
        </div>
    );
}

export function SideMenu() {
    return (
        <div>
            <MenuHeader />
            <Menu />
        </div>
    );
}
