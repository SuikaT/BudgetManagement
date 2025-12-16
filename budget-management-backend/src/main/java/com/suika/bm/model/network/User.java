package com.suika.bm.model.network;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class User {
    private Long id;

    private String lastname;

    private String firstname;

    private String email;

    private LocalDateTime lastConnection;
}
