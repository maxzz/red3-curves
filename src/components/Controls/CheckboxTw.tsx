import React from 'react';

export type CheckboxProps = {
    label: string;
    checked: boolean;
    onChange: (v: boolean) => void;
    enabled?: boolean;
    title?: string;

    className?: string;
};

function CheckboxTw(props: CheckboxProps) {
    return (
        <label className="flex items-center select-none cursor-pointer" title={props.title}>
            <input type="checkbox"
                className={`h-5 w-5 appearance-none rounded-md
                    text-green-600 border border-[#006f94]
                    bg-[#ffffff70] 
                    checked:bg-blue-600 checked:border-transparent 
                    checked:bg-ui-check
                    focus:outline-none ${props.className}`
                }
                checked={props.checked}
                onChange={(event) => props.onChange(event.target.checked)}
            />
            <span className="ml-1 text-sm text-gray-900">{props.label}</span>
        </label>
    );
}

export default CheckboxTw;
