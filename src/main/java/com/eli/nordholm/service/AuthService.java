package com.eli.nordholm.service;

import com.eli.nordholm.model.PasswordResetToken;
import com.eli.nordholm.model.Role;
import com.eli.nordholm.model.User;
import com.eli.nordholm.model.VerificationToken;
import com.eli.nordholm.repository.PasswordResetTokenRepository;
import com.eli.nordholm.repository.UserRepository;
import com.eli.nordholm.repository.VerificationTokenRepository;
import com.eli.nordholm.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final PasswordResetTokenRepository tokenRepository;
    private final VerificationTokenRepository verificationTokenRepository;
    private final JwtUtil jwtUtil;

    @org.springframework.beans.factory.annotation.Value("${FRONTEND_URL:https://www.nordholmel.se}")
    private String frontendUrl;

    private String normalize(String email) {
        return email == null ? "" : email.trim().toLowerCase();
    }

    public void verifyEmail(String token) {

        VerificationToken vt = verificationTokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("This verification link is invalid."));

        if (vt.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("This verification link has expired. Please register again or request a new link.");
        }

        String email = normalize(vt.getEmail());

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("No account found for this verification link."));

        user.setVerified(true);
        userRepository.save(user);
    }

    public void resetPassword(String token, String newPassword) {

        if (newPassword == null || newPassword.length() < 8) {
            throw new RuntimeException("Password must be at least 8 characters.");
        }

        PasswordResetToken resetToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("This reset link is invalid."));

        if (resetToken.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("This reset link has expired. Please request a new one.");
        }

        String email = normalize(resetToken.getEmail());

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("No account found for this reset link."));

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    public void requestPasswordReset(String rawEmail) {
        String email = normalize(rawEmail);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("No account found with this email address."));

        String token = UUID.randomUUID().toString();

        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setToken(token);
        resetToken.setEmail(email);
        resetToken.setExpiresAt(LocalDateTime.now().plusMinutes(30));

        tokenRepository.save(resetToken);

        String link = frontendUrl + "/reset-password?token=" + token;

        emailService.sendEmail(
                email,
                "Reset your password",
                "<p>Click below to reset your password. This link expires in 30 minutes.</p>" +
                        "<a href='" + link + "'>Reset Password</a>"
        );
    }

    public String register(String rawEmail, String password) {

        String email = normalize(rawEmail);

        if (email.isBlank()) {
            throw new RuntimeException("Email is required.");
        }

        if (!email.matches("^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$")) {
            throw new RuntimeException("Please enter a valid email address.");
        }

        if (password == null || password.length() < 8) {
            throw new RuntimeException("Password must be at least 8 characters.");
        }

        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("An account with this email already exists.");
        }

        User user = new User();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(Role.USER);
        user.setVerified(false);

        userRepository.save(user);

        String token = UUID.randomUUID().toString();

        VerificationToken vt = new VerificationToken();
        vt.setToken(token);
        vt.setEmail(email);
        vt.setExpiresAt(LocalDateTime.now().plusHours(24));

        verificationTokenRepository.save(vt);

        String link = frontendUrl + "/verify?token=" + token;

        emailService.sendEmail(
                email,
                "Verify your email",
                "<h3>Welcome to Nordholm El & Bygg</h3>" +
                        "<p>Click below to verify your account. This link expires in 24 hours.</p>" +
                        "<a href='" + link + "'>Verify Account</a>"
        );

        return "Registration successful. Please check your email to verify your account.";
    }

    public String login(String rawEmail, String password) {
        String email = normalize(rawEmail);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("No account found with this email address."));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Incorrect password.");
        }

        if (!user.isVerified()) {
            throw new RuntimeException("Please verify your email before logging in.");
        }

        return jwtUtil.generateToken(user.getEmail(), user.getRole().name());
    }
}
