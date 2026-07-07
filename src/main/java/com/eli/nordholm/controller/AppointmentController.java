package com.eli.nordholm.controller;

import com.eli.nordholm.dto.AppointmentRequest;
import com.eli.nordholm.security.UserUtil;
import com.eli.nordholm.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Customer-facing appointment endpoints. Requires a valid JWT (see JwtAuthFilter /
 * SecurityConfig — everything outside /auth/** and /admin/** requires authentication).
 */
@RestController
@RequestMapping("/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;

    @PostMapping
    public ResponseEntity<?> book(@RequestBody AppointmentRequest request) {
        try {
            String email = UserUtil.getCurrentUserEmail();
            return ResponseEntity.ok(appointmentService.book(email, request));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> myAppointments() {
        try {
            String email = UserUtil.getCurrentUserEmail();
            return ResponseEntity.ok(appointmentService.getMyAppointments(email));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
}
