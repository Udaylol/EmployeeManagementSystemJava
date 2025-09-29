import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaBuilding, FaChartLine, FaPlus, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { employeeAPI, departmentAPI } from '../services/api';
import { authService } from '../services/authService';

function Dashboard() {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalDepartments: 0,
    recentEmployees: [],
    recentDepartments: []
  });
  const [loading, setLoading] = useState(true);
  const [currentUser] = useState(authService.getCurrentUser());

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
        recentDepartments: departments.slice(-3).reverse()
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '400px',
        fontSize: '1.1rem',
        color: '#666'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #667eea',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}></div>
          Loading dashboard...
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Welcome Section */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '2rem',
        borderRadius: '16px',
        marginBottom: '2rem',
        boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
      }}>
        <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '2.5rem', fontWeight: '300' }}>
          Welcome back, {currentUser?.username}! 👋
        </h1>
        <p style={{ margin: '0', fontSize: '1.1rem', opacity: '0.9' }}>
          Here's what's happening with your Employee Management System today.
        </p>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          border: '1px solid #e1e8ed',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            height: '4px',
            background: 'linear-gradient(90deg, #667eea, #764ba2)'
          }}></div>
          <div style={{
            width: '60px',
            height: '60px',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem',
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
          }}>
            <FaUsers style={{ fontSize: '1.5rem', color: 'white' }} />
          </div>
          <h3 style={{ 
            fontSize: '2.5rem', 
            margin: '0 0 0.5rem 0', 
            color: '#2c3e50',
            fontWeight: '300'
          }}>
            {stats.totalEmployees}
          </h3>
          <p style={{ 
            margin: '0', 
            color: '#7f8c8d', 
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            fontSize: '0.9rem'
          }}>
            Total Employees
          </p>
        </div>

        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          border: '1px solid #e1e8ed',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            height: '4px',
            background: 'linear-gradient(90deg, #27ae60, #2ecc71)'
          }}></div>
          <div style={{
            width: '60px',
            height: '60px',
            background: 'linear-gradient(135deg, #27ae60, #2ecc71)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem',
            boxShadow: '0 4px 15px rgba(39, 174, 96, 0.3)'
          }}>
            <FaBuilding style={{ fontSize: '1.5rem', color: 'white' }} />
          </div>
          <h3 style={{ 
            fontSize: '2.5rem', 
            margin: '0 0 0.5rem 0', 
            color: '#2c3e50',
            fontWeight: '300'
          }}>
            {stats.totalDepartments}
          </h3>
          <p style={{ 
            margin: '0', 
            color: '#7f8c8d', 
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            fontSize: '0.9rem'
          }}>
            Departments
          </p>
        </div>

        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          border: '1px solid #e1e8ed',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            height: '4px',
            background: 'linear-gradient(90deg, #f39c12, #e67e22)'
          }}></div>
          <div style={{
            width: '60px',
            height: '60px',
            background: 'linear-gradient(135deg, #f39c12, #e67e22)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem',
            boxShadow: '0 4px 15px rgba(243, 156, 18, 0.3)'
          }}>
            <FaChartLine style={{ fontSize: '1.5rem', color: 'white' }} />
          </div>
          <h3 style={{ 
            fontSize: '2.5rem', 
            margin: '0 0 0.5rem 0', 
            color: '#2c3e50',
            fontWeight: '300'
          }}>
            {stats.totalEmployees > 0 ? Math.round((stats.totalEmployees / Math.max(stats.totalDepartments, 1)) * 10) / 10 : 0}
          </h3>
          <p style={{ 
            margin: '0', 
            color: '#7f8c8d', 
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            fontSize: '0.9rem'
          }}>
            Avg per Dept
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        border: '1px solid #e1e8ed',
        marginBottom: '2rem'
      }}>
        <h3 style={{ 
          margin: '0 0 1.5rem 0', 
          color: '#2c3e50',
          fontSize: '1.5rem',
          fontWeight: '600'
        }}>
          Quick Actions
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          <Link 
            to="/employees/new" 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '10px',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
            }}
          >
            <FaPlus />
            Add Employee
          </Link>
          <Link 
            to="/departments/new" 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem',
              background: 'linear-gradient(135deg, #27ae60, #2ecc71)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '10px',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(39, 174, 96, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(39, 174, 96, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(39, 174, 96, 0.3)';
            }}
          >
            <FaPlus />
            Add Department
          </Link>
          <Link 
            to="/employees" 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem',
              background: 'linear-gradient(135deg, #3498db, #2980b9)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '10px',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(52, 152, 219, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(52, 152, 219, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(52, 152, 219, 0.3)';
            }}
          >
            <FaUsers />
            View Employees
          </Link>
          <Link 
            to="/departments" 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem',
              background: 'linear-gradient(135deg, #9b59b6, #8e44ad)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '10px',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(155, 89, 182, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(155, 89, 182, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(155, 89, 182, 0.3)';
            }}
          >
            <FaBuilding />
            View Departments
          </Link>
        </div>
      </div>

      {/* Recent Data */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '2rem'
      }}>
        {/* Recent Employees */}
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          border: '1px solid #e1e8ed'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.5rem'
          }}>
            <h3 style={{ 
              margin: '0', 
              color: '#2c3e50',
              fontSize: '1.3rem',
              fontWeight: '600'
            }}>
              Recent Employees
            </h3>
            <Link 
              to="/employees"
              style={{
                color: '#667eea',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: '600'
              }}
            >
              View All
            </Link>
          </div>
          {stats.recentEmployees.length > 0 ? (
            <div>
              {stats.recentEmployees.map((employee) => (
                <div key={employee.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem',
                  border: '1px solid #e1e8ed',
                  borderRadius: '8px',
                  marginBottom: '0.75rem',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.boxShadow = '0 2px 8px rgba(102, 126, 234, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = '#e1e8ed';
                  e.target.style.boxShadow = 'none';
                }}
                >
                  <div>
                    <div style={{ fontWeight: '600', color: '#2c3e50', marginBottom: '0.25rem' }}>
                      {employee.name}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#7f8c8d' }}>
                      {employee.email}
                    </div>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#95a5a6' }}>
                    ID: {employee.id}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#7f8c8d' }}>
              <FaUsers style={{ fontSize: '2rem', marginBottom: '1rem', opacity: '0.5' }} />
              <p>No employees yet</p>
            </div>
          )}
        </div>

        {/* Recent Departments */}
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          border: '1px solid #e1e8ed'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.5rem'
          }}>
            <h3 style={{ 
              margin: '0', 
              color: '#2c3e50',
              fontSize: '1.3rem',
              fontWeight: '600'
            }}>
              Recent Departments
            </h3>
            <Link 
              to="/departments"
              style={{
                color: '#667eea',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: '600'
              }}
            >
              View All
            </Link>
          </div>
          {stats.recentDepartments.length > 0 ? (
            <div>
              {stats.recentDepartments.map((department) => (
                <div key={department.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem',
                  border: '1px solid #e1e8ed',
                  borderRadius: '8px',
                  marginBottom: '0.75rem',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.boxShadow = '0 2px 8px rgba(102, 126, 234, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = '#e1e8ed';
                  e.target.style.boxShadow = 'none';
                }}
                >
                  <div>
                    <div style={{ fontWeight: '600', color: '#2c3e50', marginBottom: '0.25rem' }}>
                      {department.name}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#7f8c8d' }}>
                      {department.employees?.length || 0} employees
                    </div>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#95a5a6' }}>
                    ID: {department.id}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#7f8c8d' }}>
              <FaBuilding style={{ fontSize: '2rem', marginBottom: '1rem', opacity: '0.5' }} />
              <p>No departments yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;