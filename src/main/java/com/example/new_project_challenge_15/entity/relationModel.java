package com.example.new_project_challenge_15.entity;

import java.util.List;

public class relationModel {
    private Long from;
    private Long to;
    private String type;
    private List<propertiesModel> properties;

    public relationModel(Long start, Long end, List<propertiesModel> propertiesModels) {
        this.from = start;
        this.to = end;
        this.properties = propertiesModels;
    }

    public Long getFrom() {
        return from;
    }
    public Long getTo() {
        return to;
    }
    public String getType() {
        return type;
    }
    public List<propertiesModel> getProperties() {
        return properties;
    }
    public void setFrom(Long start) {
        this.from = start;
    }
    public void setTo(Long end) {
        this.to = end;
    }
    public void setType(String type) {
        this.type = type;
    }
    public void setProperties(List<propertiesModel> properties) {
        this.properties = properties;
    }
}
