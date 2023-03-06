package com.example.new_project_challenge_15.controller;


import com.example.new_project_challenge_15.entity.*;
import com.example.new_project_challenge_15.models.photoDb;
import com.example.new_project_challenge_15.repository.*;
import com.example.new_project_challenge_15.security.services.UserDetailsServiceImpl;
import com.example.new_project_challenge_15.service.CompanyPersonService;
import com.example.new_project_challenge_15.service.FiPersonsService;
import com.example.new_project_challenge_15.service.PersonService;
import com.example.new_project_challenge_15.service.statisticService;

import lombok.AllArgsConstructor;
//import org.neo4j.springframework.data.core.Neo4jTemplate;
import org.neo4j.driver.Value;
import org.neo4j.driver.Values;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.HashMap;
import java.util.List;
import java.util.Map;


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
    RoleRepository rRepo;
    newPersonService newPersonService;
    newAddressRepo newAddressRepo;
    newCompanyRepo newCompanyRepo;
    CompanyPersonService companyPersonService;
    @Autowired
    FiPersonsService personsService;
    newPhotoRepo newPhotoRepo;

    @GetMapping("/fltree")
    public doubleReturn getFlTree(@RequestParam String person, @RequestParam List<String> relations, @RequestParam int depth, @RequestParam int limit) {
        return personsService.getPersonTree(person, depth, limit, relations);
    }

    @GetMapping("/shortestpaths")
//    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public doubleReturn getShortestPaths(@RequestParam String person, @RequestParam String person2, @RequestParam List<String> relations) {
        return personsService.getShortestPaths(person, person2, relations);
    }
    @GetMapping("/ultree")
//    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public doubleReturn getUlTree(@RequestParam String ul, @RequestParam List<String> relations, @RequestParam int depth, @RequestParam int limit) {
        return personsService.getUlTree(ul, relations, depth, limit);
    }
    @GetMapping("/flulpath")
//    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public doubleReturn getUlFlPath(@RequestParam String ul, @RequestParam String person, @RequestParam List<String> relations) {
        return personsService.getUlFlPath(ul, person, relations);
    }

    @GetMapping("/ululpath")
    public doubleReturn getUlUlPath(@RequestParam String ul1,@RequestParam String ul2,@RequestParam List<String> relations) {
        return personsService.getUlUlPath(ul1, ul2, relations);
    }

    @GetMapping("/shortopen")
    public doubleReturn getShortOpen(@RequestParam Long id) {
        return personsService.shortOpen(id);
    }




    @GetMapping("/newd")
    public List<Persons> getNdew() {
        return newPersonService.getPersons();
    }
    @GetMapping("/photo")
    public photoDb getPhoto(){
        photoDb photoDb = newPhotoRepo.findByIin("040210551264");
        System.out.println(photoDb.getPhoto());
        return newPhotoRepo.findByIin("040502651337");
    }

    @GetMapping("/test")
    public doubleReturn testDoubleReturn() {
        return companyPersonService.Test();
    }
//
//    @GetMapping("/fltree")
//    public

//
//    @GetMapping("/statistic")
//    public statisticModel getUserLogs(@RequestParam String username) {
//        return statisticService.getByUsername(username);
//    }
//    @PostMapping("/admin/user/ban/{id}")
//    public void userBan(@PathVariable("id") Long id){
//        statisticService.userBan(id);
//    }
//    @PostMapping("/admin/user/moderator/{id}")
//    public void userModerator(@PathVariable("id") Long id){
//        statisticService.userSetAdministrator(id);
//    }
//
//    @PostMapping("/updaterole")
//    public void updateRole(@RequestParam Integer id, @RequestParam Integer Role) {
//        userRepository.updateRole(id, Role);
//    }
//
//    @GetMapping("/role")
//    public String getRole(@RequestParam Integer id) {
//        return rRepo.FindRole(id);
//    }
//
//    @GetMapping("/logs")
//    public List<log> getLogs() {
//        return logRepo.findAll();
//    }
//
//
//    @GetMapping("/users")
//    public List<User> getUsers() {
//        return userRepository.findAll();
//    }
//
//    @GetMapping("/person")
//    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
//    public doubleReturn getByIdLevelAndLimit(@RequestParam String person, @RequestParam List<String> relations, @RequestParam int depth, @RequestParam int limit, Principal principal) throws Exception{
//        User user  = userDetailsService.loadUserByUsernamek(principal);
//        List<String> request_bodies = new ArrayList<>();
//
//        request_bodies.add(person);
//
//        try{
//            log log = new log();
//            LocalDateTime current = LocalDateTime.now();
//            log.setDate(current);
//            log.setUsername(user.getUsername());
//            log.setRequest_body(request_bodies);
//            log.setLimit_(limit);
//            log.setDepth_(depth);
//            log.setRequest_rels(relations);
//            personService.SaveLog(log);
//        } catch (Exception e) {
//            System.out.println(e);
//        }
//
//        List<User> users = userRepository.findAll();
//        System.out.println(users);
//        return personService.getPersonTree(person, relations, depth, limit);
//    }

//    @GetMapping("/shortestpaths")
//    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
//    public doubleReturn getShortestPaths(@RequestParam String person, @RequestParam String person2, @RequestParam List<String> relations, Principal principal) {
//        User user  = userDetailsService.loadUserByUsernamek(principal);
//        List<String> request_bodies = new ArrayList<>();
//        request_bodies.add(person);
//        request_bodies.add(person2);
//        try{
//            log log = new log();
//            LocalDateTime current = LocalDateTime.now();
//            log.setDate(current);
//            log.setUsername(user.getUsername());
//            log.setRequest_body(request_bodies);
//            log.setRequest_rels(relations);
//            personService.SaveLog(log);
//        }catch (Exception e){
//            System.out.println(e);
//        }
//        return personService.getShortestPaths(person, person2, relations);
//    }
//
//    @GetMapping("/movie")
//    public doubleReturn retrieveMovie(@RequestParam String title, @RequestParam List<String> relations, Principal principal) {
//        User user  = userDetailsService.loadUserByUsernamek(principal);
//        List<String> request_bodies = new ArrayList<>();
//        request_bodies.add(title);
//        try{
//            log log = new log();
//            LocalDateTime current = LocalDateTime.now();
//            log.setDate(current);
//            log.setUsername(user.getUsername());
//            log.setRequest_body(request_bodies);
//            log.setRequest_rels(relations);
//            personService.SaveLog(log);
//        }catch (Exception e){
//            System.out.println(e);
//        }
//        return personService.getByMovie(title, relations);
//    }
//    @GetMapping("/movieperson")
//    public doubleReturn moviePersonRelation(@RequestParam String person, @RequestParam String movie, @RequestParam List<String> relations, Principal principal ) {
//        User user  = userDetailsService.loadUserByUsernamek(principal);
//        List<String> request_bodies = new ArrayList<>();
//        request_bodies.add(person);
//        request_bodies.add(movie);
//        try{
//            log log = new log();
//            LocalDateTime current = LocalDateTime.now();
//            log.setDate(current);
//            log.setUsername(user.getUsername());
//            log.setRequest_body(request_bodies);
//            log.setRequest_rels(relations);
//            personService.SaveLog(log);
//        }catch (Exception e){
//            System.out.println(e);
//        }
//        return personService.getMoviePersonRelation(person, movie, relations);
//    }
//    @GetMapping("/shortopen")
//    public doubleReturn shortOpen(@RequestParam Long id) {
//        return personService.shortOpen(id);
//    }

}
