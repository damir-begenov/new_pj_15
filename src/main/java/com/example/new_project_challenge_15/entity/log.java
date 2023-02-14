package com.example.new_project_challenge_15.entity;

import io.hypersistence.utils.hibernate.type.array.ListArrayType;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "log")
@TypeDef(name = "list-array", typeClass = ListArrayType.class)
public class log implements Serializable {
    private static final long serialVersionUID = 4048798961366546485L;

    @Id
    private LocalDateTime date;

    private String username;
    @Type(type = "list-array")

    private List<String> request_body;
    private Integer limit_;
    private Integer depth_;

    @Type(type = "list-array")
    private List<String> request_rels;

    public List<String> getRequest_rels() {
        return request_rels;
    }

    public void setRequest_rels(List<String> request_rels) {
        this.request_rels = request_rels;
    }

    public Integer getLimit_() {
        return limit_;
    }

    public void setLimit_(Integer limit_) {
        this.limit_ = limit_;
    }

    public Integer getDepth_() {
        return depth_;
    }

    public void setDepth_(Integer depth_) {
        this.depth_ = depth_;
    }

    @Override
    public String toString() {
        return "Log{" +
                "date=" + date +
                ", username='" + username + '\'' +
                ", request_body='" + request_body + '\'' +
                '}';
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<String> getRequest_body() {
        return request_body;
    }

    public void setRequest_body(List<String> request_body) {
        this.request_body = request_body;
    }
}