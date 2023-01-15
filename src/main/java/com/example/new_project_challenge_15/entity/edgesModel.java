package com.example.new_project_challenge_15.entity;

public class edgesModel {
    private int from;
    private int to;

    public edgesModel() {

    }

    public edgesModel(int from, int to) {
        this.from = from;
        this.to = to;
    }

    public void setFrom(int from) {
        this.from = from;
    }
    public void setTo(int to) {
        this.to = to;
    }

    public int getFrom() {
        return from;
    }
    public int getTo() {
        return to;
    }
}

