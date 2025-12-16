package com.suika.bm.service;

import org.springframework.stereotype.Service;

import com.suika.bm.model.network.User;

@Service
public class AuthService {

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

}
