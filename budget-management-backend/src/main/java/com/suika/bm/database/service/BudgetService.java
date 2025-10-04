package com.suika.bm.database.service;

import com.suika.bm.database.entity.BudgetItemEntity;
import com.suika.bm.database.entity.UserEntity;
import com.suika.bm.database.mapper.BudgetItemMapper;
import com.suika.bm.database.repository.BudgetItemRepository;
import com.suika.bm.database.repository.UserRepository;
import com.suika.bm.exception.BudgetItemNotFoundException;
import com.suika.bm.exception.UserNotFoundException;
import com.suika.bm.model.product.BudgetItem;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BudgetService {

    private final BudgetItemRepository budgetItemRepository;
    private final UserRepository userRepository;
    private final BudgetItemMapper budgetItemMapper;

    @Transactional
    public List<BudgetItem> getBudgetItemsByUserId(Long userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));

        return budgetItemRepository.findAllByUser(user)
                .stream()
                .map(budgetItemMapper::toDto)
                .toList();
    }

    @Transactional
    public BudgetItem addBudgetItem(BudgetItem budgetItem, Long userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));

        BudgetItemEntity BudgetItemEntity = budgetItemMapper.toEntity(budgetItem);
        BudgetItemEntity.setUser(user);

        BudgetItemEntity savedBudgetItemEntity = budgetItemRepository.save(BudgetItemEntity);

        return budgetItemMapper.toDto(savedBudgetItemEntity);
    }

    @Transactional
    public void deleteBudgetItemByIds(List<Long> budgetItemIds) {
        if(budgetItemIds == null) {
            throw new IllegalArgumentException();
        }

        budgetItemRepository.deleteAllById(budgetItemIds);
    }

    @Transactional
    public BudgetItem updateBudgetItem(BudgetItem budgetItem) {
        if(budgetItem == null ) {
            throw new BudgetItemNotFoundException(null);
        }

        BudgetItemEntity entityToUpdate = budgetItemRepository.findById(budgetItem.getId())
                .orElseThrow(() -> new BudgetItemNotFoundException(budgetItem.getId()));

        budgetItemMapper.updateEntityFromDto(entityToUpdate, budgetItem);

        BudgetItemEntity updatedEntity = budgetItemRepository.save(entityToUpdate);

        return budgetItemMapper.toDto(updatedEntity);
    }
}
