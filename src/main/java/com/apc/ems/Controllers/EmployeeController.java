package com.apc.ems.Controllers;

import com.apc.ems.Entities.Employee;
import com.apc.ems.Service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/employees")
@CrossOrigin(origins = "*")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    // GET /employees - Get all employees
    @GetMapping
    public ResponseEntity<List<Employee>> getAllEmployees() {
        List<Employee> employees = employeeService.getAllEmployees();
        return ResponseEntity.ok(employees);
    }

    // GET /employees/{id} - Get employee by ID
    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        Optional<Employee> employee = employeeService.getEmployeeById(id);
        return employee.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // GET /employees/email/{email} - Get employee by email
    @GetMapping("/email/{email}")
    public ResponseEntity<Employee> getEmployeeByEmail(@PathVariable String email) {
        Optional<Employee> employee = employeeService.getEmployeeByEmail(email);
        return employee.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // GET /employees/department/{departmentId} - Get employees by department
    @GetMapping("/department/{departmentId}")
    public ResponseEntity<List<Employee>> getEmployeesByDepartment(@PathVariable Long departmentId) {
        List<Employee> employees = employeeService.getEmployeesByDepartmentId(departmentId);
        return ResponseEntity.ok(employees);
    }

    // GET /employees/search/{name} - Search employees by name
    @GetMapping("/search/{name}")
    public ResponseEntity<List<Employee>> searchEmployeesByName(@PathVariable String name) {
        List<Employee> employees = employeeService.searchEmployeesByName(name);
        return ResponseEntity.ok(employees);
    }

    // POST /employees - Create new employee
    @PostMapping
    public ResponseEntity<?> createEmployee(@RequestBody Employee employee) {
        try {
            Employee createdEmployee = employeeService.createEmployee(employee);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdEmployee);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // PUT /employees/{id} - Update employee
    @PutMapping("/{id}")
    public ResponseEntity<?> updateEmployee(@PathVariable Long id, @RequestBody Employee employeeDetails) {
        try {
            Employee updatedEmployee = employeeService.updateEmployee(id, employeeDetails);
            return ResponseEntity.ok(updatedEmployee);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // DELETE /employees/{id} - Delete employee
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable Long id) {
        try {
            employeeService.deleteEmployee(id);
            return ResponseEntity.ok("Employee deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // PUT /employees/{employeeId}/assign/{departmentId} - Assign employee to department
    @PutMapping("/{employeeId}/assign/{departmentId}")
    public ResponseEntity<?> assignEmployeeToDepartment(@PathVariable Long employeeId, @PathVariable Long departmentId) {
        try {
            Employee updatedEmployee = employeeService.assignEmployeeToDepartment(employeeId, departmentId);
            return ResponseEntity.ok(updatedEmployee);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // GET /employees/check/{id} - Check if employee exists
    @GetMapping("/check/{id}")
    public ResponseEntity<Boolean> checkEmployeeExists(@PathVariable Long id) {
        boolean exists = employeeService.employeeExists(id);
        return ResponseEntity.ok(exists);
    }

    // GET /employees/check/email/{email} - Check if employee exists by email
    @GetMapping("/check/email/{email}")
    public ResponseEntity<Boolean> checkEmployeeExistsByEmail(@PathVariable String email) {
        boolean exists = employeeService.employeeExistsByEmail(email);
        return ResponseEntity.ok(exists);
    }
}
