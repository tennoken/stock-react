import React, { useEffect, useRef, useState } from 'react';
import finnHub from '../apis/finnHub';

export default function StockList() {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await finnHub.get('/search', {
                    params: {
                        q: search,
                    },
                });

                setResults(res.data.result);
            } catch (err) {}
        };
        if (search.length > 0) {
            fetchData();
        } else {
            setResults([]);
        }
    }, [search]);
    return (
        <>
            <h1>Stock Main</h1>
            <input type="text" onChange={(e) => setSearch(e.target.value)} />
            <ul>
                {search
                    ? results.map((result) => {
                          return (
                              <li key={result.symbol}>
                                  {result.description}({result.displaySymbol})
                              </li>
                          );
                      })
                    : null}
            </ul>
        </>
    );
}
