import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FaUser, FaLock, FaSignInAlt } from 'react-icons/fa';
import { authService } from '../services/authService';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authService.login(formData);
      toast.success('Login successful!');
      navigate('/');
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
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
    }}>
      <div className="card" style={{ width: '400px', maxWidth: '90vw' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <FaSignInAlt style={{ fontSize: '3rem', color: 'var(--primary-color)', marginBottom: '1rem' }} />
          <h2>Login to EMS</h2>
          <p style={{ color: '#666', marginTop: '0.5rem' }}>Employee Management System</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">
              <FaUser className="icon" style={{ marginRight: '0.5rem' }} />
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Enter your username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <FaLock className="icon" style={{ marginRight: '0.5rem' }} />
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-success"
            disabled={loading}
            style={{ width: '100%', marginTop: '1rem' }}
          >
            <FaSignInAlt className="icon" />
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <p style={{ color: '#666' }}>
            Don't have an account? 
            <button 
              onClick={() => navigate('/register')}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: 'var(--primary-color)', 
                cursor: 'pointer',
                textDecoration: 'underline',
                marginLeft: '0.5rem'
              }}
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;



