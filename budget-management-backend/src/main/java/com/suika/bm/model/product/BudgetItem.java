package com.suika.bm.model.product;

import com.suika.bm.model.enums.ExpenseCategory;
import com.suika.bm.model.enums.ExpenseSchedule;
import com.suika.bm.model.enums.PaymentMethod;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class BudgetItem {

    Long id;

    ExpenseCategory category;

    String label;

    float targetAmount;

    ExpenseSchedule schedule;

    boolean autoAddToExpenses;

    PaymentMethod paymentMethod;

    LocalDate date;

    Integer spent;
}
