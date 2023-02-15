package com.example.new_project_challenge_15.service;

import com.example.new_project_challenge_15.models.ERole;
import com.example.new_project_challenge_15.models.Role;
import com.example.new_project_challenge_15.repository.RoleRepository;
import org.springframework.stereotype.Service;

import com.example.new_project_challenge_15.entity.log;

import com.example.new_project_challenge_15.entity.statisticModel;
import com.example.new_project_challenge_15.models.User;
import com.example.new_project_challenge_15.repository.UserRepository;

import java.util.HashSet;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import java.util.Optional;
import java.util.Set;

@Service
public class statisticService {
    @Autowired

    UserRepository userRepository;
    @Autowired
    RoleRepository roleRepository;

    @Autowired
    com.example.new_project_challenge_15.repository.logRepo logRepo;

    public void userBan(Long id){
        User user = userRepository.findById(id).orElse(null);
        if(user != null){
            if(user.isActive()) {
                user.setActive(false);
            }else{
                user.setActive(true);
            }
        }
        userRepository.save(user);
    }
    public void userSetAdministrator(Long id){
        User user = userRepository.findById(id).orElse(null);
        Set<Role> roles = new HashSet<>();
        Role userRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        if(user.getRoles().contains(userRole)){
            user.getRoles().remove(userRole);
        }else{
            roles.add(userRole);
            user.setRoles(roles);
        }
        userRepository.save(user);
    }

    public statisticModel getByUsername(String username) {
        User user = userRepository.findByUsernameTwo(username);
        log lastLog = logRepo.findLastDate(username);
        List<log> logs = logRepo.findByUsername(username);
        statisticModel stat = new statisticModel();
        stat.setAllRequsetNum(logRepo.findNumberOfRequests(username));
        stat.setDate(lastLog.getDate());
        stat.setLogs(logs);
        stat.setUser(user);
        stat.setTodayRequsetNum(logRepo.findTodayRequestNum(username));
        return stat;
    }
}
