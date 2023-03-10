package com.example.new_project_challenge_15.controller;


import com.example.new_project_challenge_15.entity.*;
import com.example.new_project_challenge_15.models.User;
import com.example.new_project_challenge_15.models.photoDb;
import com.example.new_project_challenge_15.models.user_roles;
import com.example.new_project_challenge_15.repository.*;
import com.example.new_project_challenge_15.security.services.UserDetailsServiceImpl;
import com.example.new_project_challenge_15.service.*;

import lombok.AllArgsConstructor;
//import org.neo4j.springframework.data.core.Neo4jTemplate;
import org.neo4j.driver.Value;
import org.neo4j.driver.Values;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.Robot;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.*;
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
    RoleRepository rRepo;
    newPersonService newPersonService;
    newAddressRepo newAddressRepo;
    newCompanyRepo newCompanyRepo;
//    CompanyPersonService companyPersonService;
    @Autowired
    FiPersonsService personsService;
    newPhotoRepo newPhotoRepo;
    LogsService logsService;


    @GetMapping("/logtest")
    public List<log> logTest(){
        return logRepo.findByUsername("damirdamird");
    }

    @Autowired
    user_RolesRepo userRolesRepo;

    @GetMapping("/changeUserRole")
    @PreAuthorize("hasRole('ADMIN')")
    public void changeUserRole(@RequestParam String user, @RequestParam String role) {
//        System.out.println(user);
        Long u = Long.valueOf(user);
        Long r = Long.valueOf(role);
        user_roles obj = userRolesRepo.getById(u);
        obj.setRole_id(r);
        userRolesRepo.save(obj);
    }


    @GetMapping("/getusers")
//    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    @GetMapping("/getuserdetails")
    public statisticModel getUserDetails(@RequestParam String username) {
        return statisticService.getByUsername(username);
    }


    @GetMapping("/fltree")
    public doubleReturn getFlTree(Principal principal,@RequestParam String person, @RequestParam List<String> relations, @RequestParam int depth, @RequestParam int limit,
                                  @RequestParam(required = false) String orderNum,
                                  @RequestParam(required = false) String caseNum,
                                  @RequestParam(required = false) String orderDate,
                                  @RequestParam(required = false) String articleName,
                                  @RequestParam(required = false) String checkingName,
                                  @RequestParam(required = false) String otherReasons,
                                  @RequestParam(required = false) String organName,
                                  @RequestParam(required = false) String sphereName,
                                  @RequestParam(required = false) String tematikName,
                                  @RequestParam(required = false) String rukName) {
        // User user = userDetailsService.loadUserByUsernamek(principal);
        // List<String> request_bodies = new ArrayList<>();
        // request_bodies.add(person);
        // try{
        //     log log = new log();
        //     log.setOrder_num(orderNum);
        //     log.setOrder_date(orderDate);
        //     log.setArticle_name(articleName);
        //     log.setCase_num(caseNum);
        //     log.setChecking_name(checkingName);
        //     log.setOther_reasons(otherReasons);
        //     log.setOrgan_name(organName);
        //     log.setRuk_name(rukName);
        //     log.setSphere_name(sphereName);
        //     log.setTematik_name(tematikName);
        //     LocalDateTime current = LocalDateTime.now();
        //     log.setUsername(user.getUsername());
        //     log.setDate(current);
        //     log.setLimit_(limit);
        //     log.setDepth_(depth);
        //     log.setRequest_body(request_bodies);
        //     log.setRequest_rels(relations);
        //     logsService.SaveLog(log);
        // }catch (Exception e){
        //     System.out.println(e);
        // }
        return personsService.getPersonTree(person, depth, limit, relations);
    }
    @GetMapping("/flFIOtree")
    public doubleReturn getFlTree(@RequestParam String lastName1,@RequestParam String firstName1,@RequestParam String fatherName1, @RequestParam List<String> relations, @RequestParam int depth, @RequestParam int limit,               @RequestParam(required = false) String orderNum,
                                  @RequestParam(required = false) String caseNum,
                                  @RequestParam(required = false) String orderDate,
                                  @RequestParam(required = false) String articleName,
                                  @RequestParam(required = false) String checkingName,
                                  @RequestParam(required = false) String otherReasons,
                                  @RequestParam(required = false) String organName,
                                  @RequestParam(required = false) String sphereName,
                                  @RequestParam(required = false) String tematikName,
                                  @RequestParam(required = false) String rukName,Principal principal) {
//        User user = userDetailsService.loadUserByUsernamek(principal);
//        List<String> request_bodies = new ArrayList<>();
//        request_bodies.add(lastName1);request_bodies.add(firstName1);request_bodies.add(fatherName1);
//        try{
//            log log = new log();
//            log.setOrder_num(orderNum);
//            log.setOrder_date(orderDate);
//            log.setArticle_name(articleName);
//            log.setCase_num(caseNum);
//            log.setChecking_name(checkingName);
//            log.setOther_reasons(otherReasons);
//            log.setOrgan_name(organName);
//            log.setRuk_name(rukName);
//            log.setSphere_name(sphereName);
//            log.setTematik_name(tematikName);
//            LocalDateTime current = LocalDateTime.now();
//            log.setUsername(user.getUsername());
//            log.setDate(current);
//            log.setLimit_(limit);
//            log.setDepth_(depth);
//            log.setRequest_body(request_bodies);
//            log.setRequest_rels(relations);
//            logsService.SaveLog(log);
//        }catch (Exception e){
//            System.out.println(e);
//        }
        if (fatherName1 == ""){
return personsService.getPersonByFIO_withoutO(lastName1.toUpperCase(),firstName1.toUpperCase(),fatherName1.toUpperCase(), depth, limit, relations);
        }
        return personsService.getPersonByFIO_(lastName1.toUpperCase(),firstName1.toUpperCase(),fatherName1.toUpperCase(), depth, limit, relations);
    }


    @GetMapping("/shortestpaths")
