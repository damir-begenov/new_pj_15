package com.example.new_project_challenge_15.entity.rels;

import com.example.new_project_challenge_15.entity.Movie;
import lombok.Data;
import org.springframework.data.neo4j.core.schema.*;

import java.util.Arrays;

@RelationshipProperties
@Node
@Data
public class ACTED_IN {
    @Id
    @GeneratedValue
    private Long id;
    private String[] roles;
    @TargetNode
    private Movie movie;
    private Long id_movie;

    public String getId_movie() {
        return "movie_id_" + id_movie;
    }

    public void setId_movie(Long id_movie) {
        this.id_movie = id_movie;
    }

    public String getId() {
        return "acted_in_"+id;
    }

    public void setIdd(Long id) {
        this.id= id;
    }

    public String[] getRoles() {
        return roles;
    }

    public void setRoles(String[] roles) {
        this.roles = roles;
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
