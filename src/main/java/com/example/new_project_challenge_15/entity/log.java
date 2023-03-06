package com.example.new_project_challenge_15.entity;

import io.hypersistence.utils.hibernate.type.array.ListArrayType;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
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
    private String nomer;
    private Date data;
    private String nomer2;
    private String nomer3;
    private String nomer4;

    public String getNomer() {
        return nomer;
    }

    public void setNomer(String nomer) {
        this.nomer = nomer;
    }

    public Date getData() {
        return data;
    }

    public void setData(Date data) {
        this.data = data;
    }

    public String getNomer2() {
        return nomer2;
    }

    public void setNomer2(String nomer2) {
        this.nomer2 = nomer2;
    }

    public String getNomer3() {
        return nomer3;
    }

    public void setNomer3(String nomer3) {
        this.nomer3 = nomer3;
    }

    public String getNomer4() {
        return nomer4;
    }

    public void setNomer4(String nomer4) {
        this.nomer4 = nomer4;
    }

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
        return "log{" +
                "date=" + date +
                ", username='" + username + '\'' +
                ", request_body=" + request_body +
                ", limit_=" + limit_ +
                ", depth_=" + depth_ +
                ", nomer='" + nomer + '\'' +
                ", data=" + data +
                ", nomer2='" + nomer2 + '\'' +
                ", nomer3='" + nomer3 + '\'' +
                ", nomer4='" + nomer4 + '\'' +
                ", request_rels=" + request_rels +
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