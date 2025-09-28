package com.apc.ems.Controllers;

import com.apc.ems.DTOs.AuthResponse;
import com.apc.ems.DTOs.LoginRequest;
import com.apc.ems.DTOs.RegisterRequest;
import com.apc.ems.Entities.User;
import com.apc.ems.Repository.UserRepository;
import com.apc.ems.Security.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            // First, let's check if the user exists
            User user = userRepository.findByUsername(loginRequest.getUsername())
                .orElse(null);
            
            if (user == null) {
                return ResponseEntity.badRequest()
                    .body("User not found with username: " + loginRequest.getUsername());
            }
            
            // Check if password matches
            if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                return ResponseEntity.badRequest()
                    .body("Invalid password");
            }
            
            // Generate JWT token
            String jwt = jwtUtil.generateToken(user);
            
            return ResponseEntity.ok(new AuthResponse(
                jwt,
                user.getUsername(),
                user.getEmail(),
                user.getRole().name()
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body("Login error: " + e.getMessage());
        }
    }
    
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest registerRequest) {
        try {
            // Check if username already exists
            if (userRepository.existsByUsername(registerRequest.getUsername())) {
                return ResponseEntity.badRequest()
                    .body("Username is already taken!");
            }
            
            // Check if email already exists
            if (userRepository.existsByEmail(registerRequest.getEmail())) {
                return ResponseEntity.badRequest()
                    .body("Email is already in use!");
            }
            
            // Create new user
            User user = new User(
                registerRequest.getUsername(),
                registerRequest.getEmail(),
                passwordEncoder.encode(registerRequest.getPassword()),
                registerRequest.getRole()
            );
            
            userRepository.save(user);
            
            return ResponseEntity.ok("User registered successfully!");
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body("Error during registration: " + e.getMessage());
        }
    }
    
    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok("Logged out successfully");
    }
    
    // Debug endpoint to check users (remove in production)
    @GetMapping("/debug/users")
    public ResponseEntity<?> debugUsers() {
        try {
            return ResponseEntity.ok(userRepository.findAll());
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body("Error fetching users: " + e.getMessage());
        }
    }
}



