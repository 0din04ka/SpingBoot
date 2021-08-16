package ru.testproject.springboot.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import ru.testproject.springboot.models.Role;
import ru.testproject.springboot.models.User;
import ru.testproject.springboot.service.UserService;
import java.util.List;

@org.springframework.web.bind.annotation.RestController
@RequestMapping("/rest")
public class RestController {

    private UserService userService;

    public RestController(UserService userService) {
        this.userService = userService;
    }

    // Получение списка юзеров
    @GetMapping("/")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.allUsers());
    }

    // Поиск юзера по id
    @GetMapping("/findOne/{id}")
    public ResponseEntity<User> findOne(@PathVariable Long id){
        final User user = userService.findUserById(id);
        return user != null
                ? new ResponseEntity<>(user, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Добавление юзера
    @PostMapping(value = "/add")
    public ResponseEntity<?> create(@RequestBody User user) {
        return ResponseEntity.ok(userService.saveUser(user));
    }

    // Получение последнего добавленного юзера
    @GetMapping("/addedUser")
    public ResponseEntity<User> addedUser() {
        return (userService.addedUser() != null) ?
                new ResponseEntity<>(userService.addedUser(), HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Удаление юзера
    @DeleteMapping("/delete")
    public ResponseEntity<?> delete(@RequestBody User user) {
        return ResponseEntity.ok(userService.deleteUser(user.getId()));
    }

    // Обновление юзера
    @PutMapping("/update")
    public ResponseEntity<?> edit(@RequestBody User user) {
        return ResponseEntity.ok(userService.updateUser(user));
    }

    // Получение юзера по авторизации
    @GetMapping("/user")
    public ResponseEntity<User> userPage(@AuthenticationPrincipal User currentUser){
        return ResponseEntity.ok(currentUser);
    }

    // Получение списка ролей
    @GetMapping("/roles")
    public ResponseEntity<List<Role>> getRoles(){
        return ResponseEntity.ok(userService.allRoles());
    }
}
