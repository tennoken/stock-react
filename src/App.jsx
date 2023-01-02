import React from 'react';
import {
    createBrowserRouter,
    RouterProvider,
    useRouteError,
} from 'react-router-dom';
import StockOverview from './pages/StockOverview';
import StockDetail from './pages/StockDetail';

const error = useRouteError();
const router = createBrowserRouter([
    {
        path: '/',
        element: <StockOverview />,
        errorElement: <p>{error.statusText || error.message}</p>,
    },
    {
        path: '/detail/:symbol',
        element: <StockDetail />,
    },
]);

export default function App() {
    return <RouterProvider router={router} />;
}
