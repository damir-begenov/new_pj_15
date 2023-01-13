package com.example.new_project_challenge_15.entity;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;

@Node
@AllArgsConstructor
@NoArgsConstructor
public class node_c {
    @Id
    private String BINID;
    private String company;
    private String LABEL;


    public String getBINID() {
        return BINID;
    }

    public String getCompany() {
        return company;
    }

    public String getLABEL() {
        return LABEL;
    }

    public void setBINID(String BINID) {
        this.BINID = BINID;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public void setLABEL(String LABEL) {
        this.LABEL = LABEL;
    }

    @Override
    public String toString() {
        return "node_c{" +
                "BINID='" + BINID + '\'' +
                ", company='" + company + '\'' +
                ", LABEL='" + LABEL + '\'' +
                '}';
    }
}
