package com.example.new_project_challenge_15.repository;

import com.example.new_project_challenge_15.entity.log;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface logRepo extends JpaRepository<log,Long> {
}
