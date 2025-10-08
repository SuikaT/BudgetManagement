package com.suika.bm.database.repository;

import com.suika.bm.database.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {


    Optional<UserEntity> findByEmail(String email);

    List<UserEntity> findByLastConnectionAfter(LocalDateTime cutoffDate);

}