//    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public doubleReturn getShortestPaths(@RequestParam String person, @RequestParam String person2, @RequestParam List<String> relations, @RequestParam(required = false) String orderNum,
                                         @RequestParam(required = false) String caseNum,
                                         @RequestParam(required = false) String orderDate,
                                         @RequestParam(required = false) String articleName,
                                         @RequestParam(required = false) String checkingName,
                                         @RequestParam(required = false) String otherReasons,
                                         @RequestParam(required = false) String organName,
                                         @RequestParam(required = false) String sphereName,
                                         @RequestParam(required = false) String tematikName,
                                         @RequestParam(required = false) String rukName,Principal principal) {
//        User user = userDetailsService.loadUserByUsernamek(principal);
//        List<String> request_bodies = new ArrayList<>();
//        request_bodies.add(person);
//        try{
//            log log = new log();
//            log.setData(orderDate);
//            log.setOrder_num(orderNum);
//            log.setOrder_date(orderDate);
//            log.setArticle_name(articleName);
//            log.setCase_num(caseNum);
//            log.setChecking_name(checkingName);
//            log.setOther_reasons(otherReasons);
//            log.setOrgan_name(organName);
//            log.setRuk_name(rukName);
//            log.setSphere_name(sphereName);
//            log.setTematik_name(tematikName);
//            LocalDateTime current = LocalDateTime.now();
//            log.setUsername(user.getUsername());
//            log.setDate(current);
//            log.setRequest_body(request_bodies);
//            log.setRequest_rels(relations);
//            logsService.SaveLog(log);
//        }catch (Exception e){
//            System.out.println(e);
//        }
        return personsService.getShortestPaths(person, person2, relations);
    }
    @GetMapping("/shortestpathsByFIO")
//    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public doubleReturn getShortestPathsByFIO(@RequestParam String lastName1,@RequestParam String firstName1,@RequestParam String fatherName1,@RequestParam String lastName2,@RequestParam String firstName2,@RequestParam String fatherName2, @RequestParam List<String> relations, @RequestParam(required = false) String orderNum,
                                         @RequestParam(required = false) String caseNum,
                                         @RequestParam(required = false) String orderDate,
                                         @RequestParam(required = false) String articleName,
                                         @RequestParam(required = false) String checkingName,
                                         @RequestParam(required = false) String otherReasons,
                                         @RequestParam(required = false) String organName,
                                         @RequestParam(required = false) String sphereName,
                                         @RequestParam(required = false) String tematikName,
                                         @RequestParam(required = false) String rukName,Principal principal) {
        User user = userDetailsService.loadUserByUsernamek(principal);
        List<String> request_bodies = new ArrayList<>();
//        request_bodies.add(person);
        try{
            log log = new log();
            log.setOrder_num(orderNum);
            log.setOrder_date(orderDate);
            log.setArticle_name(articleName);
            log.setCase_num(caseNum);
            log.setChecking_name(checkingName);
            log.setOther_reasons(otherReasons);
            log.setOrgan_name(organName);
            log.setRuk_name(rukName);
            log.setSphere_name(sphereName);
            log.setTematik_name(tematikName);
            LocalDateTime current = LocalDateTime.now();
            log.setUsername(user.getUsername());
            log.setDate(current);
            log.setRequest_body(request_bodies);
            log.setRequest_rels(relations);
            logsService.SaveLog(log);
        }catch (Exception e){
            System.out.println(e);
        }
        if(fatherName1 == "" & fatherName2 == ""){
            return personsService.getShortestPathWithFIObezbez(lastName1.toUpperCase(),firstName1.toUpperCase(),fatherName1.toUpperCase(),lastName2.toUpperCase(),firstName2.toUpperCase(),fatherName2.toUpperCase(), relations);
        }
        if(fatherName1 == "" & fatherName2 != ""){
            return personsService.getShortestPathWithFIObezs(lastName1.toUpperCase(),firstName1.toUpperCase(),fatherName1.toUpperCase(),lastName2.toUpperCase(),firstName2.toUpperCase(),fatherName2.toUpperCase(), relations);
        }
        if(fatherName1 != "" & fatherName2 == ""){
            return personsService.getShortestPathWithFIOsbez(lastName1.toUpperCase(),firstName1.toUpperCase(),fatherName1.toUpperCase(),lastName2.toUpperCase(),firstName2.toUpperCase(),fatherName2.toUpperCase(), relations);
        }

        return personsService.getShortestPathWithFIO(lastName1.toUpperCase(),firstName1.toUpperCase(),fatherName1.toUpperCase(),lastName2.toUpperCase(),firstName2.toUpperCase(),fatherName2.toUpperCase(), relations);
    }
    @GetMapping("/ultree")
