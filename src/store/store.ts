import * as d3 from 'd3';
import { atom, Getter } from 'jotai';
import { atomWithDefault } from 'jotai/utils';
import { InputData } from '../components/OldLinePlayground';
import { atomWithCallback } from '../hooks/atomsX';
import debounce from '../utils/debounce';
import { CURVEINFO } from './datum';

namespace Storage {
    const KEY = 'red3-curves';

    type Store = {
        points: [number, number][]; // control points coordinates as [x, y][]
        active: LineData[];
        nActive: number; // Number of active points
    };

    export let initialData: Store = {
        points: [[46, 179], [123, 404], [123, 56], [292, 56], [292, 274], [456, 163], [463, 473]],
        active: CURVEINFO.map((curve, idx) => ({ idx, active: curve.active })),
        nActive: 7,
    };

    function load() {
        const s = localStorage.getItem(KEY);
        if (s) {
            try {
                let obj = JSON.parse(s) as Store;
                initialData = obj;
            } catch (error) {
            }
        }
    }
    load();

    export const save = debounce(function _save(get: Getter) {
        let newStore: Store = {
            points: get(pointsAtom),
            active: get(linesAtom),
            nActive: get(nActiveAtom),
        };
        localStorage.setItem(KEY, JSON.stringify(newStore));
    }, 1000);
}

export type LinePointData = [number, number];

export const pointsAtom = atomWithCallback<LinePointData[]>(Storage.initialData.points, (_, get) => Storage.save(get));

export const setPointAtom = atom(
    null,
    (get, set, { idx, value }: { idx: number; value: [number, number]; }) => {
        let pts = get(pointsAtom);
        pts[idx] = value;
        set(pointsAtom, [...pts]);
    }
);

export const nActiveAtom = atomWithCallback(Storage.initialData.nActive, (_, get) => Storage.save(get));

export const inputDataAtom = atom<InputData>(
    get => ({
        points: get(pointsAtom),
        active: get(nActiveAtom),
    })
);

// Line pathes generation

function generatePathes(points: LinePointData[], numActivePoints: number): string[] {
    const lineGenerator = d3.line();
    const pts = points.slice(0, numActivePoints) as any as [number, number][]; // <any> cast to remove possible trailing data from type.

    return CURVEINFO.map((curve) => {
        lineGenerator.curve(curve.curve);
        return lineGenerator(pts) || '';
    });
}

export const linePathesAtom = atomWithDefault<string[]>((get) => {
    return generatePathes(get(pointsAtom), get(nActiveAtom));
});

// Checkboxes. Lines activation

export type LineData = {
    idx: number;        // index in global CURVEINFO.
    active: boolean;    // true if line activated.
};

export const linesAtom = atomWithCallback<LineData[]>(Storage.initialData.active, (_, get) => Storage.save(get));

export const lineCheckAtom = atom(
    (get) => (idx: number) => get(linesAtom)[idx].active,
    (get, set, { idx, value }: { idx: number, value: boolean; }) => {
        let arr = get(linesAtom);
        arr[idx].active = value;
        set(linesAtom, [...arr]);
    }
);

//export const allLinesAtom = atom(false);
export const allLinesSetAtom = atom(
    (get) => {
        let arr = get(linesAtom);
        return !arr.some(line => !line.active);
    },
    (get, set, value: boolean) => {
        let arr = get(linesAtom);
        arr.forEach(line => line.active = value);
        set(linesAtom, [...arr]);
    }
);

// Line hint

export const LineHintIdxAtom = atom(-1);

// Colors

const gColor = [
    '#3366cc',
    '#ff9900',
    '#109618',
    '#990099',
    '#dc3912',
    '#0099c6',
    '#dd4477',
    '#66aa00',
    '#b82e2e',
    '#316395',
    '#994499',
    '#22aa99',
    '#aaaa11',
    '#6633cc',
    '#e67300',
    '#8b0707',
    '#651067',
    '#329262',
    '#5574a6',
    '#3b3eac'
]; ``;

// const categoryScale = d3.scaleOrdinal<number, string>(d3.schemeCategory10);
// const categoryScale = d3.scaleOrdinal<number, string>(gColor);
// function colorScale(d: number) { return categoryScale(d); }
export function colorScale(n: number) { return gColor[n % gColor.length]; }

//
