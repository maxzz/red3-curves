import React from 'react';
import clipboardCopy from 'clipboard-copy';

export default function useClipcoardCopy(options: { msOk?: number, msError?: number; } = { msOk: 1000, msError: 1000 }): readonly [{ error: boolean; message: string; }, (text?: string) => Promise<void>] {
    const [copyResult, setCopyResult] = React.useState({ error: false, message: '' });

    console.log('oo', options);

    async function copy(text?: string) {
        if (text) {
            let showtime = options.msOk;
            try {
                await clipboardCopy(text);
                setCopyResult({ error: false, message: 'Copied' });
            } catch (error) {
                showtime = options.msError;
                console.error(error);
                setCopyResult({ error: true, message: error });
            }
            setTimeout(() => { setCopyResult({ error: false, message: '' }); }, showtime); // reset. re-entrancy is OK here.
        }
    }

    return [copyResult, copy] as const;
}
