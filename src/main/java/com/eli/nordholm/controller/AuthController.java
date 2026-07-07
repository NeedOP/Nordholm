package com.eli.nordholm.controller;

import com.eli.nordholm.dto.AuthRequest;
import com.eli.nordholm.dto.ResetPasswordRequest;
import com.eli.nordholm.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @GetMapping("/verify")
    public ResponseEntity<?> verify(@RequestParam String token) {
        try {
            authService.verifyEmail(token);
            return ResponseEntity.ok(Map.of("message", "Email verified!"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody AuthRequest request) {
        try {
            authService.requestPasswordReset(request.getEmail());
            return ResponseEntity.ok(Map.of("message", "Reset email sent"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request) {
        try {
            authService.resetPassword(request.getToken(), request.getPassword());
            return ResponseEntity.ok(Map.of("message", "Password updated"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AuthRequest request) {
        try {
            return ResponseEntity.ok(Map.of("message", authService.register(request.getEmail(), request.getPassword())));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        try {
            String token = authService.login(request.getEmail(), request.getPassword());
            return ResponseEntity.ok(Map.of("token", token));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
}
