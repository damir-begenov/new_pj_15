package com.example.new_project_challenge_15.repository;

import com.example.new_project_challenge_15.entity.n_st;
import com.example.new_project_challenge_15.entity.node_c;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

import java.util.List;

public interface n_stRepo extends Neo4jRepository<n_st,String> {
    @Query("MATCH (u:node_c)<-[r:rel_final]-(m:n_st) RETURN m,u,r")
    List<n_st> getAllUser();

    @Query("MATCH (u:node_c)<-[r:rel_final]-(m:n_st) WHERE m.FIO=~ ('(?i).*'+'(?i)'+$FIO+'.*') or " +
            "m.IINID=~ ('(?i)'+$FIO+'.*') RETURN m,u,r")
    List<n_st> findByFIO(String FIO);

    @Query("MATCH (u:node_c)<-[r:rel_final]-(m:n_st) RETURN  distinct u{.BINID},r{} limit 40")
    List<n_st> findAllSchool();

    @Query("MATCH (u:node_c)<-[r:rel_final]-(m:n_st) WHERE r.end_date<>'' RETURN m,u,r")
    List<n_st> findFinishedTheSchool();
    @Query("MATCH (u:node_c)<-[r:rel_final]-(m:n_st) WHERE r.end_date='' RETURN m,u,r")
    List<n_st> findDidntFininshed();


    @Query("MATCH (u:node_c)<-[r:rel_final]-(m:n_st) WHERE u.BINID=~ ($BINID)  RETURN m,u,r")
    List<n_st> findBySchool(String BINID);

    @Query("MATCH (u:node_c)<-[r:rel_final]-(m:n_st) WHERE m.IINID=~ ('(?i)'+$IINID+'.*') RETURN m, u, r")
    n_st getByIINID(String IINID);
}
