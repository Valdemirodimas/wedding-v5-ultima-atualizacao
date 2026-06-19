// src/routes/AppRoutes.jsx
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LandingPage from '../pages/LandingPage';
import InvitationPage from '../pages/InvitationPage';

export default function AppRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/convite" element={<InvitationPage />} />
      </Routes>
    </AnimatePresence>
  );
}
