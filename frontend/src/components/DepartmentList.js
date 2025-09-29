import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { 
  FaBuilding, 
  FaPlus, 
  FaSearch, 
  FaEdit, 
  FaTrash, 
  FaUsers,
  FaIdCard,
  FaFileAlt
} from 'react-icons/fa';
import { departmentAPI } from '../services/api';

function DepartmentList() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const response = await departmentAPI.getAllDepartments();
      setDepartments(response.data);
    } catch (err) {
      setError('Failed to load departments');
      console.error('Error fetching departments:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"? This will also remove all employees from this department.`)) {
      try {
        await departmentAPI.deleteDepartment(id);
        setDepartments(departments.filter(dept => dept.id !== id));
        toast.success(`Department "${name}" deleted successfully!`);
      } catch (err) {
        toast.error('Failed to delete department');
        console.error('Delete error:', err);
      }
    }
  };

  const handleSearch = () => {
    // Client-side search for departments
    if (!searchTerm.trim()) {
      fetchDepartments();
      return;
    }
    
    const filtered = departments.filter(dept =>
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (dept.description && dept.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setDepartments(filtered);
  };

  const handleClear = () => {
    setSearchTerm('');
    fetchDepartments();
  };

  const filteredDepartments = departments.filter(department => {
    if (!searchTerm) return true;
    return department.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           (department.description && department.description.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  if (loading) {
    return <div className="loading">Loading departments...</div>;
  }

  return (
    <div>
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <FaBuilding className="icon" style={{ color: 'var(--primary-color)' }} />
          <h2>Department Management</h2>
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
              placeholder="Search departments by name or description..."
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
          <button className="btn btn-secondary" onClick={handleClear}>
            Clear
          </button>
        </div>

        <Link to="/departments/new" className="btn btn-success">
          <FaPlus className="icon" />
          Add New Department
        </Link>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <FaBuilding className="icon" style={{ color: 'var(--primary-color)' }} />
          <h3>Departments ({filteredDepartments.length})</h3>
        </div>
        
        {filteredDepartments.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <table className="table">
              <thead>
                <tr>
                  <th><FaIdCard className="icon" /> ID</th>
                  <th><FaBuilding className="icon" /> Name</th>
                  <th><FaFileAlt className="icon" /> Description</th>
                  <th><FaUsers className="icon" /> Employee Count</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDepartments.map((department) => (
                  <tr key={department.id}>
                    <td><strong>{department.id}</strong></td>
                    <td>
                      <div style={{ fontWeight: '600', color: 'var(--dark-color)' }}>
                        {department.name}
                      </div>
                    </td>
                    <td>
                      {department.description ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <FaFileAlt style={{ color: '#666', fontSize: '0.8rem' }} />
                          {department.description}
                        </div>
                      ) : (
                        <span style={{ color: '#999', fontStyle: 'italic' }}>No description</span>
                      )}
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--info-color)', fontWeight: '600' }}>
                        <FaUsers style={{ fontSize: '0.8rem' }} />
                        {department.employees?.length || 0}
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <Link 
                          to={`/departments/edit/${department.id}`} 
                          className="btn btn-secondary"
                          style={{ padding: '0.5rem', fontSize: '0.8rem' }}
                        >
                          <FaEdit className="icon" />
                        </Link>
                        <button 
                          className="btn btn-danger"
                          onClick={() => handleDelete(department.id, department.name)}
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
            <FaBuilding style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.3 }} />
            <p style={{ fontSize: '1.1rem' }}>No departments found</p>
            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
              Try adjusting your search criteria or add a new department.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DepartmentList;
