package com.example.new_project_challenge_15.repository;

import com.example.new_project_challenge_15.entity.Company;
import com.example.new_project_challenge_15.entity.Persons;
import org.neo4j.driver.Value;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
public interface newPersonService extends Neo4jRepository<Persons,Long> {
//    final String query1 = "with 3 as d MATCH p=(n:Person)-[*1..3]-() RETURN p LIMIT 20";
//    @Query("WITH {0} as d MATCH (startNode:Person) WHERE startNode.`ИИН` = {1} OPTIONAL MATCH p = (startNode)-[r*1..{0}]-(endNode) WHERE ALL(rel in relationships(p) WHERE type(rel) in {2}) AND length(p)<=d WITH DISTINCT p as paths LIMIT {3} RETURN COLLECT(distinct paths)")
//    List<Persons> getPersonTreee(int depth, String person, List<String> relations, int limit);

    @Query("MATCH p=(n:Person)-[*1..2]-() where n.`ИИН`= '040210551264' RETURN p LIMIT 20")
    List<Persons> getPersons();
    @Query("MATCH (startNode:Person) WHERE startNode.`ИИН` = ($PERSON) OPTIONAL MATCH p = (startNode)-[*1..1]-(endNode) WHERE ALL(rel in relationships(p) WHERE type(rel) in $RELS) AND length(p)<=1 WITH DISTINCT p as paths LIMIT $LIMIT RETURN COLLECT(distinct paths)")
    List<Persons> getPersonTreeDepthOne(String PERSON, int LIMIT, List<String> RELS);
    @Query("MATCH (startNode:Person) WHERE startNode.`ИИН` = ($PERSON) OPTIONAL MATCH p = (startNode)-[*1..2]-(endNode) WHERE ALL(rel in relationships(p) WHERE type(rel) in $RELS) AND length(p)<=2 WITH DISTINCT p as paths LIMIT $LIMIT RETURN COLLECT(distinct paths)")
    List<Persons> getPersonTreeDepthTwo(String PERSON, int LIMIT, List<String> RELS);
    @Query("MATCH (startNode:Person) WHERE startNode.`ИИН` = ($PERSON) OPTIONAL MATCH p = (startNode)-[*1..3]-(endNode) WHERE ALL(rel in relationships(p) WHERE type(rel) in $RELS) AND length(p)<=3 WITH DISTINCT p as paths LIMIT $LIMIT RETURN COLLECT(distinct paths)")
    List<Persons> getPersonTreeDepthThree(String PERSON, int LIMIT, List<String> RELS);

    @Query("WITH $DEPTH as d MATCH (startNode:Person) WHERE startNode.`ИИН` = ($PERSON) OPTIONAL MATCH p = (startNode)-[*1..10]-(endNode) WHERE ALL(rel in relationships(p) WHERE type(rel) in $RELS) AND length(p)<=d WITH DISTINCT p as paths LIMIT $LIMIT RETURN COLLECT(distinct paths)")
    List<Persons> getPersonTree(String PERSON, @Param("depth") int DEPTH, int LIMIT, List<String> RELS);

    @Query("WITH $params.depth as d MATCH (startNode:Person) WHERE startNode.`ИИН` = ($params.person) OPTIONAL MATCH p = (startNode)-[*1..$depth]-(endNode) WHERE ALL(rel in relationships(p) WHERE type(rel) in $params.relations) AND length(p)<=d WITH DISTINCT p as paths LIMIT $params.limit RETURN COLLECT(distinct paths)")
    List<Persons> getPersonTree(@Param("params") Value params, @Param("depth") Value depth);
}
