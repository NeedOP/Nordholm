package com.eli.nordholm.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    // Set JWT_SECRET as an environment variable in production (Render / local .env).
    // Must be at least 32 characters for HS256.
    @Value("${JWT_SECRET}")
    private String secret;

    @Value("${JWT_EXPIRATION_MS:3600000}")
    private long expirationMs;

    private Key key;

    private Key key() {
        if (key == null) {
            key = Keys.hmacShaKeyFor(secret.getBytes());
        }
        return key;
    }

    public String generateToken(String email, String role) {
        return Jwts.builder()
                .setSubject(email)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationMs))
                .signWith(key())
                .compact();
    }

    public String extractEmail(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public String extractRole(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .get("role", String.class);
    }
}
