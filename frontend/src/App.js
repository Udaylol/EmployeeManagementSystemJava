import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { FaUsers, FaBuilding, FaTachometerAlt, FaSignOutAlt } from 'react-icons/fa';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import DepartmentList from './components/DepartmentList';
import DepartmentForm from './components/DepartmentForm';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import { authService } from './services/authService';

function Navigation() {
  const location = useLocation();
  const currentUser = authService.getCurrentUser();
  
  const navItems = [
    { path: '/', label: 'Dashboard', icon: FaTachometerAlt },
    { path: '/employees', label: 'Employees', icon: FaUsers },
    { path: '/departments', label: 'Departments', icon: FaBuilding }
  ];
  
  const handleLogout = async () => {
    await authService.logout();
    window.location.href = '/login';
  };
  
  return (
    <nav className="nav">
      {navItems.map(({ path, label, icon: Icon }) => (
        <Link 
          key={path}
          to={path} 
          className={location.pathname === path ? 'active' : ''}
        >
          <Icon className="icon" />
          {label}
        </Link>
      ))}
      <button 
        onClick={handleLogout}
        style={{
          background: 'none',
          border: 'none',
          color: 'white',
          padding: '0.75rem 1.5rem',
          borderRadius: '25px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.9rem',
          fontWeight: '500'
        }}
      >
        <FaSignOutAlt className="icon" />
        Logout ({currentUser?.username})
      </button>
    </nav>
  );
}

// Protected Route Component
function ProtectedRoute({ children }) {
  const isAuthenticated = authService.isAuthenticated();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function App() {
  const isAuthenticated = authService.isAuthenticated();
  
  return (
    <Router>
      <div className="container">
        {isAuthenticated && (
          <header className="header">
            <h1>Employee Management System</h1>
            <Navigation />
          </header>
        )}
        
        <main>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/employees" element={
              <ProtectedRoute>
                <EmployeeList />
              </ProtectedRoute>
            } />
            <Route path="/employees/new" element={
              <ProtectedRoute>
                <EmployeeForm />
              </ProtectedRoute>
            } />
            <Route path="/employees/edit/:id" element={
              <ProtectedRoute>
                <EmployeeForm />
              </ProtectedRoute>
            } />
            <Route path="/departments" element={
              <ProtectedRoute>
                <DepartmentList />
              </ProtectedRoute>
            } />
            <Route path="/departments/new" element={
              <ProtectedRoute>
                <DepartmentForm />
              </ProtectedRoute>
            } />
            <Route path="/departments/edit/:id" element={
              <ProtectedRoute>
                <DepartmentForm />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
        
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
              borderRadius: '8px',
              padding: '16px',
              fontSize: '14px',
              fontWeight: '500',
            },
            success: {
              iconTheme: {
                primary: '#27ae60',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#e74c3c',
                secondary: '#fff',
              },
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;
