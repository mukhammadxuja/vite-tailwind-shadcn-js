import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import HomePage from './HomePage';
import Settings from './Settings';
import NotFound from './NotFound';
import DashboardLayout from './DashboardLayout';

function Dashboard() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<MainPage />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default Dashboard;
