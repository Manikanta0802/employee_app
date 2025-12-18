package com.example.employeeavailability.config;

import com.example.employeeavailability.model.Employee;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    // 256-bit key (base64)
    private static final String SECRET_KEY =
            "uL0ZUZC5uEnT56Y2vNQxJ2Z7Kk8z6qfLwE5gZqB7tV6mX9aR3X2qP0sN4rT8uV1b";

    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                   .setSigningKey(getSigningKey())
                   .build()
                   .parseClaimsJws(token)
                   .getBody();
    }

    public <T> T extractClaim(String token, Function<Claims, T> resolver) {
        final Claims claims = extractAllClaims(token);
        return resolver.apply(claims);
    }

    public String extractEmail(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // ✅ NEW
    public String extractRole(String token) {
        return extractAllClaims(token).get("role", String.class);
    }

    // ✅ NEW
    public Long extractUserId(String token) {
        return extractAllClaims(token).get("userId", Long.class);
    }

    public String generateToken(Employee employee) {
        Map<String, Object> claims = new HashMap<>();

        // existing claims
        claims.put("name", employee.getName());
        claims.put("availabilityStatus", employee.getAvailabilityStatus().name());

        // ✅ NEW claims
        claims.put("role", employee.getRole().name());
        claims.put("userId", employee.getId());

        return generateToken(claims, employee.getEmail());
    }

    private String generateToken(Map<String, Object> claims, String subject) {
        long now = System.currentTimeMillis();
        long expirationMs = 1000 * 60 * 60 * 24; // 24 hours

        return Jwts.builder()
                   .setClaims(claims)
                   .setSubject(subject)
                   .setIssuedAt(new Date(now))
                   .setExpiration(new Date(now + expirationMs))
                   .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                   .compact();
    }

    public boolean isTokenValid(String token, String email) {
        final String username = extractEmail(token);
        return username.equals(email) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        Date expiration = extractClaim(token, Claims::getExpiration);
        return expiration.before(new Date());
    }
}
