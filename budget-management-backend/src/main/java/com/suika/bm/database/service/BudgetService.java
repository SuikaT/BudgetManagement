package com.suika.bm.database.service;

import com.suika.bm.database.entity.BudgetItemEntity;
import com.suika.bm.database.entity.UserEntity;
import com.suika.bm.database.mapper.BudgetItemMapper;
import com.suika.bm.database.repository.BudgetItemRepository;
import com.suika.bm.database.repository.UserRepository;
import com.suika.bm.exception.UserNotFoundException;
import com.suika.bm.model.enums.ExpenseSchedule;
import com.suika.bm.model.product.BudgetItem;
import com.suika.bm.model.product.Expense;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BudgetService {

    private final BudgetItemRepository budgetItemRepository;

    private final UserRepository userRepository;

    private final BudgetItemMapper budgetItemMapper;

    private final ExpenseService expenseService;

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

        BudgetItemEntity budgetItemEntity = budgetItemMapper.toEntity(budgetItem);
        budgetItemEntity.setUser(user);

        BudgetItemEntity savedBudgetItemEntity = budgetItemRepository.save(budgetItemEntity);

        if(checkAutoAdd(savedBudgetItemEntity)) {
            while(!savedBudgetItemEntity.getDate().isAfter(LocalDate.now())) {
                autoAddToExpense(budgetItemEntity);
            }
        }


        return budgetItemMapper.toDto(savedBudgetItemEntity);
    }

    private static boolean checkAutoAdd(BudgetItemEntity budgetItemEntity) {
        LocalDate date = budgetItemEntity.getDate();
        ExpenseSchedule schedule = budgetItemEntity.getSchedule();

        return budgetItemEntity.isAutoAddToExpenses()
                && schedule != null
                && !schedule.equals(ExpenseSchedule.UNDEFINED)
                && date != null
                && (date.isBefore(LocalDate.now()) || date.isEqual(LocalDate.now()));
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
        return null;
    }

    public void applyAutoAdd(LocalDate dateToApply) {

        List<BudgetItemEntity> budgetItemEntities = budgetItemRepository.findAllByDate(dateToApply);

        for(BudgetItemEntity budgetItemEntity: budgetItemEntities) {
            autoAddToExpense(budgetItemEntity);
        }
    }

    private void autoAddToExpense(BudgetItemEntity budgetItemEntity) {
        Expense expense = buildExpenseFromBudgetItemEntity(budgetItemEntity);

        expenseService.addExpense(expense, budgetItemEntity.getUser(), budgetItemEntity);

        updateBudgetItemDate(budgetItemEntity);
    }

    private void updateBudgetItemDate(BudgetItemEntity budgetItemEntity) {
        LocalDate currentDate = budgetItemEntity.getDate();

        LocalDate nextDate = incrementDate(currentDate, budgetItemEntity.getSchedule());

        budgetItemEntity.setDate(nextDate);

        budgetItemRepository.save(budgetItemEntity);
    }

    private LocalDate incrementDate(LocalDate currentDate, ExpenseSchedule schedule) {
        if(currentDate == null) {
            return null;
        }

        return switch (schedule) {
            case DAILY -> currentDate.plusDays(1);
            case WEEKLY -> currentDate.plusDays(7);
            case SEMI_MONTHLY -> currentDate.plusDays(14);
            case MONTHLY -> currentDate.plusMonths(1);
            case BIMESTRIAL -> currentDate.plusMonths(2);
            case QUARTERLY -> currentDate.plusMonths(3);
            case BIANNUAL -> currentDate.plusMonths(6);
            case ANNUAL -> currentDate.plusMonths(12);
            default -> currentDate;
        };
    }

    private static Expense buildExpenseFromBudgetItemEntity(BudgetItemEntity budgetItemEntity) {
        Expense expense = new Expense();
        expense.setLabel(budgetItemEntity.getLabel());
        expense.setAmount(budgetItemEntity.getTargetAmount());
        expense.setDate(budgetItemEntity.getDate());
        expense.setCategory(budgetItemEntity.getCategory());
        expense.setPaymentMethod(budgetItemEntity.getPaymentMethod());
        expense.setAutoAdded(true);
        return expense;
    }
}
