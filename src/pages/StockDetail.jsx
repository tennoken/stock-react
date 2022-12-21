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

const StockDetail = () => {
    const { symbol } = useParams();
    const filter = ['oneDayPriceData', 'oneWeekPriceData', 'oneYearPriceData'];
    const [selectedPeriod, setSelectedPeriod] = useState('oneDayPriceData');
    const [priceData, setPriceData] = useState({
        oneDayPriceData: [],
        oneWeekPriceData: [],
        oneYearPriceData: [],
    });
    const [stockDetailData, setStockDetailData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
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

    const filterDate = (value) => {
        return priceData[value];
    };

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
                data: priceData[selectedPeriod],
            },
        ],
    };

    useEffect(() => {
        setIsLoading(true);
        Promise.all([
            finnHub.get('/stock/candle', {
                params: {
                    symbol: symbol,
                    resolution: 30,
                    from: oneDay,
                    to: currentTime,
                },
            }),
            finnHub.get('/stock/candle', {
                params: {
                    symbol: symbol,
                    resolution: 60,
                    from: oneWeeks,
                    to: currentTime,
                },
            }),
            finnHub.get('/stock/candle', {
                params: {
                    symbol: symbol,
                    resolution: 'D',
                    from: oneYear,
                    to: currentTime,
                },
            }),
        ]).then((res) => {
            setPriceData((prev) => ({
                ...prev,
                oneDayPriceData: formatData(res[0].data),
            }));
            setPriceData((prev) => ({
                ...prev,
                oneWeekPriceData: formatData(res[1].data),
            }));
            setPriceData((prev) => ({
                ...prev,
                oneYearPriceData: formatData(res[2].data),
            }));
            setIsLoading(false);
        });

        const fetchStockData = async () => {
            try {
                const response = await finnHub.get('/stock/metric', {
                    params: {
                        symbol: symbol,
                        metric: 'all',
                    },
                });
                const metric = await response.data.metric;
                setStockDetailData({
                    marketCapitalization: metric.marketCapitalization,
                    epsGrowthQuarterlyYoy: metric.epsGrowthQuarterlyYoy,
                    epsGrowthTTMYoy: metric.epsGrowthTTMYoy,
                    grossMargin5Y: metric.grossMargin5Y,
                    grossMarginAnnual: metric.grossMarginAnnual,
                    grossMarginTTM: metric.grossMarginTTM,
                    netIncomeEmployeeAnnual: metric.netIncomeEmployeeAnnual,
                    netIncomeEmployeeTTM: metric.netIncomeEmployeeTTM,
                    bookValuePerShareAnnual: metric.bookValuePerShareAnnual,
                    '52WeekHigh': metric['52WeekHigh'],
                    '52WeekHighDate': metric['52WeekHighDate'],
                    '52WeekLow': metric['52WeekLow'],
                    '52WeekLowDate': metric['52WeekLowDate'],
                });
            } catch (e) {}
        };
        fetchStockData();
    }, []);

    if (isLoading)
        return (
            <div className="text-center flex justify-center items-center w-screen h-screen">
                <div role="status">
                    <svg
                        className="inline mr-2 w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                        />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                        />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );

    return (
        <div className="mx-4">
            <h1 className="text-2xl">{symbol}</h1>
            <Chart
                options={chartData}
                series={chartData.series}
                type="candlestick"
                height={500}
            />
            <div className="mx-4">
                {filter.map((period) => (
                    <button
                        className="mr-5 border-solid border-2 border-sky-500 rounded p-2"
                        onClick={() => setSelectedPeriod(period)}
                    >
                        {period}
                    </button>
                ))}
            </div>
            <div className="p-5">
                {Object.keys(stockDetailData).map((key) => (
                    <li key={key} className="list-none">
                        {key} : {stockDetailData[key]}
                    </li>
                ))}
            </div>
        </div>
    );
};

export default StockDetail;
