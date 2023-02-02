package com.example.new_project_challenge_15.repository;

import java.util.List;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.stereotype.Repository;

import com.example.new_project_challenge_15.entity.Person;

@Repository
public interface objectRepo extends Neo4jRepository<Person, Long> {
    @Query("match (n)-[r]->(i) return n,r,i")
    List<Person> getAll();

    @Query("WITH ($ID) AS id MATCH p1 = (n)<-[r1]-() WHERE id(n) = id WITH id, p1 MATCH p2 = (n)-[r2]->() WHERE id(n) = id RETURN  COLLECT(p1) + COLLECT(p2) as p")
    List<Person> getById(Long ID);
}
