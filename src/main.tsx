import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';

import './Index.css';
import Match from "./pages/Match.tsx";
import RouteNotFound from "./pages/RouteNotFound.tsx";
import LandingPage from "./pages/LandingPage.tsx";



createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <HashRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/match" element={<Match />} />
                <Route path="*" element={<RouteNotFound />} />
            </Routes>
        </HashRouter>
    </StrictMode>
);
