package com.example.new_project_challenge_15.service;

import com.example.new_project_challenge_15.models.photoDb;
import com.example.new_project_challenge_15.newRepo.newPhotoRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class newPhotoService {
    @Autowired
    newPhotoRepo newPhotoRepo;

    public photoDb getPhotoByIIN(String iin){
        return newPhotoRepo.findByIin(iin);
    }
}
