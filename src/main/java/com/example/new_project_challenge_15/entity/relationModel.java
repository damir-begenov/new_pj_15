package com.example.new_project_challenge_15.entity;

import java.util.List;

public class relationModel {
    private int from;
    private int to;
    private String type;
    private List<propertiesModel> properties;

    public int getFrom() {
        return from;
    }
    public int getTo() {
        return to;
    }
    public String getType() {
        return type;
    }
    public List<propertiesModel> getProperties() {
        return properties;
    }
    public void setFrom(int from) {
        this.from = from;
    }
    public void setTo(int to) {
        this.to = to;
    }
    public void setType(String type) {
        this.type = type;
    }
    public void setProperties(List<propertiesModel> properties) {
        this.properties = properties;
    }
}
