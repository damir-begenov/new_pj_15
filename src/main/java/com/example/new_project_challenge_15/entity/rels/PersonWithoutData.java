package com.example.new_project_challenge_15.entity.rels;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.List;

@Node
@AllArgsConstructor
@NoArgsConstructor
public class PersonWithoutData {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private Integer born;
    @Relationship(type="FOLLOWS", direction = Relationship.Direction.OUTGOING)
    private List<FOLLOWS> follows;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getBorn() {
        return born;
    }

    public void setBorn(Integer born) {
        this.born = born;
    }

    public List<FOLLOWS> getFollows() {
        return follows;
    }

    public void setFollows(List<FOLLOWS> follows) {
        this.follows = follows;
    }
}
