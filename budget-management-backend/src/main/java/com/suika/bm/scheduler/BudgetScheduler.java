package com.suika.bm.scheduler;

import com.suika.bm.database.service.BudgetService;
import com.suika.bm.database.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
@RequiredArgsConstructor
public class BudgetScheduler {

    private final BudgetService budgetService;

    @Scheduled(cron = "0 * * * * *")
    public void applyAutoAdd() {
        budgetService.applyAutoAdd(LocalDate.now());
    }
}
