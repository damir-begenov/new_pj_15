package com.example.new_project_challenge_15.entity;

import java.util.List;

import lombok.ToString;

public class doubleReturn {
    private List<nodeStudentModel> nodes;
    private List<edgesModel> edges;

    public doubleReturn(List<nodeStudentModel> nodes, List<edgesModel> edges) {
        this.nodes = nodes;
        this.edges = edges;
    }

    public List<edgesModel> getEdges() {
        return edges;
    }
    public List<nodeStudentModel> getNodes() {
        return nodes;
    }
    
}
