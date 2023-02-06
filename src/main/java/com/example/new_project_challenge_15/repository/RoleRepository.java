package com.example.new_project_challenge_15.repository;

import com.example.new_project_challenge_15.models.ERole;
import com.example.new_project_challenge_15.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
  Optional<Role> findByName(ERole name);
}
