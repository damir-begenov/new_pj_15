package com.example.new_project_challenge_15.controller;


import com.example.new_project_challenge_15.entity.doubleReturn;
import com.example.new_project_challenge_15.service.PersonService;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/finpol/main")
@AllArgsConstructor
public class moviesController {
    PersonService personService;

    @GetMapping("/person")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public doubleReturn getByIdLevelAndLimit(@RequestParam String person, @RequestParam List<String> relations, @RequestParam int depth, @RequestParam int limit) {
        return personService.getPersonTree(person, relations, depth, limit);
    }
    @GetMapping("/shortestpaths")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public doubleReturn getShortestPaths(@RequestParam String person, @RequestParam String person2, @RequestParam List<String> relations) {
        return personService.getShortestPaths(person, person2, relations);
    }
    @GetMapping("/movie")
    public doubleReturn retrieveMovie(@RequestParam String title, @RequestParam List<String> relations) {
        return personService.getByMovie(title, relations);
    }
    @GetMapping("/movieperson")
    public doubleReturn moviePersonRelation(@RequestParam String person, @RequestParam String movie, @RequestParam List<String> relations ) {
        return personService.getMoviePersonRelation(person, movie, relations);
    }
    @GetMapping("/shortopen")
    public doubleReturn shortOpen(@RequestParam String name) {
        return personService.shortOpen(name);
    }

}
