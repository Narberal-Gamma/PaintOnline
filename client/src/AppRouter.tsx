import { FC } from "react";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import App from "./App";

const AppRouter: FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/:id' element={<App />} />
                <Route path='*' element={<Navigate to={`f${(+Date.now()).toString(16)}`} />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter