import React, { useEffect } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { useParams } from 'react-router-dom';
import finnHub from '../apis/finnHub';

export default function StockDetail() {
    const { symbol } = useParams();
    const date = new Date();
    const currentTime = Math.floor(date.getTime() / 1000);
    let oneDay = currentTime - 2 * 24 * 60 * 60;
    console.log(oneDay);
    return (
        <div>
            <h1>StockDetail {symbol}</h1>
            <NivoChart />
        </div>
    );
}

export const NivoChart = () => {
    const data = [
        {
            id: 'japan',
            color: 'hsl(235, 70%, 50%)',
            data: [
                {
                    x: 'plane',
                    y: 191,
                },
                {
                    x: 'helicopter',
                    y: 145,
                },
                {
                    x: 'boat',
                    y: 244,
                },
                {
                    x: 'train',
                    y: 73,
                },
                {
                    x: 'subway',
                    y: 210,
                },
                {
                    x: 'bus',
                    y: 5,
                },
                {
                    x: 'car',
                    y: 98,
                },
                {
                    x: 'moto',
                    y: 63,
                },
                {
                    x: 'bicycle',
                    y: 77,
                },
                {
                    x: 'horse',
                    y: 48,
                },
                {
                    x: 'skateboard',
                    y: 119,
                },
                {
                    x: 'others',
                    y: 118,
                },
            ],
        },
    ];
    return (
        <div style={{ width: 'with: 100%', height: '500px' }}>
            <ResponsiveLine
                data={data}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: 'point' }}
                yScale={{
                    type: 'linear',
                    min: 'auto',
                    max: 'auto',
                    stacked: true,
                    reverse: false,
                }}
                yFormat=" >-.2f"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    orient: 'bottom',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'transportation',
                    legendOffset: 36,
                    legendPosition: 'middle',
                }}
                axisLeft={{
                    orient: 'left',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'count',
                    legendOffset: -40,
                    legendPosition: 'middle',
                }}
                pointSize={10}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemBackground: 'rgba(0, 0, 0, .03)',
                                    itemOpacity: 1,
                                },
                            },
                        ],
                    },
                ]}
            />
        </div>
    );
};
