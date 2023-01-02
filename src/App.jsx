import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import StockOverview from './pages/StockOverview';
import StockDetail from './pages/StockDetail';

const router = createBrowserRouter([
    {
        path: '/',
        element: <StockOverview />,
        errorElement: <p>error !</p>,
    },
    {
        path: '/detail/:symbol',
        element: <StockDetail />,
    },
]);

export default function App() {
    return <RouterProvider router={router} />;
}
