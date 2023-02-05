package com.example.new_project_challenge_15.repository;

import java.util.List;
import java.util.Map;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.new_project_challenge_15.entity.Person;

@Repository
public interface objectRepo extends Neo4jRepository<Person, Long> {
    // @Query("match (n)-[r]-(m) where id(n) = 512 return n, r, m") NOT WORKING
    @Query("WITH (438) AS id MATCH (startNode) WHERE id(startNode) = id OPTIONAL MATCH p = (startNode)-[*1..2]-(endNode) RETURN COLLECT(DISTINCT p)")
    List<Person> getAll();
    
    // @Query("WITH ($ID) AS id MATCH (startNode) WHERE id(startNode) = id OPTIONAL MATCH p = (startNode)-[*1..1]-(endNode) return COLLECT(DISTINCT p) limit ($LIMIT)")
    // @Query("WITH $id AS id MATCH (startNode) WHERE id(startNode) = id OPTIONAL MATCH p = (startNode)-[*1..2]-(endNode) return p limit $limit")
    @Query("WITH ($ID)  AS id, ($DEPTH) as d MATCH (startNode) WHERE id(startNode) = id OPTIONAL MATCH p = (startNode)-[*1..7]-(endNode)  WHERE length(p)<d return COLLECT(DISTINCT p) limit ($LIMIT)")
    List<Person> getWithFilter(Long ID,int DEPTH, int LIMIT);
    
    @Query("MATCH p=(n)-[r*1..2]-(m) WHERE id(n) = 438 UNWIND relationships(p) AS rel WITH n, m, rel WITH n, m, COLLECT(CASE WHEN type(rel) = 'ACTED_IN' THEN rel END) AS acted_ins, COLLECT(CASE WHEN type(rel) = 'DIRECTED' THEN rel END) AS directeds, COLLECT(CASE WHEN type(rel) = 'PRODUCED' THEN rel END) AS produceds, COLLECT(CASE WHEN type(rel) = 'REVIEWED' THEN rel END) AS revieweds, COLLECT(CASE WHEN type(rel) = 'WROTE' THEN rel END) AS wrotes RETURN {id: id(n), name: n.name, born: n.born, acted_ins: acted_ins, directeds: directeds, produceds: produceds,  wrotes: wrotes} LIMIT 10 ")
    List<Person> getByIdLevelAndLimit(Long ID, Long DEPTH, Long LIMIT);

    @Query("MATCH p=allShortestPaths((a:Person)-[*]-(b:Person)) where id(a)=$ID and id(b)= $SECONDID RETURN COLLECT(DISTINCT p)")
    List<Person> getAllShortestPaths(Long ID, Long SECONDID);
    
    @Query("WITH $ID AS id MATCH (startNode) WHERE id(startNode) = id OPTIONAL MATCH p = (startNode)-[r*1..2]-(endNode) WHERE ALL(rel in relationships(p) WHERE type(rel) in [$REL1, $REL2, $REL3, $REL4, $REL5, $REL6]) RETURN COLLECT(DISTINCT p) LIMIT $LIMIT")
    List<Person> getByRelation(Long ID, String REL1, String REL2, String REL3, String REL4, String REL5, String REL6, int LIMIT);

    
    // @Query("WITH ($ID) AS id MATCH (startNode) WHERE id(startNode) = id OPTIONAL MATCH p = (startNode)-[*1..2]-(endNode) UNWIND nodes(p) AS n WITH n, relationships(p) AS rel, labels(n) AS label WITH  COLLECT(CASE WHEN 'Person' in label THEN n END) AS m, COLLECT(CASE WHEN 'Movie' in label THEN n END) AS i, rel RETURN m, rel, i LIMIT ($LIMIT)") RETURNS persons and movies ase arrays with only one element
    // @Query("WITH 438 AS id, 2 AS depth, 10 AS limit MATCH (startNode) WHERE id(startNode) = id OPTIONAL MATCH p = (startNode)-[*1..2]-(endNode) WITH startNode, relationships(p) AS rels, endNode LIMIT 10 RETURN startNode, rels, endNode")
    // @Query("MATCH path=(n:Person)-[*0..2]-() WHERE id(n) = ($ID) UNWIND relationships(path) AS rel WITH nodes(path) AS nodes, rel RETURN nodes, rel LIMIT ($LIMIT)")
    // @Query("WITH 438 AS id, 2 AS depth, 10 AS limit MATCH (startNode) WHERE id(startNode) = id OPTIONAL MATCH p = (startNode)-[*1..2]-(endNode) WITH relationships(p) AS rels UNWIND rels AS r WITH DISTINCT r LIMIT 10 RETURN startNode(r), r, endNode(r)")
    // @Query("WITH ($ID) AS id MATCH (startNode) WHERE id(startNode) = id OPTIONAL MATCH p = (startNode)-[*1..2]-(endNode) UNWIND nodes(p) AS n WITH n, relationships(p) AS rel, labels(n) AS label WITH  COLLECT(CASE WHEN 'Person' in label THEN n END) AS persons, COLLECT(CASE WHEN 'Movie' in label THEN n END) AS movies, rel UNWIND persons AS m UNWIND movies AS i RETURN m, COLLECT(rel), i LIMIT ($LIMIT)")
    // @Query("MATCH (n) WHERE id(n) = 438 OPTIONAL MATCH (n)-[r]-() WITH n, COLLECT({type: type(r), start: id(startNode(r)), end: endNode(r)}) AS rels RETURN n, rels")
    
    
    // @Query("MATCH (n)-[r]-() WITH n, COLLECT(r) AS rels UNWIND rels AS r WITH n, COLLECT(CASE WHEN type(r) = 'ACTED_IN' THEN r END) AS acted_ins, COLLECT(CASE WHEN type(r) = 'DIRECTED' THEN r END) AS directeds, COLLECT(CASE WHEN type(r) = 'PRODUCED' THEN r END) AS produceds, COLLECT(CASE WHEN type(r) = 'REVIEWED' THEN r END) AS revieweds, COLLECT(CASE WHEN type(r) = 'WROTE' THEN r END) AS wrotes RETURN {id: id(n), name: n.name, born: n.born, acted_ins: acted_ins, directeds: directeds, produceds: produceds, revieweds: revieweds, wrotes: wrotes}")
    
