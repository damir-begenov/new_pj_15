package com.example.new_project_challenge_15.repository;

import com.example.new_project_challenge_15.entity.Company;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

import java.util.List;

public interface newCompanyRepo extends Neo4jRepository<Company,Long> {
    @Query("MATCH p=(n:Person)-[]-() RETURN p LIMIT 20")
    List<Company> getCompany();

}