package com.suika.bm.controller;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping
public class Controller {

    private Logger logger = LoggerFactory.getLogger(Controller.class);

    @GetMapping("test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("TEST");
    }
}
