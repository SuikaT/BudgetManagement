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

    public User(UserEntity entity) {
        if(entity == null) return;

        this.id = entity.getId();
        this.lastname = entity.getLastname();
        this.firstname = entity.getFirstname();
        this.email = entity.getEmail();
    }
}
