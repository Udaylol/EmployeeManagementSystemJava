import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Employee API calls
export const employeeAPI = {
  // Get all employees
  getAllEmployees: () => api.get('/employees'),
  
  // Get employee by ID
  getEmployeeById: (id) => api.get(`/employees/${id}`),
  
  // Get employee by email
  getEmployeeByEmail: (email) => api.get(`/employees/email/${email}`),
  
  // Get employees by department ID
  getEmployeesByDepartmentId: (departmentId) => api.get(`/employees/department/${departmentId}`),
  
  // Search employees by name
  searchEmployeesByName: (name) => api.get(`/employees/name/${name}`),
  
  // Create new employee
  createEmployee: (employee) => api.post('/employees', employee),
  
  // Update employee
  updateEmployee: (id, employee) => api.put(`/employees/${id}`, employee),
  
  // Delete employee
  deleteEmployee: (id) => api.delete(`/employees/${id}`),
  
  // Assign employee to department
  assignEmployeeToDepartment: (employeeId, departmentId) => 
    api.put(`/employees/${employeeId}/assign/${departmentId}`),
  
  // Check if employee exists
  employeeExists: (id) => api.get(`/employees/exists/${id}`),
  
  // Check if employee exists by email
  employeeExistsByEmail: (email) => api.get(`/employees/exists/email/${email}`),
};

// Department API calls
export const departmentAPI = {
  // Get all departments
  getAllDepartments: () => api.get('/departments'),
  
  // Get department by ID
  getDepartmentById: (id) => api.get(`/departments/${id}`),
  
  // Get department by name
  getDepartmentByName: (name) => api.get(`/departments/name/${name}`),
  
  // Create new department
  createDepartment: (department) => api.post('/departments', department),
  
  // Update department
  updateDepartment: (id, department) => api.put(`/departments/${id}`, department),
  
  // Delete department
  deleteDepartment: (id) => api.delete(`/departments/${id}`),
  
  // Check if department exists
  departmentExists: (id) => api.get(`/departments/exists/${id}`),
  
  // Check if department exists by name
  departmentExistsByName: (name) => api.get(`/departments/exists/name/${name}`),
};

export default api;
