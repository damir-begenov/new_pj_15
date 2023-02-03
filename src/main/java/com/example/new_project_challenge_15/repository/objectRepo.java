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

    @Query("MATCH p=(n1:Person)-[*]-() WHERE id(n1) = ($ID) RETURN p LIMIT 10")
    List<Person> getById(Long ID, int LIMIT);

    @Query("WITH ($ID) AS id MATCH (startNode) WHERE id(startNode) = id OPTIONAL MATCH p = (startNode)-[*1..2]-(endNode) RETURN COLLECT(DISTINCT p)")
    List<Person> getByIdandDepth(Long ID, int DEPTH); //////////////////////////////////////////////////////DEPTH
    // @Query("MATCH p = allShortestPaths((startNode:Person)-[*]-(endNode)) WHERE id(startNode) = ($ID) and id(endNode) = ($ENDID)  RETURN p")
    @Query("WITH ($ID) AS id MATCH (startNode), (endNode) WHERE id(startNode) = id and id(endNode) = ($ENDID) OPTIONAL MATCH p = shortestPath((startNode)-[*]-(endNode)) RETURN p")
    List<Person> getShortestPaths(Long ID, Long ENDID); 
}
