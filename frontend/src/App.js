import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { FaUsers, FaBuilding, FaTachometerAlt } from 'react-icons/fa';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import DepartmentList from './components/DepartmentList';
import DepartmentForm from './components/DepartmentForm';
import Dashboard from './components/Dashboard';

function Navigation() {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Dashboard', icon: FaTachometerAlt },
    { path: '/employees', label: 'Employees', icon: FaUsers },
    { path: '/departments', label: 'Departments', icon: FaBuilding }
  ];
  
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
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="container">
        <header className="header">
          <h1>Employee Management System</h1>
          <Navigation />
        </header>
        
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/employees" element={<EmployeeList />} />
            <Route path="/employees/new" element={<EmployeeForm />} />
            <Route path="/employees/edit/:id" element={<EmployeeForm />} />
            <Route path="/departments" element={<DepartmentList />} />
            <Route path="/departments/new" element={<DepartmentForm />} />
            <Route path="/departments/edit/:id" element={<DepartmentForm />} />
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
