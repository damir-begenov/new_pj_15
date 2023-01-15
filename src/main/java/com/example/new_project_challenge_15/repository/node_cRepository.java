package com.example.new_project_challenge_15.repository;

import com.example.new_project_challenge_15.entity.node_c;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

import java.util.List;

public interface node_cRepository extends Neo4jRepository<node_c,String> {
    @Query("MATCH (u:node_c)<-[r:rel_final]-(m:n_st) WHERE m.FIO=~ ('(?i).*'+$str+'.*') RETURN u{.BINID, .LABEL , .company}")
    List<node_c> getAllUserNodeByFIO(String str);

    @Query("match (n:node_c) return n")
    List<node_c> getAllSchoolss();

    @Query("MATCH (u:node_c)<-[r:rel_final]-(m:n_st) WHERE u.BINID=~ ($BINID)  RETURN u")
    List<node_c> getByBiniID(String BINID);
}
