package com.example.new_project_challenge_15.controller;


import com.example.new_project_challenge_15.entity.Movie;
import com.example.new_project_challenge_15.entity.Person;
import com.example.new_project_challenge_15.entity.doubleReturn;
import com.example.new_project_challenge_15.entity.rels.*;
import com.example.new_project_challenge_15.repository.ACTED_INRepo;
import com.example.new_project_challenge_15.repository.movieRepo;
import com.example.new_project_challenge_15.repository.objectRepo;
import com.example.new_project_challenge_15.repository.relationRepo;
import com.example.new_project_challenge_15.service.PersonService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
public class moviesController {
    private final movieRepo mRepo;
    private final objectRepo oRepo;
    PersonService personService;
    

    @GetMapping("/persons/{ID}/{DEPTH}/{LIMIT}")
    public doubleReturn getByIdLevelAndLimit(@PathVariable Long ID, @PathVariable int DEPTH, @PathVariable int LIMIT) {
        return personService.getByIdLevelAndLimit(ID, DEPTH, LIMIT);
    }

    @GetMapping("/shortestpaths/{ID}/{SECONDID}")
    public doubleReturn getShortestPaths(@PathVariable Long ID, @PathVariable Long SECONDID) {
        return personService.getShortestPaths(ID, SECONDID);
    }

    @GetMapping("/filter/{ID}")
    public List<Person> getByFilter(@PathVariable Long ID){
        return oRepo.getByRelation(ID, "REVIEWED", "", "", "", "", "", 10);
    }
}
