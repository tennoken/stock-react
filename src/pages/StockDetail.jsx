import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Chart from 'react-apexcharts';
import finnHub from '../apis/finnHub';
import { useState } from 'react';
import dayjs from 'dayjs';

const formatData = (data) => {
    let price = [];
    // o h l c 순서로
    for (let i = 0; i < data.o.length; i++) {
        price.push({
            x: new Date(data.t[i] * 1000),
            y: [data.o[i], data.h[i], data.l[i], data.c[i]],
        });
    }
    return price;
};

export default function StockDetail() {
    const { symbol } = useParams();
    const [priceData, setPriceData] = useState([]);
    const [stockDetailData, setStockDetailData] = useState({});
    const date = new Date();

    const currentTime = Math.round(date.getTime() / 1000);
    let oneDay;
    if (date.getDay() === 6) {
        // 토요일
        oneDay = currentTime - 2 * 24 * 60 * 60;
    } else if (date.getDay() === 0) {
        // 일요일
        oneDay = currentTime - 3 * 24 * 60 * 60;
    } else {
        oneDay = currentTime - 24 * 60 * 60;
    }
    const oneWeeks = currentTime - 7 * 24 * 60 * 60;
    const oneYear = currentTime - 365 * 24 * 60 * 60;

    console.log(stockDetailData);

    useEffect(() => {
        const fetchStockPrice = async () => {
            try {
                const response = await finnHub.get('/stock/candle', {
                    params: {
                        symbol: symbol,
                        resolution: 30,
                        from: oneDay,
                        to: currentTime,
                    },
                });
                setPriceData(formatData(response.data));
            } catch (e) {}
        };
        const fetchStockData = async () => {
            try {
                const response = await finnHub.get('/stock/metric', {
                    params: {
                        symbol: symbol,
                        metric: 'all',
                    },
                });
                const metric = await response.data.metric;
                console.log('stock metric : ', metric);
                setStockDetailData({
                    '52WeekHigh': metric['52WeekHigh'],
                    '52WeekLow': metric['52WeekLow'],
                    grossMarginTTM: metric.grossMarginTTM,
                    grossMarginAnnual: metric.grossMarginAnnual,
                    bookValuePerShareAnnual: metric.bookValuePerShareAnnual,
                });
            } catch (e) {}
        };
        fetchStockPrice();
        fetchStockData();
    }, []);

    const chartData = {
        chart: {
            type: 'candlestick',
        },
        title: {
            align: 'center',
        },
        xaxis: {
            type: 'category',
            labels: {
                formatter: function (value) {
                    return dayjs(value).format('MMM DD HH:mm');
                },
            },
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
                height={500}
            />
            <div class="p-5">
                {Object.keys(stockDetailData).map((key) => (
                    <li class="list-none">
                        {key} : {stockDetailData[key]}
                    </li>
                ))}
            </div>
        </div>
    );
}
