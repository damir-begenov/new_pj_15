package com.example.new_project_challenge_15.entity;

import java.util.List;

public class relationModel {
    private int start;
    private int end;
    private String type;
    private List<propertiesModel> properties;

    public int getStart() {
        return start;
    }
    public int getEnd() {
        return end;
    }
    public String getType() {
        return type;
    }
    public List<propertiesModel> getProperties() {
        return properties;
    }
    public void setStart(int start) {
        this.start = start;
    }
    public void setEnd(int end) {
        this.end = end;
    }
    public void setType(String type) {
        this.type = type;
    }
    public void setProperties(List<propertiesModel> properties) {
        this.properties = properties;
    }
}
