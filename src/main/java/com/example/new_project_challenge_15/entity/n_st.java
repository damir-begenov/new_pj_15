package com.example.new_project_challenge_15.entity;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.List;

@Node
@AllArgsConstructor
@NoArgsConstructor
public class n_st {
    @Id
    private String IINID;
    private String FIO;
    private String LABEL;
    private String stydyTime;
    @Relationship(type="rel_final", direction = Relationship.Direction.OUTGOING)
    private List<rel_final> rel_finals;

    public String getStydyTime() {
        return stydyTime;
    }

    public void setIINID(String IINID) {
        this.IINID = IINID;
    }

    public void setFIO(String FIO) {
        this.FIO = FIO;
    }

    public void setLABEL(String LABEL) {
        this.LABEL = LABEL;
    }

    public void setStydyTime(String stydyTime) {
        this.stydyTime = stydyTime;
    }

    public void setRel_finals(List<rel_final> rel_finals) {
        this.rel_finals = rel_finals;
    }

    public String getIINID() {
        return IINID;
    }

    public String getFIO() {
        return FIO;
    }

    public String getLABEL() {
        return LABEL;
    }

    public List<rel_final> getRel_finals() {
        return rel_finals;
    }
}
