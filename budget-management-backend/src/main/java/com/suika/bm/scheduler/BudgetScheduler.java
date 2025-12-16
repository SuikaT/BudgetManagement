package com.suika.bm.scheduler;

import java.time.LocalDate;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.suika.bm.database.service.BudgetService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class BudgetScheduler {

    private final BudgetService budgetService;

    @Scheduled(cron = "0 * * * * *")
    public void applyAutoAdd() {
        budgetService.applyAutoAdd(LocalDate.now());
    }
}
