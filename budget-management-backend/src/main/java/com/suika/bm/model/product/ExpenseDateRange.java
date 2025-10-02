package com.suika.bm.model.product;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

import java.time.LocalDate;

public record ExpenseDateRange(LocalDate start, LocalDate end) { }

