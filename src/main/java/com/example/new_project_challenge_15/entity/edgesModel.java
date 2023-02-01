package com.example.new_project_challenge_15.entity;

import java.util.Date;

public class edgesModel {
    private Long from;
    private Long to;


    public edgesModel() {

    }

    public edgesModel(Long from, Long to) {
        this.from = from;
        this.to = to;
    }

    public Long getFrom() {
        return from;
    }

    public void setFrom(Long from) {
        this.from = from;
    }

    public Long getTo() {
        return to;
    }

    public void setTo(Long to) {
        this.to = to;
    }

    @Override
    public String toString() {
        return "edgesModel{" +
                "from=" + from +
                ", to=" + to +
                '}';
    }
}