//    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public doubleReturn getUlTree(@RequestParam String ul, @RequestParam List<String> relations, @RequestParam int depth, @RequestParam int limit, @RequestParam(required = false) String orderNum,
                                  @RequestParam(required = false) String caseNum,
                                  @RequestParam(required = false) String orderDate,
                                  @RequestParam(required = false) String articleName,
                                  @RequestParam(required = false) String checkingName,
                                  @RequestParam(required = false) String otherReasons,
                                  @RequestParam(required = false) String organName,
                                  @RequestParam(required = false) String sphereName,
                                  @RequestParam(required = false) String tematikName,
                                  @RequestParam(required = false) String rukName,Principal principal) {
        User user = userDetailsService.loadUserByUsernamek(principal);
        List<String> request_bodies = new ArrayList<>();
        request_bodies.add(ul);
        try{
            log log = new log();
            log.setOrder_num(orderNum);
            log.setOrder_date(orderDate);
            log.setArticle_name(articleName);
            log.setCase_num(caseNum);
            log.setChecking_name(checkingName);
            log.setOther_reasons(otherReasons);
            log.setOrgan_name(organName);
            log.setRuk_name(rukName);
            log.setSphere_name(sphereName);
            log.setTematik_name(tematikName);
            LocalDateTime current = LocalDateTime.now();
            log.setUsername(user.getUsername());
            log.setDate(current);
            log.setLimit_(limit);
            log.setDepth_(depth);
            log.setRequest_body(request_bodies);
            log.setRequest_rels(relations);
            logsService.SaveLog(log);
        }catch (Exception e){
            System.out.println(e);
        }
        return personsService.getUlTree(ul, relations, depth, limit);
    }
    @GetMapping("/flulpath")
//    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public doubleReturn getUlFlPath(@RequestParam String ul, @RequestParam String person, @RequestParam List<String> relations, @RequestParam(required = false) String orderNum,
                                    @RequestParam(required = false) String caseNum,
                                    @RequestParam(required = false) String orderDate,
                                    @RequestParam(required = false) String articleName,
                                    @RequestParam(required = false) String checkingName,
                                    @RequestParam(required = false) String otherReasons,
                                    @RequestParam(required = false) String organName,
                                    @RequestParam(required = false) String sphereName,
                                    @RequestParam(required = false) String tematikName,
                                    @RequestParam(required = false) String rukName,Principal principal) {
        User user = userDetailsService.loadUserByUsernamek(principal);
        List<String> request_bodies = new ArrayList<>();
        request_bodies.add(person);request_bodies.add(ul);
        try{
            log log = new log();
            log.setOrder_num(orderNum);
            log.setOrder_date(orderDate);
            log.setArticle_name(articleName);
            log.setCase_num(caseNum);
            log.setChecking_name(checkingName);
            log.setOther_reasons(otherReasons);
            log.setOrgan_name(organName);
            log.setRuk_name(rukName);
            log.setSphere_name(sphereName);
            log.setTematik_name(tematikName);
            LocalDateTime current = LocalDateTime.now();
            log.setUsername(user.getUsername());
            log.setDate(current);
            log.setRequest_body(request_bodies);
            log.setRequest_rels(relations);
            logsService.SaveLog(log);
        }catch (Exception e){
            System.out.println(e);
        }
        return personsService.getUlFlPath(ul, person, relations);
    }

    @GetMapping("/flulpathByFIO")
