import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { 
  FaBuilding, 
  FaFileAlt, 
  FaSave, 
  FaTimes,
  FaPlus,
  FaEdit
} from 'react-icons/fa';
import { departmentAPI } from '../services/api';

function DepartmentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isEdit) {
      fetchDepartment();
    }
  }, [id, isEdit]);

  const fetchDepartment = async () => {
    try {
      setLoading(true);
      const response = await departmentAPI.getDepartmentById(id);
      const department = response.data;
      setFormData({
        name: department.name || '',
        description: department.description || ''
      });
    } catch (err) {
      toast.error('Failed to load department data');
      console.error('Error fetching department:', err);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Department name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Department name must be at least 2 characters';
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
      if (isEdit) {
        await departmentAPI.updateDepartment(id, formData);
        toast.success('Department updated successfully!');
      } else {
        await departmentAPI.createDepartment(formData);
        toast.success('Department created successfully!');
      }

      setTimeout(() => {
        navigate('/departments');
      }, 1500);
    } catch (err) {
      const errorMessage = err.response?.data || 'Failed to save department';
      toast.error(errorMessage);
      console.error('Save error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading && isEdit) {
    return <div className="loading">Loading department data...</div>;
  }

  return (
    <div>
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {isEdit ? (
            <FaEdit className="icon" style={{ color: 'var(--primary-color)' }} />
          ) : (
            <FaPlus className="icon" style={{ color: 'var(--primary-color)' }} />
          )}
          <h2>{isEdit ? 'Edit Department' : 'Add New Department'}</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">
              <FaBuilding className="icon" style={{ marginRight: '0.5rem' }} />
              Department Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter department name"
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="description">
              <FaFileAlt className="icon" style={{ marginRight: '0.5rem' }} />
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter department description"
              rows="4"
            />
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
            <button 
              type="submit" 
              className="btn btn-success"
              disabled={isSubmitting}
            >
              <FaSave className="icon" />
              {isSubmitting ? 'Saving...' : (isEdit ? 'Update Department' : 'Create Department')}
            </button>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => navigate('/departments')}
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

export default DepartmentForm;
