package com.example.new_project_challenge_15.newRepo;

import com.example.new_project_challenge_15.models.photoDb;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface newPhotoRepo extends JpaRepository<photoDb, Long> {
    photoDb findByIin(String iin);
}
