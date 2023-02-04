package com.example.new_project_challenge_15.repository;

import java.util.List;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.stereotype.Repository;

import com.example.new_project_challenge_15.entity.rels.ACTED_IN;

@Repository
public interface ACTED_INRepo extends Neo4jRepository<ACTED_IN, Long> {
    @Query("match ()-[r]-() where id(r) = ($IDs) return DISTINCT r")
    ACTED_IN getAll(Integer IDs);
}
