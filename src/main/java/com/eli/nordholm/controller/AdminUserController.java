package com.eli.nordholm.controller;

import com.eli.nordholm.model.Role;
import com.eli.nordholm.model.User;
import com.eli.nordholm.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/** Admin-only: view customer accounts (no password data exposed). */
@RestController
@RequestMapping("/admin/users")
@RequiredArgsConstructor
public class AdminUserController {

    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<?> getCustomers() {
        List<Map<String, Object>> customers = userRepository.findByRole(Role.USER).stream()
                .map(this::toSafeMap)
                .toList();
        return ResponseEntity.ok(customers);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCustomer(@PathVariable Long id) {
        User user = userRepository.findById(id).orElse(null);
        if (user == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Customer not found."));
        }
        return ResponseEntity.ok(toSafeMap(user));
    }

    private Map<String, Object> toSafeMap(User user) {
        return Map.of(
                "id", user.getId(),
                "email", user.getEmail(),
                "verified", user.isVerified(),
                "role", user.getRole()
        );
    }
}
