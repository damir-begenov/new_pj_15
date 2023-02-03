package com.example.new_project_challenge_15.controller;


import com.example.new_project_challenge_15.entity.Movie;
import com.example.new_project_challenge_15.entity.Person;
import com.example.new_project_challenge_15.entity.doubleReturn;
import com.example.new_project_challenge_15.repository.movieRepo;
import com.example.new_project_challenge_15.repository.objectRepo;
import com.example.new_project_challenge_15.service.PersonService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;


import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
public class moviesController {
    private final movieRepo mRepo;
    private final objectRepo oRepo;
    PersonService personService;
    @GetMapping("/persons/{ID}/limit/{LIMIT}")
    public doubleReturn getAllObjects(@PathVariable String ID, @PathVariable int LIMIT) {
        Long iii = Long.parseLong(ID);
        return personService.getById(iii, LIMIT);
    }

    @GetMapping("/persons/{ID}/{ENDID}") 
    public doubleReturn getShortPaths(@PathVariable Long ID, @PathVariable Long ENDID) {
        return personService.getShortestPaths(ID, ENDID);
        // return oRepo.getShortestPaths(ID, ENDID);
    }
    @GetMapping("/ogreturn")
    public doubleReturn getAllPersons() {
        return personService.getAllPersons();
    }
    @GetMapping("/movies")
    public List<Movie> getAllMovies() {
        List<Movie> list = mRepo.findAll();
        System.out.println(list.get(0));
        return list;
    }
    

}
