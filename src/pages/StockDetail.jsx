import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import finnHub from '../apis/finnHub';

export default function StockDetail() {
    const { symbol } = useParams();
    const date = new Date();
    const currentTime = Math.floor(date.getTime() / 1000);
    let oneDay = currentTime - 2 * 24 * 60 * 60;
    console.log(currentTime, oneDay);

    useEffect(() => {
        const fetchData = async () => {
            const res = await finnHub.get('/stock/candle', {
                params: {
                    symbol,
                    from: oneDay,
                    to: currentTime,
                    resolution: 30,
                },
            });

            console.log(res);
        };
        fetchData();
    }, []);

    return <div>StockDetail {symbol}</div>;
}
