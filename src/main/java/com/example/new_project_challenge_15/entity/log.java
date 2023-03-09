package com.example.new_project_challenge_15.entity;

import io.hypersistence.utils.hibernate.type.array.ListArrayType;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;
import org.springframework.data.neo4j.core.schema.Property;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "log")
@TypeDef(name = "list-array", typeClass = ListArrayType.class)
public class log {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDateTime date;

    private String username;
    @Type(type = "list-array")

    private List<String> request_body;



    @Type(type = "list-array")
    private List<String> request_rels;
    private Integer limit_;
    private Integer depth_;
    @Size(max = 20)
    @Column(name = "order_num")
private String order_num;
    @Size(max = 20)
    @Column(name = "order_date")

    private String order_date;
    @Size(max = 20)
    @Column(name = "article_name")

    private String article_name;
    @Size(max = 20)
    @Column(name = "case_num")

    private String case_num;
    @Size(max = 20)
    @Column(name = "checking_name")

    private String checking_name;
    @Size(max = 20)
    @Column(name = "other_reasons")

    private String other_reasons;
    @Size(max = 20)
    @Column(name = "organ_name")

    private String organ_name;
    @Size(max = 20)
    @Column(name = "ruk_name")

    private String ruk_name;
    @Size(max = 20)
    @Column(name = "sphere_name")

    private String sphere_name;
    @Size(max = 20)
    @Column(name = "tematik_name")

    private String tematik_name;

    public LocalDateTime getDate() {
        return date;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getOrder_num() {
        return order_num;
    }

    public void setOrder_num(String order_num) {
        this.order_num = order_num;
    }

    public String getOrder_date() {
        return order_date;
    }

    public void setOrder_date(String order_date) {
        this.order_date = order_date;
    }

    public String getArticle_name() {
        return article_name;
    }

    public void setArticle_name(String article_name) {
        this.article_name = article_name;
    }

    public String getCase_num() {
        return case_num;
    }

    public void setCase_num(String case_num) {
        this.case_num = case_num;
    }

    public String getChecking_name() {
        return checking_name;
    }

    public void setChecking_name(String checking_name) {
        this.checking_name = checking_name;
    }

    public String getOther_reasons() {
        return other_reasons;
    }

    public void setOther_reasons(String other_reasons) {
        this.other_reasons = other_reasons;
    }

    public String getOrgan_name() {
        return organ_name;
    }

    public void setOrgan_name(String organ_name) {
        this.organ_name = organ_name;
    }

    public String getRuk_name() {
        return ruk_name;
    }

    public void setRuk_name(String ruk_name) {
        this.ruk_name = ruk_name;
    }

    public String getSphere_name() {
        return sphere_name;
    }

    public void setSphere_name(String sphere_name) {
        this.sphere_name = sphere_name;
    }

    public String getTematik_name() {
        return tematik_name;
    }

    public void setTematik_name(String tematik_name) {
        this.tematik_name = tematik_name;
    }

    @Override
    public String toString() {
        return "log{" +
                "date=" + date +
                ", username='" + username + '\'' +
                ", request_body=" + request_body +
                ", request_rels=" + request_rels +
                ", limit_=" + limit_ +
                ", depth_=" + depth_ +
                ", order_num='" + order_num + '\'' +
                ", order_date='" + order_date + '\'' +
                ", article_name='" + article_name + '\'' +
                ", case_num='" + case_num + '\'' +
                ", checking_name='" + checking_name + '\'' +
                ", other_reasons='" + other_reasons + '\'' +
                ", organ_name='" + organ_name + '\'' +
                ", ruk_name='" + ruk_name + '\'' +
                ", sphere_name='" + sphere_name + '\'' +
                ", tematik_name='" + tematik_name + '\'' +
                '}';
    }
}