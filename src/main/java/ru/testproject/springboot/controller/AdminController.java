package ru.testproject.springboot.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/admin")
public class AdminController {

    // Отображение страницы админа
    @GetMapping(value = "/")
    public String index(){
        return "admin";
    }
}
