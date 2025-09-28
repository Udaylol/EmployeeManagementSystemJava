import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { 
  FaUsers, 
  FaPlus, 
  FaSearch, 
  FaEdit, 
  FaTrash, 
  FaFilter,
  FaPhone,
  FaEnvelope,
  FaDollarSign,
  FaBuilding,
  FaIdCard
} from 'react-icons/fa';
import { employeeAPI, departmentAPI } from '../services/api';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [employeesRes, departmentsRes] = await Promise.all([
        employeeAPI.getAllEmployees(),
        departmentAPI.getAllDepartments()
      ]);
      setEmployees(employeesRes.data);
      setDepartments(departmentsRes.data);
    } catch (err) {
      setError('Failed to load employees');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await employeeAPI.deleteEmployee(id);
        setEmployees(employees.filter(emp => emp.id !== id));
        toast.success(`${name} deleted successfully!`);
      } catch (err) {
        toast.error('Failed to delete employee');
        console.error('Delete error:', err);
      }
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      fetchData();
      return;
    }

    try {
      setLoading(true);
      const response = await employeeAPI.searchEmployeesByName(searchTerm);
      setEmployees(response.data);
      toast.success(`Found ${response.data.length} employee(s)`);
    } catch (err) {
      toast.error('Failed to search employees');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDepartmentFilter = async () => {
    if (!selectedDepartment) {
      fetchData();
      return;
    }

    try {
      setLoading(true);
      const response = await employeeAPI.getEmployeesByDepartmentId(selectedDepartment);
      setEmployees(response.data);
    } catch (err) {
      setError('Failed to filter employees by department');
      console.error('Filter error:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = !searchTerm || 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = !selectedDepartment || 
      employee.department?.id === parseInt(selectedDepartment);
    
    return matchesSearch && matchesDepartment;
  });

  if (loading) {
    return <div className="loading">Loading employees...</div>;
  }

  return (
    <div>
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <FaUsers className="icon" style={{ color: 'var(--primary-color)' }} />
          <h2>Employee Management</h2>
        </div>
        
        <div className="search-bar">
          <div style={{ position: 'relative', flex: 1 }}>
            <FaSearch style={{ 
              position: 'absolute', 
              left: '12px', 
              top: '50%', 
              transform: 'translateY(-50%)', 
              color: '#666' 
            }} />
            <input
              type="text"
              placeholder="Search employees by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              style={{ paddingLeft: '40px' }}
            />
          </div>
          <button className="btn" onClick={handleSearch}>
            <FaSearch className="icon" />
            Search
          </button>
          <button className="btn btn-secondary" onClick={fetchData}>
            Clear
          </button>
        </div>

        <div className="search-bar">
          <div style={{ position: 'relative', flex: 1 }}>
            <FaFilter style={{ 
              position: 'absolute', 
              left: '12px', 
              top: '50%', 
              transform: 'translateY(-50%)', 
              color: '#666' 
            }} />
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              style={{ paddingLeft: '40px' }}
            >
              <option value="">All Departments</option>
              {departments.map(dept => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>
          <button className="btn" onClick={handleDepartmentFilter}>
            <FaFilter className="icon" />
            Filter
          </button>
        </div>

        <Link to="/employees/new" className="btn btn-success">
          <FaPlus className="icon" />
          Add New Employee
        </Link>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <FaUsers className="icon" style={{ color: 'var(--primary-color)' }} />
          <h3>Employees ({filteredEmployees.length})</h3>
        </div>
        
        {filteredEmployees.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <table className="table">
              <thead>
                <tr>
                  <th><FaIdCard className="icon" /> ID</th>
                  <th><FaUsers className="icon" /> Name</th>
                  <th><FaEnvelope className="icon" /> Email</th>
                  <th><FaPhone className="icon" /> Phone</th>
                  <th><FaDollarSign className="icon" /> Salary</th>
                  <th><FaBuilding className="icon" /> Department</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id}>
                    <td><strong>{employee.id}</strong></td>
                    <td>
                      <div style={{ fontWeight: '600', color: 'var(--dark-color)' }}>
                        {employee.name}
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FaEnvelope style={{ color: '#666', fontSize: '0.8rem' }} />
                        {employee.email}
                      </div>
                    </td>
                    <td>
                      {employee.phone ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <FaPhone style={{ color: '#666', fontSize: '0.8rem' }} />
                          {employee.phone}
                        </div>
                      ) : (
                        <span style={{ color: '#999', fontStyle: 'italic' }}>N/A</span>
                      )}
                    </td>
                    <td>
                      {employee.salary ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--success-color)', fontWeight: '600' }}>
                          <FaDollarSign style={{ fontSize: '0.8rem' }} />
                          {employee.salary.toLocaleString()}
                        </div>
                      ) : (
                        <span style={{ color: '#999', fontStyle: 'italic' }}>N/A</span>
                      )}
                    </td>
                    <td>
                      {employee.department ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <FaBuilding style={{ color: '#666', fontSize: '0.8rem' }} />
                          {employee.department.name}
                        </div>
                      ) : (
                        <span style={{ color: '#999', fontStyle: 'italic' }}>No Department</span>
                      )}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <Link 
                          to={`/employees/edit/${employee.id}`} 
                          className="btn btn-secondary"
                          style={{ padding: '0.5rem', fontSize: '0.8rem' }}
                        >
                          <FaEdit className="icon" />
                        </Link>
                        <button 
                          className="btn btn-danger"
                          onClick={() => handleDelete(employee.id, employee.name)}
                          style={{ padding: '0.5rem', fontSize: '0.8rem' }}
                        >
                          <FaTrash className="icon" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
            <FaUsers style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.3 }} />
            <p style={{ fontSize: '1.1rem' }}>No employees found</p>
            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
              Try adjusting your search criteria or add a new employee.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmployeeList;
