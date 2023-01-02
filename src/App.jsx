import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import StockOverview from './pages/StockOverview';
import StockDetail from './pages/StockDetail';
import Error from './components/Error';

const router = createBrowserRouter([
    {
        path: '/',
        element: <StockOverview />,
        errorElement: <Error />,
    },
    {
        path: '/detail/:symbol',
        element: <StockDetail />,
    },
]);

export default function App() {
    return <RouterProvider router={router} />;
}
