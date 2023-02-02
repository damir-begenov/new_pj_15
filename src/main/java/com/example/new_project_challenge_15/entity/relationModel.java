package com.example.new_project_challenge_15.entity;

import java.util.List;

public class relationModel {
    private Long start;
    private Long end;
    private String type;
    private List<propertiesModel> properties;

    public relationModel(Long start, Long end, List<propertiesModel> propertiesModels) {
        this.start = start;
        this.end = end;
        this.properties = propertiesModels;
    }

    public Long getStart() {
        return start;
    }
    public Long getEnd() {
        return end;
    }
    public String getType() {
        return type;
    }
    public List<propertiesModel> getProperties() {
        return properties;
    }
    public void setStart(Long start) {
        this.start = start;
    }
    public void setEnd(Long end) {
        this.end = end;
    }
    public void setType(String type) {
        this.type = type;
    }
    public void setProperties(List<propertiesModel> properties) {
        this.properties = properties;
    }
}
