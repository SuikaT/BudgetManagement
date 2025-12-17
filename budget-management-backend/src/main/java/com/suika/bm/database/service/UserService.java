package com.suika.bm.database.service;

import com.suika.bm.database.entity.UserEntity;
import com.suika.bm.database.mapper.UserMapper;
import com.suika.bm.database.repository.UserRepository;
import com.suika.bm.exception.BadCredentialsException;
import com.suika.bm.exception.UserNotFoundException;
import com.suika.bm.model.dto.auth.Credentials;
import com.suika.bm.model.network.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Transactional
    public User getUserById(Long id) {
        UserEntity entity = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));

        return userMapper.toDto(entity);
    }

    @Transactional
    public User getUserByEmail(String email) {
        UserEntity entity = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException(email));

        return userMapper.toDto(entity);

    }

    @Transactional
    public List<UserEntity> getActiveUsers() {
        LocalDateTime sixMonthsAgo = LocalDateTime.now().minusMonths(6);

        return userRepository.findByLastConnectionAfter(sixMonthsAgo);
    }

    public User getUserByCredentials(Credentials credentials) {
        if(credentials == null) {
            throw new BadCredentialsException("null");
        }

        UserEntity entity = userRepository.findByEmailAndPassword(credentials.getEmail(), credentials.getPassword())
                .orElseThrow(() -> new BadCredentialsException(credentials.getEmail()));

        return userMapper.toDto(entity);
    }
}
