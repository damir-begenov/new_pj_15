package com.example.new_project_challenge_15.entity;

public class Nodes {
    private Long id;
    private String name;
    private String description;
    private Integer Year;

    public Nodes(Long id, String name, String description, Integer year) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.Year = year;
    }

    public Long getId() {
        return id;
    }
    public String getName() {
        return name;
    }
    public String getDescription() {
        return description;
    }
    public Integer getYear() {
        return Year;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public void setName(String name) {
        this.name = name;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public void setYear(Integer year) {
        Year = year;
    }
}
