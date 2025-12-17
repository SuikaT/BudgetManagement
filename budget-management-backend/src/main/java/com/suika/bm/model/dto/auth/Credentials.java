package com.suika.bm.model.dto.auth;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class Credentials {
    private String email;
    private String password;
}
