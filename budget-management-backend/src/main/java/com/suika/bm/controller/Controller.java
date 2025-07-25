package com.suika.bm.controller;


import com.suika.bm.database.entity.UserEntity;
import com.suika.bm.database.service.UserService;
import com.suika.bm.model.network.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping
public class Controller {

    private Logger logger = LoggerFactory.getLogger(Controller.class);

    @Autowired
    private UserService userService;

    @GetMapping("test")
    public UserEntity test() {
        UserEntity user = new UserEntity();

        user.setId(2L);
        user.setEmail("test");
        user.setFirstname("test");
        user.setLastname("test");

        return user;
    }

    @GetMapping("userById")
    public ResponseEntity<User> getUserById(@RequestParam Long id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("userByEmail")
    public ResponseEntity<User> getUserByEmail(@RequestParam String email) {
        return userService.getUserByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
