package com.example.new_project_challenge_15.entity;

import java.util.Date;

public class edgesModel {
    private int from;
    private int to;
    private Date start_date;
    private Date end_date;
    public edgesModel() {

    }

    public edgesModel(int from, int to) {
        this.from = from;
        this.to = to;        
    }


    public edgesModel(int from, int to, Date start_date, Date end_date) {
        this.from = from;
        this.to = to;
        this.start_date = start_date;
        this.end_date = end_date;
    }

    @Override
    public String toString() {
        return "edgesModel{" +
                "from=" + from +
                ", to=" + to +
                ", date='" + start_date + '\'' +
                '}';
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

    public Date getStart_date() {
        return start_date;
    }

    public void setStart_date(Date start_date) {
        this.start_date = start_date;
    }

    public Date getEnd_date() {
        return end_date;
    }

    public void setEnd_date(Date end_date) {
        this.end_date = end_date;
    }
}