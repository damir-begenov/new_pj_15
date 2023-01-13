package com.example.new_project_challenge_15.entity;

import org.springframework.data.neo4j.core.schema.*;

@RelationshipProperties
@Node
public class rel_final {
    @Id
    @GeneratedValue
    private Long idd;
    @Property("end_date")
    private String end_date;
    @Property("END_ID")
    private String END_ID;
    @Property("source")
    private String source;
    @Property("start_date")
    private String start_date;
    @Property("START_ID")
    private String START_ID;
    @Property("GPA")
    private String GPA;
    @Property("type")
    private String type;

    @TargetNode
    private com.example.new_project_challenge_15.entity.node_c node_c;

    @Override
    public String toString() {
        return "rel_final{" +
                ", end_date='" + end_date + '\'' +
                ", END_ID='" + END_ID + '\'' +
                ", source='" + source + '\'' +
                ", start_date='" + start_date + '\'' +
                ", START_ID='" + START_ID + '\'' +
                ", type='" + type + '\'' +
                ", node_c=" + node_c +
                '}';
    }

    public void setEnd_date(String end_date) {
        this.end_date = end_date;
    }

    public void setEND_ID(String END_ID) {
        this.END_ID = END_ID;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public void setStart_date(String start_date) {
        this.start_date = start_date;
    }

    public void setSTART_ID(String START_ID) {
        this.START_ID = START_ID;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setNode_c(com.example.new_project_challenge_15.entity.node_c node_c) {
        this.node_c = node_c;
    }

    public String getGPA() {
        return GPA;
    }

    public void setGPA(String GPA) {
        this.GPA = GPA;
    }

    public String getEnd_date() {
        return end_date;
    }

    public String getEND_ID() {
        return END_ID;
    }

    public String getSource() {
        return source;
    }

    public String getStart_date() {
        return start_date;
    }

    public String getSTART_ID() {
        return START_ID;
    }

    public String getType() {
        return type;
    }

    public com.example.new_project_challenge_15.entity.node_c getNode_c() {
        return node_c;
    }
}
