import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaDollarSign, 
  FaBuilding, 
  FaSave, 
  FaTimes,
  FaUserPlus,
  FaUserEdit
} from 'react-icons/fa';
import { employeeAPI, departmentAPI } from '../services/api';

function EmployeeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    salary: '',
    department: null
  });
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchDepartments();
    if (isEdit) {
      fetchEmployee();
    }
  }, [id, isEdit]);

  const fetchDepartments = async () => {
    try {
      const response = await departmentAPI.getAllDepartments();
      setDepartments(response.data);
    } catch (err) {
      toast.error('Failed to load departments');
      console.error('Error fetching departments:', err);
    }
  };

  const fetchEmployee = async () => {
    try {
      setLoading(true);
      const response = await employeeAPI.getEmployeeById(id);
      const employee = response.data;
      setFormData({
        name: employee.name || '',
        email: employee.email || '',
        phone: employee.phone || '',
        salary: employee.salary || '',
        department: employee.department?.id || null
      });
    } catch (err) {
      toast.error('Failed to load employee data');
      console.error('Error fetching employee:', err);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (formData.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (formData.salary && (isNaN(formData.salary) || parseFloat(formData.salary) < 0)) {
      newErrors.salary = 'Please enter a valid salary amount';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the form errors');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const employeeData = {
        ...formData,
        salary: formData.salary ? parseFloat(formData.salary) : null,
        department: formData.department ? { id: parseInt(formData.department) } : null
      };

      if (isEdit) {
        await employeeAPI.updateEmployee(id, employeeData);
        toast.success('Employee updated successfully!');
      } else {
        await employeeAPI.createEmployee(employeeData);
        toast.success('Employee created successfully!');
      }

      setTimeout(() => {
        navigate('/employees');
      }, 1500);
    } catch (err) {
      const errorMessage = err.response?.data || 'Failed to save employee';
      toast.error(errorMessage);
      console.error('Save error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading && isEdit) {
    return <div className="loading">Loading employee data...</div>;
  }

  return (
    <div>
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {isEdit ? (
            <FaUserEdit className="icon" style={{ color: 'var(--primary-color)' }} />
          ) : (
            <FaUserPlus className="icon" style={{ color: 'var(--primary-color)' }} />
          )}
          <h2>{isEdit ? 'Edit Employee' : 'Add New Employee'}</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">
              <FaUser className="icon" style={{ marginRight: '0.5rem' }} />
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter employee name"
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="email">
              <FaEnvelope className="icon" style={{ marginRight: '0.5rem' }} />
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter employee email"
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">
              <FaPhone className="icon" style={{ marginRight: '0.5rem' }} />
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              className={errors.phone ? 'error' : ''}
            />
            {errors.phone && <div className="error-message">{errors.phone}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="salary">
              <FaDollarSign className="icon" style={{ marginRight: '0.5rem' }} />
              Salary
            </label>
            <input
              type="number"
              id="salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="Enter salary"
              min="0"
              step="0.01"
              className={errors.salary ? 'error' : ''}
            />
            {errors.salary && <div className="error-message">{errors.salary}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="department">
              <FaBuilding className="icon" style={{ marginRight: '0.5rem' }} />
              Department
            </label>
            <select
              id="department"
              name="department"
              value={formData.department || ''}
              onChange={handleChange}
            >
              <option value="">Select Department</option>
              {departments.map(dept => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
            <button 
              type="submit" 
              className="btn btn-success"
              disabled={isSubmitting}
            >
              <FaSave className="icon" />
              {isSubmitting ? 'Saving...' : (isEdit ? 'Update Employee' : 'Create Employee')}
            </button>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => navigate('/employees')}
            >
              <FaTimes className="icon" />
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmployeeForm;
