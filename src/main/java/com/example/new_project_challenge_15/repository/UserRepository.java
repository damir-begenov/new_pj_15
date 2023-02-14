package com.example.new_project_challenge_15.repository;

import com.example.new_project_challenge_15.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User> findByUsername(String username);

  Boolean existsByUsername(String username);

  Boolean existsByEmail(String email);

  @Query(value = "select * FROM public.users where username like ?1 limit 1", nativeQuery = true)
  User findByUsernameTwo(String username);

  @Query(value = "update user_roles set role_id = ?1 where user_id = ?2", nativeQuery = true)
  User updateRole(Integer role, Integer user);

  @Query(value = "select role_id from user_roles where user_id = ?1", nativeQuery = true)
  Integer getRoleById(Integer id);
}
