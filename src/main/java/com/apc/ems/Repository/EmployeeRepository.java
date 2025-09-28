package com.apc.ems.Repository;

import com.apc.ems.Entities.Employee;
import com.apc.ems.Entities.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    
    // Find employee by email
    Optional<Employee> findByEmail(String email);
    
    // Find employees by department
    List<Employee> findByDepartment(Department department);
    
    // Find employees by department ID
    List<Employee> findByDepartmentId(Long departmentId);
    
    // Check if employee exists by email
    boolean existsByEmail(String email);
    
    // Find employees by name (case insensitive)
    List<Employee> findByNameContainingIgnoreCase(String name);
}
