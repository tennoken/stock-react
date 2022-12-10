import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Chart from 'react-apexcharts';
import finnHub from '../apis/finnHub';
import { useState } from 'react';

export default function StockDetail() {
    const { symbol } = useParams();
    const date = new Date();

    const currentTime = Math.floor(date.getTime() / 1000);
    let oneDay = currentTime - 2 * 24 * 60 * 60;
    console.log(currentTime);
    console.log(oneDay);
    const [priceData, setPriceData] = useState([]);

    const formatData = (data) => {
        // o h l c 순서로
        console.log(data);
        for (let i = 0; i < data.o.length; i++) {
            setPriceData((prev) => [
                ...prev,
                {
                    x: data.t[i],
                    y: [data.o[i], data.h[i], data.l[i], data.c[i]],
                },
            ]);
        }
    };

    if (priceData) {
        console.log(priceData);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await finnHub.get('/stock/candle?', {
                    params: {
                        symbol: 'IBM',
                        resolution: 30,
                        from: oneDay,
                        to: currentTime,
                    },
                });
                formatData(response.data);
            } catch (e) {}
        };
        fetchData();
    }, []);

    const chartData = {
        chart: {
            type: 'candlestick',
        },
        title: {
            text: 'CandleStick Chart',
            align: 'center',
        },
        xaxis: {
            type: 'datetime',
        },
        yaxis: {
            tooltip: {
                enabled: true,
            },
        },
        series: [
            {
                data: priceData,
            },
        ],
    };

    return (
        <div>
            <h1>StockDetail {symbol}</h1>
            <Chart
                options={chartData}
                series={chartData.series}
                type="candlestick"
                height={350}
            />
        </div>
    );
}
