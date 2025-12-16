package com.suika.bm.database.repository;

import com.suika.bm.database.entity.ExpenseEntity;
import com.suika.bm.database.entity.UserEntity;
import com.suika.bm.model.product.ExpenseDateRange;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<ExpenseEntity, Long> {

    List<ExpenseEntity> findAllByUserAndDateBetween(UserEntity userEntity, LocalDate startDate, LocalDate endDate);

    @Query("SELECT MIN(e.date) as minDate, MAX(e.date) as maxDate " +
            "FROM ExpenseEntity e WHERE e.user.id = :userId")
    ExpenseDateRange findDateRangeByUserId(@Param("userId") Long userId);

}
