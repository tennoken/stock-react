import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import finnHub from '../apis/finnHub';

export default function StockList({ lists, handleUpdate, handleRemove }) {
    const navigate = useNavigate();
    const [watchList, setWatchList] = useState([]);
    const goToDetail = (symbol) => {
        navigate(`/detail/${symbol}`);
    };

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
                    <th className="p-4">Remove</th>
                </tr>
            </thead>
            <tbody>
                {lists.map((stock) => {
                    return (
                        <tr
                            key={stock.id}
                            className="hover:bg-sky-100 cursor-pointer my-6"
                            onClick={() => goToDetail(stock.symbol)}
                        >
                            <td className="text-center">{stock.symbol}</td>
                            <td className="text-center">{stock.c}</td>
                            <td className="text-center">{stock.o}</td>
                            <td className="text-center">{stock.pc}</td>
                            <td className="text-center">{stock.h}</td>
                            <td className="text-center">{stock.l}</td>
                            <td className="text-center hover:bg-sky-500 hover:text-white">
                                <button
                                    className="w-full"
                                    onClick={(e) => handleRemove(stock.id, e)}
                                >
                                    <FiTrash2 className="inline" />
                                </button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
