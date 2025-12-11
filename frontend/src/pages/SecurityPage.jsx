import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../components/layouts/DashboardLayout';
import SecurityDashboard from '../components/Security/SecurityDashboard';
import VulnerableDemo from '../components/Security/VulnerableDemo';
import SecureDemo from '../components/Security/SecureDemo';

const SecurityPage = () => {
  return (
    <DashboardLayout activeMenu='Security Demos'>
      <Routes>
        <Route path="/" element={<SecurityDashboard />} />
        <Route path="/vulnerable" element={<VulnerableDemo />} />
        <Route path="/secure" element={<SecureDemo />} />
      </Routes>
    </DashboardLayout>
  );
};

export default SecurityPage;
