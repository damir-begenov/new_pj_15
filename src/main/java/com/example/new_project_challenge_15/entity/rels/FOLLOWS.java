package com.example.new_project_challenge_15.entity.rels;

import com.example.new_project_challenge_15.entity.Person;
import org.springframework.data.neo4j.core.schema.*;

@RelationshipProperties
@Node
public class FOLLOWS {
    @Id
    @GeneratedValue
    private Long id;
    @TargetNode
    private PersonWithoutData personWithoutData;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public PersonWithoutData getPersonWithoutData() {
        return personWithoutData;
    }

    public void setPersonWithoutData(PersonWithoutData personWithoutData) {
        this.personWithoutData = personWithoutData;
    }

    @Override
    public String toString() {
        return "FOLLOWS{" +
                "id=" + id +
                ", personWithoutData=" + personWithoutData +
                '}';
    }
}
