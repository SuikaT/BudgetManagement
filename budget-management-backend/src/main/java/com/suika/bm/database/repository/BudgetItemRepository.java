package com.suika.bm.database.repository;

import com.suika.bm.database.entity.BudgetItemEntity;
import com.suika.bm.database.entity.UserEntity;
import com.suika.bm.model.product.ExpenseDateRange;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BudgetItemRepository extends JpaRepository<BudgetItemEntity, Long> {

    List<BudgetItemEntity> findAllByUser(UserEntity userEntity);

}
