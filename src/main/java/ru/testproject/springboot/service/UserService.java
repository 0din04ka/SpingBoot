package ru.testproject.springboot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import ru.testproject.springboot.dao.RoleDao;
import ru.testproject.springboot.dao.UserDao;
import ru.testproject.springboot.models.Role;
import ru.testproject.springboot.models.User;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    User lastAddedUser = new User();

    @Autowired
    UserDao userDao;

    @Autowired
    RoleDao roleDao;

    @Autowired
    BCryptPasswordEncoder passwordEncoder;


    // Метод Spring для авторизации
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userDao.findByUsername(username);

        if (user == null){
            throw new UsernameNotFoundException("User not found");
        }
        return user;
    }

    // Получение списка юзеров
    public List<User> allUsers(){
        return userDao.findAll();
    }

    // Поиск юзера по id
    public User findUserById(Long userId){
        Optional<User> userFromDb = userDao.findById(userId);
        return userFromDb.orElse(new User());
    }

    // Поиск юзера по username
    public User findUserByUsername(String username){
        return userDao.findByUsername(username);
    }

    // Добавление юзера
    public boolean saveUser(User user){
        User userFromDb = userDao.findByUsername(user.getUsername());
        if (userFromDb != null){
            return false;
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userDao.save(user);
        lastAddedUser = user;
        return true;
    }

    // Последний добавленный юзер
    public User addedUser(){
        return findUserById(lastAddedUser.getId());
    }

    // Обновление юзера
    public boolean updateUser(User user){
        User userFromDb = findUserById(user.getId());
        if (!findUserById(user.getId()).getPassword().equals(user.getPassword())){
            userFromDb.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        userFromDb.setUsername(user.getUsername());
        userFromDb.setAge(user.getAge());
        userFromDb.setName(user.getName());
        userFromDb.setLastname(user.getLastname());
        userFromDb.setRoles(user.getRoles());
        userDao.save(userFromDb);
        return true;
    }

    // Удаление юзера
    public boolean deleteUser(Long userId){
        if (userDao.findById(userId).isPresent()){
            userDao.deleteById(userId);
            return true;
        }
        return false;
    }

    // Получние списка ролей
    public List<Role> allRoles(){
        return roleDao.findAll();
    }
}
