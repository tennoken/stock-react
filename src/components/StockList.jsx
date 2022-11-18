import React from 'react';

export default function StockList({ lists }) {
    console.log(lists);
    return (
        <table className="border-separate">
            <thead className="bg-sky-200 ">
                <tr>
                    <th className="p-4">Symbol</th>
                    <th className="p-4">
                        Current <br /> Price
                    </th>
                    <th className="p-4">
                        Open price <br />
                        of the day
                    </th>
                    <th className="p-4">
                        Previous price <br />
                        of the day
                    </th>
                    <th className="p-4">
                        High price <br />
                        of the day
                    </th>
                    <th className="p-4">
                        Low price <br />
                        of the day
                    </th>
                </tr>
            </thead>
            <tbody>
                {lists.map((stock) => {
                    return (
                        <tr
                            key={stock.id}
                            className="hover:bg-sky-100 cursor-pointer my-6"
                        >
                            <td className="text-center">{stock.symbol}</td>
                            <td className="text-center">{stock.c}</td>
                            <td className="text-center">{stock.o}</td>
                            <td className="text-center">{stock.pc}</td>
                            <td className="text-center">{stock.h}</td>
                            <td className="text-center">{stock.l}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
