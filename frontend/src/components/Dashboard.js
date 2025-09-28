import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { employeeAPI, departmentAPI } from '../services/api';

function Dashboard() {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalDepartments: 0,
    recentEmployees: [],
    recentDepartments: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [employeesRes, departmentsRes] = await Promise.all([
        employeeAPI.getAllEmployees(),
        departmentAPI.getAllDepartments()
      ]);

      const employees = employeesRes.data;
      const departments = departmentsRes.data;

      setStats({
        totalEmployees: employees.length,
        totalDepartments: departments.length,
        recentEmployees: employees.slice(-5).reverse(),
        recentDepartments: departments.slice(-5).reverse()
      });
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error('Dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="alert alert-error">{error}</div>;
  }

  return (
    <div className="container">
      <div className="stats" style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
        <div className="stat-card card" style={{ flex: 1, textAlign: 'center' }}>
          <h3 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>{stats.totalEmployees}</h3>
          <p style={{ color: '#666' }}>Total Employees</p>
        </div>
        <div className="stat-card card" style={{ flex: 1, textAlign: 'center' }}>
          <h3 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>{stats.totalDepartments}</h3>
          <p style={{ color: '#666' }}>Total Departments</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div className="card">
          <h2>Recent Employees</h2>
          {stats.recentEmployees.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentEmployees.map(employee => (
                  <tr key={employee.id}>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.department?.name || 'No Department'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No employees found</p>
          )}
          <Link to="/employees" className="btn" style={{ marginTop: '1rem' }}>View All Employees</Link>
        </div>

        <div className="card">
          <h2>Recent Departments</h2>
          {stats.recentDepartments.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Employees</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentDepartments.map(department => (
                  <tr key={department.id}>
                    <td>{department.name}</td>
                    <td>{department.description || 'No description'}</td>
                    <td>{department.employees?.length || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No departments found</p>
          )}
          <Link to="/departments" className="btn" style={{ marginTop: '1rem' }}>View All Departments</Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
