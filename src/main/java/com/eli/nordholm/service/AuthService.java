package com.eli.nordholm.service;


import com.eli.nordholm.model.PasswordResetToken;
import com.eli.nordholm.model.User;
import com.eli.nordholm.model.VerificationToken;
import com.eli.nordholm.repository.PasswordResetTokenRepository;
import com.eli.nordholm.repository.UserRepository;
import com.eli.nordholm.repository.VerificationTokenRepository;
import com.eli.nordholm.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final PasswordResetTokenRepository tokenRepository;
    private final VerificationTokenRepository verificationTokenRepository;

    public void verifyEmail(String token) {

        VerificationToken vt = verificationTokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid token"));

        if (vt.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Token expired");
        }

        User user = userRepository.findByEmail(vt.getEmail())
                .orElseThrow();

        user.setVerified(true);
        userRepository.save(user);
    }


    public void resetPassword(String token, String newPassword) {

        PasswordResetToken resetToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid token"));

        if (resetToken.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Token expired");
        }

        User user = userRepository.findByEmail(resetToken.getEmail())
                .orElseThrow();

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    public void requestPasswordReset(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = java.util.UUID.randomUUID().toString();

        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setToken(token);
        resetToken.setEmail(email);
        resetToken.setExpiresAt(LocalDateTime.now().plusMinutes(30));

        tokenRepository.save(resetToken);

        String link = "https://el-kraft.vercel.app/reset-password?token=" + token;

        emailService.sendEmail(
                email,
                "Reset your password",
                "<p>Click below to reset:</p><a href='" + link + "'>Reset Password</a>"
        );
    }



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
        user.setVerified(false);

        userRepository.save(user);

        String token = java.util.UUID.randomUUID().toString();

        VerificationToken vt = new VerificationToken();
        vt.setToken(token);
        vt.setEmail(email);
        vt.setExpiresAt(LocalDateTime.now().plusHours(24));

        verificationTokenRepository.save(vt);

        // SEND EMAIL
        String link = "https://el-kraft.vercel.app/verify?token=" + token;

        emailService.sendEmail(
                email,
                "Verify your email",
                "<h3>Click to verify:</h3><a href='" + link + "'>Verify Account</a>"
        );

        return "User registered. Please verify your email.";
    }


    public String login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));


        if (!user.isVerified()) {
            throw new RuntimeException("Please verify your email first");
        }

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return JwtUtil.generateToken(user.getEmail(), user.getRole());

    }
}
