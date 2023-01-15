package com.example.new_project_challenge_15.repository;

import com.example.new_project_challenge_15.entity.rel_final;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

import java.util.List;

public interface rel_final_repo extends Neo4jRepository<rel_final,Long> {
    @Query("MATCH (u:node_c)<-[r:rel_final]-(m:n_st) WHERE m.FIO=~ ('(?i).*'+$str+'.*') RETURN r{.END_ID, .START_ID, .end_date, .source, .type, .start_date}")
    List<rel_final> findByFIO(String str);

    @Query("MATCH (u:node_c)<-[r:rel_final]-(m:n_st) where m.IINID=~($IINID) RETURN r{.END_ID, .START_ID, .end_date, .source, .type, .start_date}")
    List<rel_final> findRelatioFinals(String IINID);

    @Query("MATCH (u:node_c)<-[r:rel_final]-(m:n_st) RETURN r{.END_ID, .START_ID, .end_date, .source, .type, .start_date}")
    List<rel_final> findAllRelations();

}

