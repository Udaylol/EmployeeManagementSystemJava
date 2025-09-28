# EMS Frontend - React Application

A modern React frontend for the Employee Management System that consumes the Spring Boot REST APIs.

## Features

- **Dashboard**: Overview of employees and departments with statistics
- **Employee Management**: 
  - View all employees with search and filtering
  - Add new employees
  - Edit existing employees
  - Delete employees
  - Search by name or email
  - Filter by department
- **Department Management**:
  - View all departments
  - Add new departments
  - Edit existing departments
  - Delete departments
  - Search departments by name or description

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- Backend Spring Boot application running on port 8080

## Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

1. Make sure your Spring Boot backend is running on `http://localhost:8080`

2. Start the React development server:
   ```bash
   npm start
   ```

3. The application will open in your browser at `http://localhost:3000`

## API Integration

The frontend is configured to communicate with the Spring Boot backend running on port 8080. The API endpoints include:

### Employee Endpoints
- `GET /employees` - Get all employees
- `GET /employees/{id}` - Get employee by ID
- `GET /employees/email/{email}` - Get employee by email
- `GET /employees/department/{departmentId}` - Get employees by department
- `GET /employees/name/{name}` - Search employees by name
- `POST /employees` - Create new employee
- `PUT /employees/{id}` - Update employee
- `DELETE /employees/{id}` - Delete employee
- `PUT /employees/{employeeId}/assign/{departmentId}` - Assign employee to department

### Department Endpoints
- `GET /departments` - Get all departments
- `GET /departments/{id}` - Get department by ID
- `GET /departments/name/{name}` - Get department by name
- `POST /departments` - Create new department
- `PUT /departments/{id}` - Update department
- `DELETE /departments/{id}` - Delete department

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Dashboard.js
│   │   ├── EmployeeList.js
│   │   ├── EmployeeForm.js
│   │   ├── DepartmentList.js
│   │   └── DepartmentForm.js
│   ├── services/
│   │   └── api.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## Technologies Used

- **React 18** - Frontend framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **CSS3** - Modern styling with responsive design

## Features

- Responsive design that works on desktop and mobile
- Real-time search and filtering
- Form validation
- Error handling and user feedback
- Modern UI with clean design
- Cross-origin requests support (CORS enabled on backend)

## Development

The application uses Create React App with the following scripts:

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App (not recommended)

## Configuration

The API base URL is configured in `src/services/api.js`. If your backend runs on a different port, update the `API_BASE_URL` constant.

## Troubleshooting

1. **CORS Issues**: Make sure your Spring Boot backend has CORS enabled (which it does with `@CrossOrigin(origins = "*")`)

2. **Connection Refused**: Ensure the Spring Boot backend is running on port 8080

3. **API Errors**: Check the browser console and network tab for detailed error messages

## Production Build

To create a production build:

```bash
npm run build
```

This creates a `build` folder with optimized static files ready for deployment.
