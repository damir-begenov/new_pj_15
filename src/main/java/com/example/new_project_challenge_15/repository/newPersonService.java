package com.example.new_project_challenge_15.repository;

import com.example.new_project_challenge_15.entity.Company;
import com.example.new_project_challenge_15.entity.Persons;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

import java.util.List;

public interface newPersonService extends Neo4jRepository<Persons,Long> {
    @Query("MATCH p=(n:Person)-[]-() RETURN p LIMIT 20")
    List<Persons> getPersons();

    @Query("WITH $DEPTH as d MATCH (startNode) WHERE startNode.name = ($PERSON) OPTIONAL MATCH p = (startNode)-[r*1..7]-(endNode) WHERE ALL(rel in relationships(p) WHERE type(rel) in $RELS) AND length(p)<=d WITH DISTINCT p as paths LIMIT $LIMIT RETURN COLLECT(distinct paths)")
    List<Persons> getPersonTree(String PERSON, List<String> RELS, int DEPTH, int LIMIT);
}
