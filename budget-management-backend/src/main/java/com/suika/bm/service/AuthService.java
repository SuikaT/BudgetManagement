package com.suika.bm.service;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.suika.bm.model.network.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;

@Service
public class AuthService {

    @Value("${jwt.issuer}")
    private String issuer;

    @Value("${jwt.access.exp.seconds}")
    private int accessExpiration;

    @Value("${jwt.refresh.exp.days}")
    private int refreshExpiration;

    @Value("${jwt.secret}")
    private String secret;

    SecretKey secretKey;

    @PostConstruct
    public void init() {
        secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    public boolean isValidToken(String token) {
        return true;
    }

    public User getUser(String token) {
        return null;
    }

    public Long getUserId(String token) {
        User user = getUser(token);

        if (user != null) {
            return user.getId();
        }

        return null;
    }

    public String generateAccessToken(User user) {
        Instant now = Instant.now();
        Instant exp = now.plus(accessExpiration, ChronoUnit.SECONDS);

        String token = Jwts.builder()
                .issuer(issuer)
                .subject(user.getId().toString())
                .issuedAt(Date.from(now))
                .expiration(Date.from(exp))
                .signWith(secretKey)
                .compact();

        return token;
    }

    public String generateRefreshToken(User user) {
        Instant now = Instant.now();
        Instant exp = now.plus(refreshExpiration, ChronoUnit.DAYS);

        return generateToken(user, Date.from(now), Date.from(exp));
    }

    private String generateToken(User user, Date issuedAt, Date expiration) {
        String token = Jwts.builder()
                .issuer(issuer)
                .subject(user.getId().toString())
                .issuedAt(issuedAt)
                .expiration(expiration)
                .signWith(secretKey)
                .compact();

        return token;
    }

    public Claims validate(String token) {
        try {
            return Jwts.parser()
                    .verifyWith(secretKey)
                    .requireIssuer(issuer)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();

        } catch (JwtException e) {
            throw new SecurityException("Invalid JWT", e);
        }
    }
}
