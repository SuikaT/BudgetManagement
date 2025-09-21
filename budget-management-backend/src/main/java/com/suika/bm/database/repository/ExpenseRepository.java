package com.suika.bm.database.repository;

import com.suika.bm.database.entity.ExpenseEntity;
import com.suika.bm.database.entity.UserEntity;
import com.suika.bm.model.enums.ExpenseCategory;
import com.suika.bm.model.network.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<ExpenseEntity, Long> {

    List<ExpenseEntity> findAllByUser(UserEntity userEntity);

    List<ExpenseEntity> findAllByCategory(ExpenseCategory category);
}
