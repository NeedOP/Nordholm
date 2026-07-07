package com.eli.nordholm.controller;

import com.eli.nordholm.dto.AppointmentRequest;
import com.eli.nordholm.dto.AppointmentStatusUpdateRequest;
import com.eli.nordholm.model.AppointmentStatus;
import com.eli.nordholm.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Admin-only appointment management. Access is restricted at the security-filter
 * level to ROLE_ADMIN (see SecurityConfig: "/admin/**" -> hasRole("ADMIN")).
 */
@RestController
@RequestMapping("/admin/appointments")
@RequiredArgsConstructor
public class AdminAppointmentController {

    private final AppointmentService appointmentService;

    @GetMapping
    public ResponseEntity<?> getAll(@RequestParam(required = false) AppointmentStatus status) {
        if (status != null) {
            return ResponseEntity.ok(appointmentService.getByStatus(status));
        }
        return ResponseEntity.ok(appointmentService.getAll());
    }

    @PostMapping
    public ResponseEntity<?> createForCustomer(
            @RequestParam String customerEmail,
            @RequestBody AppointmentRequest request
    ) {
        try {
            return ResponseEntity.ok(appointmentService.createForCustomer(customerEmail, request));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody AppointmentStatusUpdateRequest request) {
        try {
            return ResponseEntity.ok(appointmentService.updateStatus(id, request.getStatus()));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
}