    // @Query("WITH ($ID) AS id MATCH (startNode) WHERE id(startNode) = id OPTIONAL MATCH (startNode)-[r*]->(endNode) return startNode, r, endNode")
    // @Query("WITH ($ID) AS id MATCH (startNode) WHERE id(startNode) = id OPTIONAL MATCH p = (startNode)-[*1..2]-(endNode) UNWIND nodes(p) AS n WITH n, relationships(p) AS rel, labels(n) AS label WITH COLLECT(CASE WHEN 'Person' in label THEN n END) AS persons, COLLECT(CASE WHEN 'Movie' in label THEN n END) AS movies, rel UNWIND persons AS m UNWIND movies AS i RETURN m, rel, i LIMIT ($LIMIT)")
    // @Query("MATCH path=(n:Person)-[*1..2]-() where id(n) = ($ID) RETURN path limit ($LIMIT);")
    // @Query("WITH ($ID) AS id MATCH (startNode) WHERE id(startNode) = id OPTIONAL MATCH p = (startNode)-[*1..2]-(endNode) WITH p, size(nodes(p)) as numberOfNodes WHERE numberOfNodes <= ($LIMIT) RETURN p LIMIT ($LIMIT)")
    
    
    
    // @Query("MATCH (n:Person) WHERE id(n) = 438 OPTIONAL MATCH (n)-[r:ACTED_IN|DIRECTED|PRODUCED|REVIEWED|WROTE|FOLLOWS]->(m) RETURN n, r, m")
    // @Query("MATCH (n:Person) OPTIONAL MATCH (n)-[r]->(m) RETURN id(n) as id, n.name as name, n.born as born, COLLECT(CASE WHEN type(r) = 'ACTED_IN' THEN r END) as acted_ins")
    // @Query("WITH ($ID) AS id MATCH (startNode) WHERE id(startNode) = id OPTIONAL MATCH p = (startNode)-[r]-(endNode) RETURN  COLLECT({startNode:startNode, rel: r, endNode: endNode}) AS data")
    // @Query("match (n)-[r]->(i) where id(n) = ($ID) return n,r,i")
    // List<Person> getAll(Long ID);

    // @Query("MATCH p=(n1:Person)-[*]-() WHERE id(n1) = ($ID) RETURN p LIMIT 4")
    // List<Person> getById(Long ID, int LIMIT);

    // List<Person> getByIdLimitDepth(Long ID, int LIMIT, int DEPTH);
    
    // @Query("WITH ($ID) AS id MATCH (startNode) WHERE id(startNode) = id OPTIONAL MATCH p = (startNode)-[*1..2]-(endNode) RETURN COLLECT(DISTINCT p)")
    // List<Person> getByIdandDepth(Long ID, int DEPTH); //////////////////////////////////////////////////////DEPTH
    // // @Query("MATCH p = allShortestPaths((startNode:Person)-[*]-(endNode)) WHERE id(startNode) = ($ID) and id(endNode) = ($ENDID)  RETURN p")
    // @Query("WITH ($ID) AS id MATCH (startNode), (endNode) WHERE id(startNode) = id and id(endNode) = ($ENDID) OPTIONAL MATCH p = shortestPath((startNode)-[*]-(endNode)) RETURN p")
    // List<Person> getShortestPaths(Long ID, Long ENDID); 
    
    
    // @Query("MATCH (n)-[r]-() WHERE id(n) = 438 WITH n, COLLECT(r) AS rels UNWIND rels AS r WITH n, COLLECT(CASE WHEN type(r) = 'ACTED_IN' THEN r END) AS acted_ins RETURN n, acted_ins")
    // @Query("WITH 438 AS id MATCH (startNode) WHERE id(startNode) = id OPTIONAL MATCH p = (startNode)-[*1..3]-(endNode) RETURN p LIMIT 10")
    // @Query("WITH 438 AS id MATCH (startNode) WHERE id(startNode) = id OPTIONAL MATCH p = (startNode)-[re*1..3]-(endNode) WITH nodes(p) as n, re AS rels UNWIND rels AS r WITH n, COLLECT(CASE WHEN type(r) = 'ACTED_IN' THEN r END) AS acted_ins, COLLECT(CASE WHEN type(r) = 'DIRECTED' THEN r END) AS directeds, COLLECT(CASE WHEN type(r) = 'PRODUCED' THEN r END) AS produceds, COLLECT(CASE WHEN type(r) = 'REVIEWED' THEN r END) AS revieweds, COLLECT(CASE WHEN type(r) = 'WROTE' THEN r END) AS wrotes RETURN n, acted_ins, directeds ORDER BY SIZE(acted_ins) desc")
    // List<Person> getPersonAndRelationships(int i);

    
}
