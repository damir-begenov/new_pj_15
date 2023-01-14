//package com.example.new_project_challenge_15.repository;
//
//import com.example.new_project_challenge_15.entity.User;
//import org.springframework.data.neo4j.repository.Neo4jRepository;
//import org.springframework.data.neo4j.repository.query.Query;
//
//public interface UserRepository extends Neo4jRepository<User, String> {
//    @Query("MATCH (n:User) WHERE n.email=~ ('(?i).*'+$email+'.*') RETURN n")
//    User findByEmail(String email);
//}
