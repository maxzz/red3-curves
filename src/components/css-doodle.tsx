import React, { RefObject } from 'react';
import 'css-doodle';

export type ExportOptions = {
    scale?: number;
    detail?: boolean;
    download?: boolean;
    name?: string;
};

type GridObject = {
    x: number;
    y: number;
    size: number;
};

export interface DoodleHTMLElement extends HTMLElement {
    export: (options: ExportOptions) => Promise<void>;
    update: (styles?: string) => void;
    seed: string;
    use: string;
    grid: string | GridObject;
}

export interface DoodleProps {
    rules?: string;
    use?: string;
    grid?: string;
    seed?: string;
    innerRef?: RefObject<DoodleHTMLElement>;
}

const DoodleComponent: React.FC<DoodleProps> = ({rules, innerRef, ...otherProps}) => (
    <css-doodle ref={innerRef} {...otherProps}>
        {rules}
    </css-doodle>
);

export default DoodleComponent;
