package com.example.project.dao;

import com.example.project.entity.User;

import org.hibernate.mapping.List;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmail(String email);

    User findByUserName(String userName);

    // java.util.List<User> findByUserNameContaining(String username);

}
