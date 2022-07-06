import { atom, Getter } from 'jotai';
import { atomWithDefault } from 'jotai/utils';
import { atomWithCallback } from '../hooks/atomsX';
import debounce from '../utils/debounce';
import * as d3 from 'd3';
import { InputData } from '../components/Editor/OnPureD3/OldLinePlayground';
import { CURVEINFO } from './datum';

export type Point = [x: number, y: number];

export type LineState = {
    idx: number;        // index in global CURVEINFO.
    active: boolean;    // true if line activated.
};

namespace Storage {
    const KEY = 'red3-curves';

    type Store = {
        points: [number, number][]; // control points coordinates as [x, y][]
        active: LineState[];
        nActive: number; // Number of active points
        dark: boolean; // dark/light schema
    };

    export let initialData: Store = {
        points: [[16, 255], [161, 178], [586, 304], [352, 71], [61, 442], [304, 342], [586, 586]],
        // points: [[46, 179], [123, 404], [123, 56], [292, 56], [292, 274], [456, 163], [463, 473]],
        active: CURVEINFO.map((curve, idx) => ({ idx, active: curve.active })),
        nActive: 7,
        dark: false,
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

    export const saveDebounced = debounce(function _save(get: Getter) {
        let newStore: Store = {
            points: get(pointsAtom),
            active: get(lineStatesAtom),
            nActive: get(nActiveAtom),
            dark: get(DarkShemaAtom),
        };
        localStorage.setItem(KEY, JSON.stringify(newStore));
    }, 1000);

    export const save = ({ get }: { get: Getter; }) => saveDebounced(get);

} //namespace Storage

export const pointsAtom = atomWithCallback<Point[]>(Storage.initialData.points, Storage.save);

export const setPointAtom = atom(
    null,
    (get, set, { idx, value }: { idx: number; value: Point; }) => {
        let pts = get(pointsAtom);
        pts[idx] = value;
        set(pointsAtom, [...pts]);
    }
);

// Active points

export const nActiveAtom = atomWithCallback(Storage.initialData.nActive, Storage.save);

export const activePointsAtom = atom<Point[]>(
    (get) => {
        // 0. get active points as first N points.
        return get(pointsAtom).slice(0, get(nActiveAtom));
    }
);

export const maxNPointsAtom = atom(
    (get) => {
        // 0. get max possible points
        return get(pointsAtom).length;
    }
);

// Old editor fallback i.e. for old editor return all as a single object

export const inputDataAtom = atom<InputData>(
    get => ({
        points: get(pointsAtom),
        active: get(nActiveAtom),
    })
);

// Line pathes generation

function generatePathes(points: Point[], numActivePoints: number): string[] {
    const lineGenerator = d3.line();
    const pts = points.slice(0, numActivePoints) as any as [number, number][]; // <any> cast to remove possible trailing data from type.

    return CURVEINFO.map((curve) => {
        lineGenerator.curve(curve.curve);
        return lineGenerator(pts) || '';
    });
}

export const linePathesAtom = atomWithDefault<string[]>(
    (get) => {
        return generatePathes(get(pointsAtom), get(nActiveAtom));
    }
);

// Checkbox state for each line

export const lineStatesAtom = atomWithCallback<LineState[]>(Storage.initialData.active, Storage.save);

export const lineStateAtom = atom(
    (get) => (idx: number) => get(lineStatesAtom)[idx].active,
    (get, set, { idx, active }: LineState) => {
        let arr = get(lineStatesAtom);
        arr[idx].active = active;
        set(lineStatesAtom, [...arr]);
    }
);

export const allLinesSetAtom = atom(
    (get) => {
        // 0. are all checkboxes actime
        let arr = get(lineStatesAtom);
        return !arr.some((line) => !line.active);
    },
    (get, set, value: boolean) => {
        // 0. set value to all checkboxes
        let arr = get(lineStatesAtom);
        arr.forEach((line) => line.active = value);
        set(lineStatesAtom, [...arr]);
    }
);

// Line hint index

export const LineHintIdxAtom = atom(-1);

// Dragging point index

export const DraggingPointAtom = atom(-1);

// Colors

export const DarkShemaAtom = atomWithCallback(Storage.initialData.dark, Storage.save);

export type ColorsShema = {
    viewer: {
        background: string;
    };
};

const SchemaLight: ColorsShema = {
    viewer: {
        background: '#ffffff91',
    }
};

const SchemaDark: ColorsShema = {
    viewer: {
        background: '#8b5cf6', // purple-500
    }
};

export const SchemaAtom = atom<ColorsShema>(
    (get) => {
        const dark = get(DarkShemaAtom);
        return dark ? SchemaDark : SchemaLight;
    }
);

const gColor = [
    '#3366cc', '#ff9900', '#109618', '#990099', '#dc3912', '#0099c6', '#8c564b', '#6633cc',

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
    '#3b3eac',
];

/*
//google colors
const g = [
    '#3366cc', '#ff9900', '#109618', '#990099', '#dc3912', '#0099c6', '#dd4477', '#66aa00', '#b82e2e', '#316395', '#994499', '#22aa99', '#aaaa11', '#6633cc', '#e67300', '#8b0707', '#651067', '#329262', '#5574a6', '#3b3eac'
];

//d3.schemeCategory10 colors
const d = [
    '#2077b4', '#ff7f0d', '#2da02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbf00', '#00bed0',
];

// const categoryScale = d3.scaleOrdinal<number, string>(d3.schemeCategory10);
// const categoryScale = d3.scaleOrdinal<number, string>(gColor);
// function colorScale(d: number) { return categoryScale(d); }
*/
export function colorScale(n: number): string { return gColor[n % gColor.length]; }

//
