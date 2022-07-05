import React from 'react';
import LinePlayground from './Editor/LinePlayground';
import OldLinePlayground from './Editor/OldLinePlayground';

export function Section2_Main() {
    return (
        <>
            <main className="flex-1 w-full">
                <LinePlayground />
            </main>
            {/* <OldLinePlayground /> */}

        </>
    );
}
