package com.example.project.dao;

import com.example.project.entity.Session;
import com.example.project.entity.SessionExercise;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SessionExerciseRepositiory extends JpaRepository<SessionExercise, Integer> {
    @Query("SELECT se FROM SessionExercise se WHERE se.session = :session")
    List<SessionExercise> findBySession(@Param("session") Session session);
}
