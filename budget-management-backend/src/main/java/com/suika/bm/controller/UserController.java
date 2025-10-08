package com.suika.bm.controller;


import com.suika.bm.database.service.ExpenseService;
import com.suika.bm.database.service.UserService;
import com.suika.bm.exception.ResourceNotFoundException;
import com.suika.bm.exception.UserNotFoundException;
import com.suika.bm.model.network.User;
import com.suika.bm.model.product.Expense;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        try {
            User user = userService.getUserById(id);

            return ResponseEntity.ok(user);
        } catch (UserNotFoundException e) {
            return ResponseEntity.notFound().build();  // 404
        } catch(Exception e) {
            return ResponseEntity.internalServerError().build(); // 500
        }
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        try {
            User user = userService.getUserByEmail(email);

            return ResponseEntity.ok(user);
        } catch (UserNotFoundException e) {
            return ResponseEntity.notFound().build();  // 404
        } catch(Exception e) {
            return ResponseEntity.internalServerError().build(); // 500
        }
    }
}
