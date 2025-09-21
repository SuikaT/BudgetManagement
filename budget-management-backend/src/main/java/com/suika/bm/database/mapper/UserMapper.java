package com.suika.bm.database.mapper;

import com.suika.bm.database.entity.UserEntity;
import com.suika.bm.model.network.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    public UserEntity toEntity(User user) {
        if (user == null) return null;

        UserEntity entity = new UserEntity();
        entity.setId(user.getId());
        entity.setEmail(user.getEmail());
        entity.setFirstname(user.getFirstname());
        entity.setLastname(user.getLastname());
        return entity;
    }

    public User toDto(UserEntity entity) {
        if (entity == null) return null;

        User dto = new User();
        dto.setId(entity.getId());
        dto.setEmail(entity.getEmail());
        dto.setFirstname(entity.getFirstname());
        dto.setLastname(entity.getLastname());
        return dto;
    }
}
