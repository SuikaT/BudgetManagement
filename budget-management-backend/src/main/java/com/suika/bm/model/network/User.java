package com.suika.bm.model.network;

import com.suika.bm.database.entity.UserEntity;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class User {
    private Long id;

    private String lastname;

    private String firstname;

    private String email;

    public User() {}

    public User(String email) {
        this.email = email;
    }

    public User(Long id) {
        this.id = id;
    }
}
