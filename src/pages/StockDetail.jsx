import React from 'react';
import { useParams } from 'react-router-dom';

export default function StockDetail() {
    const { symbol } = useParams();

    return <div>StockDetail {symbol}</div>;
}
