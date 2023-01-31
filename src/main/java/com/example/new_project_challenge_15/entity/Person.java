package com.example.new_project_challenge_15.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Node;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Node
@AllArgsConstructor
@NoArgsConstructor
public class Person {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private Integer born;

    public Long getId() {
        return id;
    }
    public String getName() {
        return name;
    }
    public Integer getBorn() {
        return born;
    }
    public void setId(Long identity) {
        this.id = identity;
    }
    public void setName(String name) {
        this.name = name;
    }
    public void setBorn(Integer born) {
        this.born = born;
    }
}
