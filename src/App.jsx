import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import StockMain from './pages/StockOverview';
import StockDetail from './pages/StockDetail';

const router = createBrowserRouter([
    {
        path: '/',
        element: <StockMain />,
        errorElement: <p>Error !</p>,
    },
    {
        path: '/detail/:symbol',
        element: <StockDetail />,
    },
]);

export default function App() {
    return <RouterProvider router={router} />;
}
