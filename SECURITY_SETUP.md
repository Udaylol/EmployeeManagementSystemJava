# Spring Security Setup for Employee Management System

## Overview
This document describes the Spring Security implementation added to the Employee Management System, including JWT-based authentication and authorization.

## Features Added

### Backend Security Features
- **JWT Authentication**: Secure token-based authentication
- **User Management**: User registration and login
- **Role-based Access Control**: USER and ADMIN roles
- **Password Encryption**: BCrypt password hashing
- **CORS Configuration**: Proper cross-origin resource sharing
- **Protected Endpoints**: All API endpoints require authentication

### Frontend Security Features
- **Login/Register Pages**: User authentication interface
- **Protected Routes**: Automatic redirection to login for unauthenticated users
- **Token Management**: Automatic token inclusion in API requests
- **Session Management**: Persistent login sessions
- **Logout Functionality**: Secure logout with token cleanup

## API Endpoints

### Authentication Endpoints (Public)
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout

### Protected Endpoints (Require Authentication)
- `GET /api/employees` - Get all employees
- `POST /api/employees` - Create employee
- `PUT /api/employees/{id}` - Update employee
- `DELETE /api/employees/{id}` - Delete employee
- `GET /api/departments` - Get all departments
- `POST /api/departments` - Create department
- `PUT /api/departments/{id}` - Update department
- `DELETE /api/departments/{id}` - Delete department

## Database Schema

### Users Table
```sql
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    enabled BOOLEAN DEFAULT TRUE,
    account_non_expired BOOLEAN DEFAULT TRUE,
    account_non_locked BOOLEAN DEFAULT TRUE,
    credentials_non_expired BOOLEAN DEFAULT TRUE
);
```

## Configuration

### JWT Configuration (application.properties)
```properties
jwt.secret=mySecretKey
jwt.expiration=86400000
```

### Security Configuration
- **Password Encoder**: BCrypt with default strength
- **Session Management**: Stateless (JWT-based)
- **CORS**: Configured for frontend communication
- **CSRF**: Disabled for API usage

## Usage Instructions

### 1. Start the Backend
```bash
mvn spring-boot:run
```

### 2. Start the Frontend
```bash
cd frontend
npm install
npm start
```

### 3. Access the Application
1. Navigate to `http://localhost:3000`
2. You'll be redirected to the login page
3. Register a new account or use existing credentials
4. After login, you'll have access to all protected features

### 4. Default Admin User
To create an admin user, you can:
1. Register a regular user through the frontend
2. Update the user's role in the database:
   ```sql
   UPDATE users SET role = 'ADMIN' WHERE username = 'your_username';
   ```

## Security Features

### JWT Token
- **Expiration**: 24 hours (configurable)
- **Algorithm**: HS256
- **Storage**: LocalStorage (frontend)
- **Auto-refresh**: Not implemented (tokens expire after 24 hours)

### Password Security
- **Hashing**: BCrypt with salt
- **Minimum Length**: 6 characters
- **Validation**: Frontend and backend validation

### API Security
- **Authentication**: Required for all protected endpoints
- **Authorization**: Role-based access control
- **CORS**: Configured for frontend domain
- **Headers**: Automatic token inclusion

## Troubleshooting

### Common Issues

1. **401 Unauthorized**
   - Check if token is present in localStorage
   - Verify token hasn't expired
   - Ensure user is logged in

2. **CORS Errors**
   - Verify backend CORS configuration
   - Check frontend URL matches allowed origins

3. **Login Issues**
   - Verify user exists in database
   - Check password is correct
   - Ensure user account is enabled

### Testing Authentication

1. **Test Login**:
   ```bash
   curl -X POST http://localhost:8080/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"username":"testuser","password":"password123"}'
   ```

2. **Test Protected Endpoint**:
   ```bash
   curl -X GET http://localhost:8080/api/employees \
     -H "Authorization: Bearer YOUR_JWT_TOKEN"
   ```

## Security Considerations

1. **Token Storage**: Currently using localStorage (consider httpOnly cookies for production)
2. **HTTPS**: Use HTTPS in production
3. **Token Expiration**: Consider implementing refresh tokens
4. **Rate Limiting**: Consider adding rate limiting for login attempts
5. **Password Policy**: Implement stronger password requirements
6. **Audit Logging**: Add logging for security events

## Next Steps

1. Implement refresh token mechanism
2. Add password reset functionality
3. Implement account lockout after failed attempts
4. Add audit logging
5. Implement role-based UI restrictions
6. Add email verification for registration



