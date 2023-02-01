package com.example.new_project_challenge_15.entity;

import java.util.List;

import lombok.ToString;

public class doubleReturn {
    private List<Person> nodes;
    private List<edgesModel> edges;

    public doubleReturn() {
    }

    public List<Person> getNodes() {
        return nodes;
    }

    public void setNodes(List<Person> nodes) {
        this.nodes = nodes;
    }

    public List<edgesModel> getEdges() {
        return edges;
    }

    public void setEdges(List<edgesModel> edges) {
        this.edges = edges;
    }

    @Override
    public String toString() {
        return "doubleReturn{" +
                "nodes=" + nodes +
                ", edges=" + edges +
                '}';
    }
}
