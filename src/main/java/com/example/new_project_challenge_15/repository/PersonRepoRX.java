//package com.example.new_project_challenge_15.repository;
//
//import com.example.new_project_challenge_15.entity.Persons;
//import org.neo4j.springframework.data.repository.Neo4jRepository;
//import org.springframework.data.neo4j.repository.query.Query;
//
//import java.util.List;
//
//public interface PersonRepoRX extends Neo4jRepository<Persons, Long> {
//    @Query("WITH {0} as d MATCH (startNode:Person) WHERE startNode.`ИИН` = {1} OPTIONAL MATCH p = (startNode)-[r*1..{0}]-(endNode) WHERE ALL(rel in relationships(p) WHERE type(rel) in {2}) AND length(p)<=d WITH DISTINCT p as paths LIMIT {3} RETURN COLLECT(distinct paths)")
//    List<Persons> getPersonTree(int depth, String person, List<String> relations, int limit);
//}
