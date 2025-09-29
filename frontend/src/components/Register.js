import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FaUser, FaEnvelope, FaLock, FaUserPlus, FaEye, FaEyeSlash } from 'react-icons/fa';
import { authService } from '../services/authService';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
    
    setLoading(true);

    try {
      await authService.register({
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      toast.success('Registration successful! Please login.');
      navigate('/login');
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <div style={{ 
        background: 'white', 
        borderRadius: '16px', 
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        padding: '3rem',
        width: '100%',
        maxWidth: '450px',
        position: 'relative'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            boxShadow: '0 8px 20px rgba(102, 126, 234, 0.3)'
          }}>
            <FaUserPlus style={{ fontSize: '2rem', color: 'white' }} />
          </div>
          <h2 style={{ 
            margin: '0 0 0.5rem 0', 
            color: '#2c3e50',
            fontSize: '1.8rem',
            fontWeight: '600'
          }}>
            Create Account
          </h2>
          <p style={{ 
            color: '#7f8c8d', 
            margin: '0',
            fontSize: '1rem'
          }}>
            Join the Employee Management System
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '600',
              color: '#2c3e50',
              fontSize: '0.9rem'
            }}>
              <FaUser style={{ marginRight: '0.5rem', color: '#667eea' }} />
              Username *
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Choose a username"
              style={{
                width: '100%',
                padding: '1rem',
                border: `2px solid ${errors.username ? '#e74c3c' : '#e1e8ed'}`,
                borderRadius: '10px',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = errors.username ? '#e74c3c' : '#667eea'}
              onBlur={(e) => e.target.style.borderColor = errors.username ? '#e74c3c' : '#e1e8ed'}
            />
            {errors.username && (
              <div style={{ 
                color: '#e74c3c', 
                fontSize: '0.8rem', 
                marginTop: '0.5rem',
                fontWeight: '500'
              }}>
                {errors.username}
              </div>
            )}
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '600',
              color: '#2c3e50',
              fontSize: '0.9rem'
            }}>
              <FaEnvelope style={{ marginRight: '0.5rem', color: '#667eea' }} />
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              style={{
                width: '100%',
                padding: '1rem',
                border: `2px solid ${errors.email ? '#e74c3c' : '#e1e8ed'}`,
                borderRadius: '10px',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = errors.email ? '#e74c3c' : '#667eea'}
              onBlur={(e) => e.target.style.borderColor = errors.email ? '#e74c3c' : '#e1e8ed'}
            />
            {errors.email && (
              <div style={{ 
                color: '#e74c3c', 
                fontSize: '0.8rem', 
                marginTop: '0.5rem',
                fontWeight: '500'
              }}>
                {errors.email}
              </div>
            )}
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '600',
              color: '#2c3e50',
              fontSize: '0.9rem'
            }}>
              <FaLock style={{ marginRight: '0.5rem', color: '#667eea' }} />
              Password *
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Create a password"
                style={{
                  width: '100%',
                  padding: '1rem',
                  paddingRight: '3rem',
                  border: `2px solid ${errors.password ? '#e74c3c' : '#e1e8ed'}`,
                  borderRadius: '10px',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = errors.password ? '#e74c3c' : '#667eea'}
                onBlur={(e) => e.target.style.borderColor = errors.password ? '#e74c3c' : '#e1e8ed'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#7f8c8d',
                  cursor: 'pointer',
                  fontSize: '1.1rem'
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <div style={{ 
                color: '#e74c3c', 
                fontSize: '0.8rem', 
                marginTop: '0.5rem',
                fontWeight: '500'
              }}>
                {errors.password}
              </div>
            )}
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '600',
              color: '#2c3e50',
              fontSize: '0.9rem'
            }}>
              <FaLock style={{ marginRight: '0.5rem', color: '#667eea' }} />
              Confirm Password *
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm your password"
                style={{
                  width: '100%',
                  padding: '1rem',
                  paddingRight: '3rem',
                  border: `2px solid ${errors.confirmPassword ? '#e74c3c' : '#e1e8ed'}`,
                  borderRadius: '10px',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = errors.confirmPassword ? '#e74c3c' : '#667eea'}
                onBlur={(e) => e.target.style.borderColor = errors.confirmPassword ? '#e74c3c' : '#e1e8ed'}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{
                  position: 'absolute',
                  right: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#7f8c8d',
                  cursor: 'pointer',
                  fontSize: '1.1rem'
                }}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.confirmPassword && (
              <div style={{ 
                color: '#e74c3c', 
                fontSize: '0.8rem', 
                marginTop: '0.5rem',
                fontWeight: '500'
              }}>
                {errors.confirmPassword}
              </div>
            )}
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{
              width: '100%',
              padding: '1rem',
              background: loading ? '#bdc3c7' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              boxShadow: loading ? 'none' : '0 4px 15px rgba(102, 126, 234, 0.4)'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
              }
            }}
          >
            <FaUserPlus />
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        {/* Footer */}
        <div style={{ 
          textAlign: 'center', 
          marginTop: '2rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid #e1e8ed'
        }}>
          <p style={{ color: '#7f8c8d', margin: '0 0 1rem 0' }}>
            Already have an account?
          </p>
          <button 
            onClick={() => navigate('/login')}
            style={{ 
              background: 'none', 
              border: '2px solid #667eea',
              color: '#667eea', 
              padding: '0.75rem 2rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#667eea';
              e.target.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'none';
              e.target.style.color = '#667eea';
            }}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;



