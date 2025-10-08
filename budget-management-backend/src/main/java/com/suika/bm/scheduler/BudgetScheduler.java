package com.suika.bm.scheduler;

import com.suika.bm.database.service.BudgetService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;

@RequiredArgsConstructor
public class ExpenseScheduler {

    private final BudgetService budgetService;

    @Scheduled(cron = "0 0 0 * * *")
    public void applyAutoAdd() {
        budgetService.applyAutoAdd();
    }
}
