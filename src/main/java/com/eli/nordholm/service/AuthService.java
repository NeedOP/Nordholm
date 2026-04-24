package com.eli.nordholm.service;

import com.eli.nordholm.model.User;
import com.eli.nordholm.repository.UserRepository;
import com.eli.nordholm.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    public String register(String email, String password) {


        if (email == null || email.isBlank()) {
            throw new RuntimeException("Email is required");
        }


        if (!email.contains("@")) {
            throw new RuntimeException("Invalid email format");
        }


        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("User already exists");
        }


        if (password == null || password.length() < 8) {
            throw new RuntimeException("Password must be at least 8 characters");
        }

        User user = new User();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole("USER");

        userRepository.save(user);

        return "User registered successfully";
    }


    public String login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return JwtUtil.generateToken(user.getEmail(), user.getRole());

    }
}
