

package com.wipro.appverse.util;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

    // private final Key key;

    // // ✅ Stable key injected from application.properties
    // public JwtUtil(@Value("${jwt.secret}") String secret) {
    //     this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    // }

    
private final Key key;
    private final long expirationMs;

    public JwtUtil(
        @Value("${jwt.secret}") String secret,
        @Value("${jwt.expiration.ms}") long expirationMs
    ) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.expirationMs = expirationMs;
    }
    
 public String generateToken(Long userId, String email, String role) {
        return Jwts.builder()
                .setSubject(email)
                .claim("uid", userId)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationMs))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }



    // // ✅ Generate JWT token
    // public String generateToken(Long userId,String email, String role) {
    //     return Jwts.builder()
    //             .setSubject(email)
    //             .claim("uid", userId)
    //             .claim("role", role)
    //             .setIssuedAt(new Date())
    //             .setExpiration(
    //                     new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)
    //             ) // 10 hours
    //             .signWith(key, SignatureAlgorithm.HS256)
    //             .compact();
    // }

    // ✅ Extract all claims
    public Claims extractClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // ✅ Extract email
    public String extractEmail(String token) {
        return extractClaims(token).getSubject();
    }

    // ✅ Extract role
    public String extractRole(String token) {
        return extractClaims(token).get("role", String.class);
    }

    // ✅ Validate token expiry
    public boolean isTokenExpired(String token) {
        return extractClaims(token)
                .getExpiration()
                .before(new Date());
    }
}