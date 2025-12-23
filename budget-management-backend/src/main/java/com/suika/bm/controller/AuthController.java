package com.suika.bm.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.suika.bm.model.dto.auth.Credentials;
import com.suika.bm.model.dto.auth.LoginResponse;
import com.suika.bm.service.AuthenticationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private static final Logger LOGGER = LoggerFactory.getLogger(AuthController.class);

    private final AuthenticationService authService;

    @PostMapping("/authenticate")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody Credentials credentials) {
        try {
            if (credentials == null) {
                throw new IllegalArgumentException("credentials is null");
            }

            LoginResponse loginResponse = authService.authenticate(credentials);

            return ResponseEntity.ok(loginResponse);
        } catch (Exception e) {
            LOGGER.info("Authentication could not be done: {}", e.getMessage());

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
