package com.apc.ems.Repository;

import com.apc.ems.Entities.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {
    
    // Find department by name
    Optional<Department> findByName(String name);
    
    // Check if department exists by name
    boolean existsByName(String name);
}
