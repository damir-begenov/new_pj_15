package com.example.new_project_challenge_15.repository;

import java.util.List;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

public interface objectRepo extends Neo4jRepository<objectModel, String> {
    @Query("match (n)-[r]->(i) return n, i")
    List<objectModel> getAllO();
}
