import React, { useRef, useState } from 'react';
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
        }, 300);
    };

    return (
        <div className="w-96">
            <label
                htmlFor="symbol"
                className="block text-sm font-medium text-gray-700"
            >
                Stock Symbol
            </label>
            <input
                name="symbol"
                id="symbol"
                className="border-2 border-sky-400 w-96 rounded-md py-2 pl-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                type="text"
                placeholder="Search Stock Symbol..."
                ref={inputRef}
                onChange={handleDebounceSearch}
            />
            <ul className="h-80 overflow-auto">
                {results.map((result) => {
                    return (
                        <li
                            className="my-1 border-2 w-94 cursor-pointer hover:bg-sky-100"
                            key={result.symbol}
                        >
                            {result.description}({result.displaySymbol})
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
