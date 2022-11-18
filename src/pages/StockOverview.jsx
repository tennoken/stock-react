import React, { useEffect, useState } from 'react';
import AutoComplete from '../components/AutoComplete';
import StockList from '../components/StockList';

export default function StockOverview() {
    const [lists, setLists] = useState(readLists);

    const handleAdd = (stock) => {
        setLists((prev) => [...lists, stock]);
    };

    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(lists));
    }, [lists]);

    return (
        <main className="w-full h-screen flex flex-col justify-center items-center">
            <AutoComplete handleAdd={handleAdd} />
            <StockList lists={lists} />
        </main>
    );
}

function readLists() {
    const lists = localStorage.getItem('lists');
    return lists ? JSON.parse(lists) : [];
}
