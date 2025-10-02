package com.suika.bm.model.product;

import com.suika.bm.model.enums.ExpenseCategory;
import com.suika.bm.model.enums.ExpenseSchedule;
import com.suika.bm.model.enums.PaymentMethod;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class Expense {

    Long id;

    String label;

    float amount;

    LocalDate date;

    ExpenseCategory category;

    PaymentMethod paymentMethod;

    ExpenseSchedule schedule;

    boolean variable;

    boolean hide;
}
