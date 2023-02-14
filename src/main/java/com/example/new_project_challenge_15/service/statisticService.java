package com.example.new_project_challenge_15.service;

import org.springframework.stereotype.Service;

import com.example.new_project_challenge_15.entity.log;

import com.example.new_project_challenge_15.entity.statisticModel;
import com.example.new_project_challenge_15.models.User;
import com.example.new_project_challenge_15.repository.UserRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import java.util.Optional;

@Service
public class statisticService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    com.example.new_project_challenge_15.repository.logRepo logRepo;

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