//    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public doubleReturn getUlFlPathByFIO(@RequestParam String ul, @RequestParam String lastName1,@RequestParam String firstName1,@RequestParam String fatherName1, @RequestParam List<String> relations, @RequestParam(required = false) String orderNum,
                                    @RequestParam(required = false) String caseNum,
                                    @RequestParam(required = false) String orderDate,
                                    @RequestParam(required = false) String articleName,
                                    @RequestParam(required = false) String checkingName,
                                    @RequestParam(required = false) String otherReasons,
                                    @RequestParam(required = false) String organName,
                                    @RequestParam(required = false) String sphereName,
                                    @RequestParam(required = false) String tematikName,
                                    @RequestParam(required = false) String rukName,Principal principal) {
//        User user = userDetailsService.loadUserByUsernamek(principal);
//        List<String> request_bodies = new ArrayList<>();
//        request_bodies.add(person);request_bodies.add(ul);
//        try{
//            log log = new log();
//            log.setData(orderDate);
//            log.setOrder_num(orderNum);
//            log.setOrder_date(orderDate);
//            log.setArticle_name(articleName);
//            log.setCase_num(caseNum);
//            log.setChecking_name(checkingName);
//            log.setOther_reasons(otherReasons);
//            log.setOrgan_name(organName);
//            log.setRuk_name(rukName);
//            log.setSphere_name(sphereName);
//            log.setTematik_name(tematikName);
//            LocalDateTime current = LocalDateTime.now();
//            log.setUsername(user.getUsername());
//            log.setDate(current);
//            log.setRequest_body(request_bodies);
//            log.setRequest_rels(relations);
//            logsService.SaveLog(log);
//        }catch (Exception e){
//            System.out.println(e);
//        }
        if (fatherName1 == "") {
            return personsService.getUlFlPathByFIOwithoutO(lastName1.toUpperCase(), firstName1.toUpperCase(), fatherName1.toUpperCase(), ul, relations);

        }
        return personsService.getUlFlPathByFIO(lastName1.toUpperCase(),firstName1.toUpperCase(),fatherName1.toUpperCase(),ul, relations);
    }

    @GetMapping("/ululpath")
    public doubleReturn getUlUlPath(@RequestParam String ul1,@RequestParam String ul2,@RequestParam List<String> relations, @RequestParam(required = false) String orderNum,
                                    @RequestParam(required = false) String caseNum,
                                    @RequestParam(required = false) String orderDate,
                                    @RequestParam(required = false) String articleName,
                                    @RequestParam(required = false) String checkingName,
                                    @RequestParam(required = false) String otherReasons,
                                    @RequestParam(required = false) String organName,
                                    @RequestParam(required = false) String sphereName,
                                    @RequestParam(required = false) String tematikName,
                                    @RequestParam(required = false) String rukName,Principal principal) {
        User user = userDetailsService.loadUserByUsernamek(principal);
        List<String> request_bodies = new ArrayList<>();
        request_bodies.add(ul1);
        request_bodies.add(ul2);
        try{
            log log = new log();
            log.setOrder_num(orderNum);
            log.setOrder_date(orderDate);
            log.setArticle_name(articleName);
            log.setCase_num(caseNum);
            log.setChecking_name(checkingName);
            log.setOther_reasons(otherReasons);
            log.setOrgan_name(organName);
            log.setRuk_name(rukName);
            log.setSphere_name(sphereName);
            log.setTematik_name(tematikName);
            LocalDateTime current = LocalDateTime.now();
            log.setUsername(user.getUsername());
            log.setDate(current);
            log.setRequest_body(request_bodies);
            log.setRequest_rels(relations);
            logsService.SaveLog(log);
        }catch (Exception e){
            System.out.println(e);
        }
        return personsService.getUlUlPath(ul1, ul2, relations);
    }

    @GetMapping("/shortopen")
    public doubleReturn getShortOpen(@RequestParam Long id, @RequestParam List<String> relations) {
        return personsService.shortOpen(id, relations);
    }




    @GetMapping("/newd")
    public String getNdew() {
        try{
            Robot robot = new Robot();
            System.out.println("sds");
            Rectangle rectangle = new Rectangle(0,0,500,500);
            System.out.println("sds");

            BufferedImage bufferedImage = robot.createScreenCapture(rectangle);

            ImageIO.write(bufferedImage,"JPG",new File("C:\\Users\\123\\Desktop\\project-aitab\\new_pj_15\\sreenshot.jpg"));
        }catch (Exception e){
            e.printStackTrace();
        }

        return "privet";
    }
    @GetMapping("/photo")
    public photoDb getPhoto(){
        photoDb photoDb = newPhotoRepo.findByIin("040210551264");
        System.out.println(photoDb.getPhoto());
        return newPhotoRepo.findByIin("040502651337");
    }

//    @GetMapping("/test")
//    public doubleReturn testDoubleReturn() {
//        return companyPersonService.Test();
//    }
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
