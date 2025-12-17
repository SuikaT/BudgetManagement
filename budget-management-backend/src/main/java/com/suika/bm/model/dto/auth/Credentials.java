package com.suika.bm.model.dto.auth;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class LoginRequest {
    private String email;
    private String password;
}
