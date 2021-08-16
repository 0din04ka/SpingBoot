package ru.testproject.springboot.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class PeopleController {

    // Отоброжение станицы юзера
    @GetMapping("/user")
    public String show(){
        return "user";
    }
}
