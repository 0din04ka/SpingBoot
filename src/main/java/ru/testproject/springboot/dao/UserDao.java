package ru.testproject.springboot.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.testproject.springboot.models.User;

public interface UserDao extends JpaRepository<User,Long> {

    User findByUsername(String username);
}
