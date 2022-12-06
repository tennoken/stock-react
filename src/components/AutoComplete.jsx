import React, { useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import finnHub from '../apis/finnHub';

export default function AutoComplete({ handleAdd }) {
    const inputRef = useRef();
    const timeOut = useRef();
    const [results, setResults] = useState([]);

    const onClickSymbol = (symbol) => {
        const fetchData = async () => {
            try {
                const res = await finnHub.get('/quote', {
                    params: {
                        symbol,
                    },
                });
                handleAdd({
                    id: uuidv4(),
                    symbol,
                    c: res.data.c,
                    d: res.data.d,
                    dp: res.data.dp,
                    o: res.data.o,
                    h: res.data.h,
                    l: res.data.l,
                    pc: res.data.pc,
                });
            } catch (err) {}
        };
        fetchData();
        inputRef.current.value = '';
        setResults([]);
    };

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
        }, 200);
    };

    const handleInputFocusOut = () => {
        setTimeout(() => {
            setResults([]);
            inputRef.current.value = '';
        }, 100);
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
                onBlur={handleInputFocusOut}
            />
            <ul className="h-80 overflow-auto">
                {results.map((result) => {
                    return (
                        <li
                            onClick={() => onClickSymbol(result.displaySymbol)}
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
