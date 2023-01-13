package com.example.new_project_challenge_15.entity;

import com.example.new_project_challenge_15.entity.enums.School;

import java.util.List;

public class nodes {
    private List<students> students;
    private School school;
    private List<edges> edges;

    public List<com.example.new_project_challenge_15.entity.students> getStudents() {
        return students;
    }

    public School getSchool() {
        return school;
    }

    public List<com.example.new_project_challenge_15.entity.edges> getEdges() {
        return edges;
    }

    public void setStudents(List<com.example.new_project_challenge_15.entity.students> students) {
        this.students = students;
    }

    public void setSchool(School school) {
        this.school = school;
    }

    public void setEdges(List<com.example.new_project_challenge_15.entity.edges> edges) {
        this.edges = edges;
    }
}
