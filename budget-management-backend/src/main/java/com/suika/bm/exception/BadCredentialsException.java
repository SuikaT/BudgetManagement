package com.suika.bm.exception;

import com.suika.bm.model.dto.auth.Credentials;

public class BadCredentialsException extends UserNotFoundException {
    public BadCredentialsException(String email) {
        super("Credentials does not match with email: " + email);
    }
}
