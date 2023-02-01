package com.example.new_project_challenge_15.entity;

import com.example.new_project_challenge_15.entity.rels.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Node;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.List;

@Node
@AllArgsConstructor
@NoArgsConstructor
public class Person {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private Integer born;
    @Relationship(type="ACTED_IN", direction = Relationship.Direction.OUTGOING)
    private List<ACTED_IN> acted_ins;
    @Relationship(type="DIRECTED", direction = Relationship.Direction.OUTGOING)
    private List<DIRECTED> directeds;
    @Relationship(type="PRODUCED", direction = Relationship.Direction.OUTGOING)
    private List<PRODUCED> produceds;
    @Relationship(type="REVIEWED", direction = Relationship.Direction.OUTGOING)
    private List<REVIEWED> revieweds;
    @Relationship(type="WROTE", direction = Relationship.Direction.OUTGOING)
    private List<WROTE> wrotes;


    public List<WROTE> getWrotes() {
        return wrotes;
    }

    public void setWrotes(List<WROTE> wrotes) {
        this.wrotes = wrotes;
    }

    public List<REVIEWED> getRevieweds() {
        return revieweds;
    }

    public void setRevieweds(List<REVIEWED> revieweds) {
        this.revieweds = revieweds;
    }

    public List<PRODUCED> getProduceds() {
        return produceds;
    }

    public void setProduceds(List<PRODUCED> produceds) {
        this.produceds = produceds;
    }

    public List<DIRECTED> getDirecteds() {
        return directeds;
    }

    public void setDirecteds(List<DIRECTED> directeds) {
        this.directeds = directeds;
    }

    public List<ACTED_IN> getActed_ins() {
        return acted_ins;
    }

    public void setActed_ins(List<ACTED_IN> acted_ins) {
        this.acted_ins = acted_ins;
    }

    public String getId() {
        return "actor_"+id;
    }
    public String getName() {
        return name;
    }
    public Integer getBorn() {
        return born;
    }
    public void setId(Long identity) {
        this.id = identity;
    }
    public void setName(String name) {
        this.name = name;
    }
    public void setBorn(Integer born) {
        this.born = born;
    }

    @Override
    public String toString() {
        return "Person{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", born=" + born +
                ", acted_ins=" + acted_ins +
                ", directeds=" + directeds +
                ", produceds=" + produceds +
                ", revieweds=" + revieweds +
                ", wrotes=" + wrotes +
                '}';
    }
}
