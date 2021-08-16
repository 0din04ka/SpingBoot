package ru.testproject.springboot.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.testproject.springboot.models.Role;

public interface RoleDao extends JpaRepository<Role,Long> {
}
