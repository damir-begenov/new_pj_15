package com.example.new_project_challenge_15.controller;

import com.example.new_project_challenge_15.models.log;
import com.example.new_project_challenge_15.repository.logRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/finpol/main")

public class LogController {
    @Autowired
    logRepo logsService;
    @GetMapping("/stringi")
    public List<log> get(){
        List<log> lisst = logsService.findByUsername("");
        return logsService.findAll();
    }

}
