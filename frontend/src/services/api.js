import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Employee API calls
export const employeeAPI = {
  // Get all employees
  getAllEmployees: () => api.get('/api/employees'),
  
  // Get employee by ID
  getEmployeeById: (id) => api.get(`/api/employees/${id}`),
  
  // Get employee by email
  getEmployeeByEmail: (email) => api.get(`/api/employees/email/${email}`),
  
  // Get employees by department ID
  getEmployeesByDepartmentId: (departmentId) => api.get(`/api/employees/department/${departmentId}`),
  
  // Search employees by name
  searchEmployeesByName: (name) => api.get(`/api/employees/name/${name}`),
  
  // Create new employee
  createEmployee: (employee) => api.post('/api/employees', employee),
  
  // Update employee
  updateEmployee: (id, employee) => api.put(`/api/employees/${id}`, employee),
  
  // Delete employee
  deleteEmployee: (id) => api.delete(`/api/employees/${id}`),
  
  // Assign employee to department
  assignEmployeeToDepartment: (employeeId, departmentId) => 
    api.put(`/api/employees/${employeeId}/assign/${departmentId}`),
  
  // Check if employee exists
  employeeExists: (id) => api.get(`/api/employees/exists/${id}`),
  
  // Check if employee exists by email
  employeeExistsByEmail: (email) => api.get(`/api/employees/exists/email/${email}`),
};

// Department API calls
export const departmentAPI = {
  // Get all departments
  getAllDepartments: () => api.get('/api/departments'),
  
  // Get department by ID
  getDepartmentById: (id) => api.get(`/api/departments/${id}`),
  
  // Get department by name
  getDepartmentByName: (name) => api.get(`/api/departments/name/${name}`),
  
  // Create new department
  createDepartment: (department) => api.post('/api/departments', department),
  
  // Update department
  updateDepartment: (id, department) => api.put(`/api/departments/${id}`, department),
  
  // Delete department
  deleteDepartment: (id) => api.delete(`/api/departments/${id}`),
  
  // Check if department exists
  departmentExists: (id) => api.get(`/api/departments/exists/${id}`),
  
  // Check if department exists by name
  departmentExistsByName: (name) => api.get(`/api/departments/exists/name/${name}`),
};

export default api;
