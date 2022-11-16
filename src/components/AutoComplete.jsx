import React, { useEffect, useRef, useState } from 'react';
import finnHub from '../apis/finnHub';

export default function AutoComplete() {
    const inputRef = useRef();
    const timeOut = useRef();
    const [results, setResults] = useState([]);

    const handleDebounceSearch = (e) => {
        clearTimeout(timeOut.current);

        if (!inputRef.current.value.trim()) {
            setResults([]);
            return;
        }

        timeOut.current = setTimeout(() => {
            const fetchData = async () => {
                try {
                    const res = await finnHub.get('/search', {
                        params: {
                            q: inputRef.current.value,
                        },
                    });

                    setResults(res.data.result);
                } catch (err) {}
            };
            fetchData();
        }, 600);
    };

    return (
        <>
            <input type="text" ref={inputRef} onChange={handleDebounceSearch} />
            <ul>
                {results.map((result) => {
                    return (
                        <li key={result.symbol}>
                            {result.description}({result.displaySymbol})
                        </li>
                    );
                })}
            </ul>
        </>
    );
}
