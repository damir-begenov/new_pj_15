package com.example.new_project_challenge_15.controller;


import com.example.new_project_challenge_15.entity.log;
import com.example.new_project_challenge_15.entity.statisticModel;
import com.example.new_project_challenge_15.entity.doubleReturn;
import com.example.new_project_challenge_15.models.User;
import com.example.new_project_challenge_15.repository.UserRepository;
import com.example.new_project_challenge_15.security.services.UserDetailsServiceImpl;
import com.example.new_project_challenge_15.service.PersonService;
import com.example.new_project_challenge_15.service.statisticService;

import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


import java.security.Principal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/finpol/main")
@AllArgsConstructor
public class moviesController {
    PersonService personService;
    UserDetailsServiceImpl userDetailsService;
    statisticService statisticService;
    com.example.new_project_challenge_15.repository.logRepo logRepo;
    UserRepository userRepository;



    @GetMapping("/statistic")
    public statisticModel getUserLogs(@RequestParam String username) {
        return statisticService.getByUsername(username);
    }

    @GetMapping("/role")
    public int getRole(@RequestParam Integer id) {
        return userRepository.getRoleById(id);
    }

    @GetMapping("/logs")
    public List<log> getLogs() {
        return logRepo.findAll();
    }
    @GetMapping("/users")
    public List<User> getUsers() {
        return userRepository.findAll();
    }
    @GetMapping("/person")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public doubleReturn getByIdLevelAndLimit(@RequestParam String person, @RequestParam List<String> relations, @RequestParam int depth, @RequestParam int limit, Principal principal) throws Exception{
        User user  = userDetailsService.loadUserByUsernamek(principal);
        List<String> request_bodies = new ArrayList<>();
        request_bodies.add(person);
        try{
        log log = new log();
            LocalDateTime current = LocalDateTime.now();
            log.setDate(current);
            log.setUsername(user.getUsername());
            log.setRequest_body(request_bodies);
            log.setLimit_(limit);
            log.setDepth_(depth);
            log.setRequest_rels(relations);
            personService.SaveLog(log);
            }catch (Exception e){
            System.out.println(e);
        }
        List<User> users = userRepository.findAll();
        System.out.println(users);
        return personService.getPersonTree(person, relations, depth, limit);
    }
    @GetMapping("/shortestpaths")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public doubleReturn getShortestPaths(@RequestParam String person, @RequestParam String person2, @RequestParam List<String> relations,Principal principal) {
        User user  = userDetailsService.loadUserByUsernamek(principal);
        List<String> request_bodies = new ArrayList<>();
        request_bodies.add(person);
        request_bodies.add(person2);
        try{
            log log = new log();
            LocalDateTime current = LocalDateTime.now();
            log.setDate(current);
            log.setUsername(user.getUsername());
            log.setRequest_body(request_bodies);
            log.setRequest_rels(relations);
            personService.SaveLog(log);
        }catch (Exception e){
            System.out.println(e);
        }
        return personService.getShortestPaths(person, person2, relations);
    }
    @GetMapping("/movie")
    public doubleReturn retrieveMovie(@RequestParam String title, @RequestParam List<String> relations,Principal principal) {
        User user  = userDetailsService.loadUserByUsernamek(principal);
        List<String> request_bodies = new ArrayList<>();
        request_bodies.add(title);
        try{
            log log = new log();
            LocalDateTime current = LocalDateTime.now();
            log.setDate(current);
            log.setUsername(user.getUsername());
            log.setRequest_body(request_bodies);
            log.setRequest_rels(relations);
            personService.SaveLog(log);
        }catch (Exception e){
            System.out.println(e);
        }
        return personService.getByMovie(title, relations);
    }
    @GetMapping("/movieperson")
    public doubleReturn moviePersonRelation(@RequestParam String person, @RequestParam String movie, @RequestParam List<String> relations ,Principal principal) {
        User user  = userDetailsService.loadUserByUsernamek(principal);
        List<String> request_bodies = new ArrayList<>();
        request_bodies.add(person);
        request_bodies.add(movie);
        try{
            log log = new log();
            LocalDateTime current = LocalDateTime.now();
            log.setDate(current);
            log.setUsername(user.getUsername());
            log.setRequest_body(request_bodies);
            log.setRequest_rels(relations);
            personService.SaveLog(log);
        }catch (Exception e){
            System.out.println(e);
        }
        return personService.getMoviePersonRelation(person, movie, relations);
    }
    @GetMapping("/shortopen")
    public doubleReturn shortOpen(@RequestParam Long id) {
        return personService.shortOpen(id);
    }

}
