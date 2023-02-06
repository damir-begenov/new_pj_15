package com.example.new_project_challenge_15.controller;


import com.example.new_project_challenge_15.entity.doubleReturn;
import com.example.new_project_challenge_15.service.PersonService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
public class moviesController {
    PersonService personService;
    
    @GetMapping("/shortestpaths")
    public doubleReturn getShortestPaths(@RequestParam String person, @RequestParam String person2, @RequestParam List<String> relations) {
        return personService.getShortestPaths(person, person2, relations);
    }

    @GetMapping("/filter")
    public doubleReturn retrivePerson(@RequestParam Long id, @RequestParam List<String> relations, @RequestParam int depth, @RequestParam int limit) {
        return personService.getByRelation(id, relations, depth, limit);
    }
    @GetMapping("/movie")
    public doubleReturn retrieveMovie(@RequestParam String title, @RequestParam List<String> relations) {
        return personService.getByMovie(title, relations);
    }
    @GetMapping("/movieperson")
    public doubleReturn moviePersonRelation(@RequestParam String person, @RequestParam String movie, @RequestParam List<String> relations ) {
        return personService.getMoviePersonRelation(person, movie, relations);
    }

}
