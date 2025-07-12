package com.suika.bm.database.service;

import com.suika.bm.database.entity.UserEntity;
import com.suika.bm.database.repository.ExpenseRepository;
import com.suika.bm.database.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;
}
