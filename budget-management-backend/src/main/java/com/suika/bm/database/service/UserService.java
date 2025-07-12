package com.suika.bm.database.service;

import com.suika.bm.database.entity.UserEntity;
import com.suika.bm.database.repository.UserRepository;
import com.suika.bm.model.network.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id)
                .map(User::new);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .map(User::new);
    }
}
