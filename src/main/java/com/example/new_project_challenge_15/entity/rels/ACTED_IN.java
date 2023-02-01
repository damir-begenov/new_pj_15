package com.example.new_project_challenge_15.entity.rels;

import com.example.new_project_challenge_15.entity.Movie;
import org.springframework.data.neo4j.core.schema.*;

import java.util.Arrays;

@RelationshipProperties
@Node
public class ACTED_IN {
    @Id
    @GeneratedValue
    private Long id;
    private String[] roles;
    @TargetNode
    private Movie movie;

    public Long getIdd() {
        return id;
    }

    public void setIdd(Long idd) {
        this.id= idd;
    }

    public String[] getRoles() {
        return roles;
    }

    public void setRoles(String[] roles) {
        this.roles = roles;
    }

    public Movie getMovie() {
        return movie;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }

    @Override
    public String toString() {
        return "ACTED_IN{" +
                "id=" + id +
                ", roles=" + Arrays.toString(roles) +
                ", movie=" + movie +
                '}';
    }
}
