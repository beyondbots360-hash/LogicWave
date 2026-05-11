import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Public pages
import LandingPage     from './pages/LandingPage';
import LoginPage       from './pages/auth/LoginPage';
import SignupPage      from './pages/auth/SignupPage';
import BlogFeed        from './pages/BlogFeed';
import BlogPostDetail  from './pages/BlogPostDetail';
import ContactPage     from './pages/ContactPage';
import PlaceholderPage from './pages/PlaceholderPage';

// Shared (admin + contractor)
import Dashboard       from './pages/Dashboard';
import ContractsPage   from './pages/ContractsPage';
import ContractDetail  from './pages/ContractDetail';
import SettingsPage    from './pages/SettingsPage';

// Admin-only
import WorkersPage     from './pages/WorkersPage';
import WorkerProfile   from './pages/WorkerProfile';
import PayrollPage     from './pages/PayrollPage';
import ComplianceHub   from './pages/ComplianceHub';

// Contractor-only
import DocumentsPage   from './pages/DocumentsPage';
import EarningsPage    from './pages/EarningsPage';

// Blogger-only
import BlogDashboard   from './pages/BlogDashboard';
import BlogEditor      from './pages/BlogEditor';
import SEOInsights     from './pages/SEOInsights';

import ProtectedRoute  from './components/auth/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* ── Public ── */}
          <Route path="/"           element={<LandingPage />} />
          <Route path="/login"      element={<LoginPage />} />
          <Route path="/signup"     element={<SignupPage />} />
          <Route path="/blog"       element={<BlogFeed />} />
          <Route path="/blog/:slug"  element={<BlogPostDetail />} />
          <Route path="/contact"     element={<ContactPage />} />
          <Route path="/about"       element={<PlaceholderPage title="About Us" />} />
          <Route path="/case-studies" element={<PlaceholderPage title="Case Studies" />} />

          {/* ── Shared: admin + contractor ── */}
          <Route path="/dashboard" element={
            <ProtectedRoute allowedRoles={['admin', 'contractor']}>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/contracts" element={
            <ProtectedRoute allowedRoles={['admin', 'contractor']}>
              <ContractsPage />
            </ProtectedRoute>
          } />
          <Route path="/contracts/:id" element={
            <ProtectedRoute allowedRoles={['admin', 'contractor']}>
              <ContractDetail />
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute allowedRoles={['admin', 'contractor', 'blogger']}>
              <SettingsPage />
            </ProtectedRoute>
          } />

          {/* ── Admin only ── */}
          <Route path="/workers" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <WorkersPage />
            </ProtectedRoute>
          } />
          <Route path="/workers/:id" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <WorkerProfile />
            </ProtectedRoute>
          } />
          <Route path="/payroll" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <PayrollPage />
            </ProtectedRoute>
          } />
          <Route path="/compliance" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ComplianceHub />
            </ProtectedRoute>
          } />

          {/* ── Contractor only ── */}
          <Route path="/documents" element={
            <ProtectedRoute allowedRoles={['contractor']}>
              <DocumentsPage />
            </ProtectedRoute>
          } />
          <Route path="/earnings" element={
            <ProtectedRoute allowedRoles={['contractor']}>
              <EarningsPage />
            </ProtectedRoute>
          } />

          {/* ── Blogger only ── */}
          <Route path="/blog-dashboard" element={
            <ProtectedRoute allowedRoles={['blogger']}>
              <BlogDashboard />
            </ProtectedRoute>
          } />
          <Route path="/blog-editor" element={
            <ProtectedRoute allowedRoles={['blogger']}>
              <BlogEditor />
            </ProtectedRoute>
          } />
          <Route path="/seo-insights" element={
            <ProtectedRoute allowedRoles={['blogger']}>
              <SEOInsights />
            </ProtectedRoute>
          } />


          {/* ── Catch-all ── */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
