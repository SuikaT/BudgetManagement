package com.suika.bm.service;

import com.suika.bm.database.service.UserService;
import com.suika.bm.model.dto.auth.Credentials;
import com.suika.bm.model.dto.auth.LoginResponse;
import com.suika.bm.model.network.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserService userService;

    private final JwtService jwtService;

    public LoginResponse authenticate(Credentials credentials) {
        // Validation + génération JWT
        User user = userService.getUserByCredentials(credentials);

        String token = jwtService.generateAccessToken(user);

        return new LoginResponse(token, user);
    }
}
