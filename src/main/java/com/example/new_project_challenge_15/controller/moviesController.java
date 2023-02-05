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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/finpol/main")
@AllArgsConstructor
public class moviesController {
    private final movieRepo mRepo;
    private final objectRepo oRepo;
    PersonService personService;

    @GetMapping(value = {"/persons/{ID}/{DEPTH}/{LIMIT}","/persons/{ID}/{DEPTH}/{LIMIT}"})
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public doubleReturn getByIdLevelAndLimit(@PathVariable Long ID, @PathVariable int DEPTH, @PathVariable int LIMIT) {
        return personService.getByIdLevelAndLimit(ID, DEPTH, LIMIT);
    }

    @GetMapping("/shortestpaths/{ID}/{SECONDID}")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public doubleReturn getShortestPaths(@PathVariable Long ID, @PathVariable Long SECONDID) {
        return personService.getShortestPaths(ID, SECONDID);
    }

    @GetMapping("/filter")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public List<Person> getFoos(@RequestParam Long id, @RequestParam List<String> list, @RequestParam int limit) {
        String[] rels = {"", "", "", "", "", ""};
        int i = 0;
        for (String rel: list) {
            rels[i] = rel;
            i++;
        }
        return oRepo.getByRelation(id, rels[0], rels[1], rels[2], rels[3], rels[4], rels[5],limit);
    }
}
