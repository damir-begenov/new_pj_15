package com.example.new_project_challenge_15.repository;

import com.example.new_project_challenge_15.entity.Persons;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

import java.util.List;

public interface newPersonService extends Neo4jRepository<Persons,Long> {
    @Query("Match (n:Person) return n limit 100")
    List<Persons> getPersons();
}