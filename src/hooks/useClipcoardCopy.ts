import React from 'react';
import clipboardCopy from 'clipboard-copy';

export default function useClipcoardCopy(): readonly [{ error: boolean; message: string; }, (text?: string) => Promise<void>] {
    const [copyResult, setCopyResult] = React.useState({ error: false, message: '' });

    async function copy(text?: string) {
        if (text) {
            try {
                await clipboardCopy(text);
                setCopyResult({ error: false, message: 'Copied' });
            } catch (error) {
                setCopyResult({ error: true, message: error });
            }
            setTimeout(() => { setCopyResult({ error: false, message: '' }); }, 1000); // re-entrancy is OK here
        }
    }

    return [copyResult, copy] as const;
}
