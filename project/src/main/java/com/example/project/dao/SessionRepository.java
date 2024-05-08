package com.example.project.dao;

import com.example.project.entity.Session;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SessionRepository extends JpaRepository<Session,Integer> {
}
