package com.example.new_project_challenge_15.controller;


import com.example.new_project_challenge_15.entity.Movie;
import com.example.new_project_challenge_15.entity.Person;
import com.example.new_project_challenge_15.entity.doubleReturn;
import com.example.new_project_challenge_15.entity.rels.ACTED_IN;
import com.example.new_project_challenge_15.repository.movieRepo;
// import com.example.new_project_challenge_15.entity.objectModel;
import com.example.new_project_challenge_15.repository.objectRepo;


import com.example.new_project_challenge_15.service.PersonService;
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
    private final movieRepo mRepo;
    PersonService personService;
    @GetMapping("/persons")
    public doubleReturn getAllObjects() {
        return personService.getAllObjects();
    }
    @GetMapping("/movies")
    public List<Movie> getAllMovies() {
        List<Movie> list = mRepo.findAll();
        System.out.println(list.get(0));
        return list;
    }
    

}
