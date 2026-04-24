package com.eli.nordholm.controller;

import com.eli.nordholm.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor


public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AuthRequest request) {
        try {
            return ResponseEntity.ok(
                    authService.register(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @PostMapping("/login")
    public String login(@RequestBody AuthRequest request) {
        return authService.login(request.getEmail(), request.getPassword());
    }
}
