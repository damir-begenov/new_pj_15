package com.example.new_project_challenge_15.repository;

import com.example.new_project_challenge_15.entity.Company;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

import java.util.List;

public interface newCompanyRepo extends Neo4jRepository<Company,Long> {
    @Query("MATCH p=(n:Person)-[]-() RETURN p LIMIT 10")
    List<Company> getCompany();

//    @Query("WITH $DEPTH as d MATCH (startNode) WHERE startNode.name = ($PERSON) OPTIONAL MATCH p = (startNode)-[r*1..7]-(endNode) WHERE ALL(rel in relationships(p) WHERE type(rel) in [$REL1, $REL2, $REL3, $REL4, $REL5, $REL6,$REL7, $REL8, $REL9, $REL10, $REL11, $REL12, $REL13, $REL14, $REL15, $REL16, $REL17, $REL18, $REL19, $REL20, $REL21, $REL22, $REL23, $REL24, $REL25, $REL26, $REL27, $REL28, $REL29, $REL30, $REL31, $REL32, $REL33, $REL34]) AND length(p)<=d WITH DISTINCT p as paths LIMIT $LIMIT RETURN COLLECT(distinct paths)")
//    List<Company> getPersonTree()

    @Query("WITH $DEPTH as d MATCH (startNode) WHERE startNode.name = ($PERSON) OPTIONAL MATCH p = (startNode)-[r*1..7]-(endNode) WHERE ALL(rel in relationships(p) WHERE type(rel) in $RELS) AND length(p)<=d WITH DISTINCT p as paths LIMIT $LIMIT RETURN COLLECT(distinct paths)")
    List<Company> getPersonTree(String PERSON, List<String> RELS, int DEPTH, int LIMIT);

}
