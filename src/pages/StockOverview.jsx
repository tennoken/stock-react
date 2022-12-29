import React, { useEffect, useState } from 'react';
import AutoComplete from '../components/AutoComplete';
import StockList from '../components/StockList';

export default function StockOverview() {
    const [lists, setLists] = useState(readLists);
    const storedSymbols = lists.map((item) => item.symbol);

    const handleAdd = (stock) => {
        setLists((prev) => [...lists, stock]);
    };

    const handleUpdate = (id) => {
        // localstorage에 있는 symbol의 price를 업데이트 해줄꺼
        const filtetedStock = lists.filter((item) => item.id === id);
        console.log(filtetedStock);
    };

    const handleRemove = (id, e) => {
        e.stopPropagation();
        setLists(lists.filter((item) => item.id !== id));
    };

    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(lists));
    }, [lists]);

    return (
        <main className="w-full h-screen flex flex-col justify-center items-center">
            <AutoComplete handleAdd={handleAdd} storedSymbols={storedSymbols} />
            <StockList
                lists={lists}
                handleUpdate={handleUpdate}
                handleRemove={handleRemove}
            />
        </main>
    );
}

function readLists() {
    const lists = localStorage.getItem('lists');
    return lists ? JSON.parse(lists) : [];
}
