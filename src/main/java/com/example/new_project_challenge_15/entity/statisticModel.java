package com.example.new_project_challenge_15.entity;

import java.time.LocalDateTime;
import java.util.List;

import com.example.new_project_challenge_15.models.User;

public class statisticModel {
    private User user;
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }
    private LocalDateTime lastDate;
    private int allRequsetNum;
    private int todayRequsetNum;
    private List<log> logs;


    public LocalDateTime getDate() {
        return lastDate;
    }
    public void setDate(LocalDateTime lastDate) {
        this.lastDate = lastDate;
    }
    public int getAllRequsetNum() {
        return allRequsetNum;
    }
    public void setAllRequsetNum(int allRequsetNum) {
        this.allRequsetNum = allRequsetNum;
    }
    public int getTodayRequsetNum() {
        return todayRequsetNum;
    }
    public void setTodayRequsetNum(int todayRequsetNum) {
        this.todayRequsetNum = todayRequsetNum;
    }
    public List<log> getLogs() {
        return logs;
    }
    public void setLogs(List<log> logs) {
        this.logs = logs;
    }

 
    
}
