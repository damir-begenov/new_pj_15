package com.example.new_project_challenge_15.entity;

import java.util.List;
import java.util.Map;

public class Nodes {
    private Long id;

    private Map<String, Object> properties;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Map<String, Object> getProperties() {
        return properties;
    }

    public void setProperties(Map<String, Object> properties) {
        this.properties = properties;
    }
}
