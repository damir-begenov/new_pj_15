package com.example.new_project_challenge_15.controller;


import com.example.new_project_challenge_15.entity.objectModel;
import com.example.new_project_challenge_15.repository.objectRepo;


import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
public class moviesController {
    private final objectRepo oRepo;

    @GetMapping("/movies")
    public List<com.example.new_project_challenge_15.repository.objectModel> getAllObjects() {
        List<com.example.new_project_challenge_15.repository.objectModel> list = oRepo.findAll();
        return list;
    }

}
