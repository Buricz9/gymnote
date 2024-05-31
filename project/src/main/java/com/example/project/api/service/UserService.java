package com.example.project.api.service;

import com.example.project.dao.UserRepository;
import com.example.project.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User getUserByEmail(String email) {
        // userOptional = ;
        return userRepository.findByEmail(email).orElse(null); // Możesz zwrócić null lub rzucać wyjątek w zależności od
                                                               // logiki aplikacji
    }
}
