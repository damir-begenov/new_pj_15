package com.example.new_project_challenge_15.entity;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
public class SchoolPageEntity {
    double avgGPA;
    int finished;
    int unfinished;
    List<n_st> n_sts;

    public void setAvgGPA(double avgGPA) {
        this.avgGPA = avgGPA;
    }

    public double getAvgGPA() {
        return avgGPA;
    }

    public void setFinished(int finished) {
        this.finished = finished;
    }

    public void setUnfinished(int unfinished) {
        this.unfinished = unfinished;
    }

    public void setN_sts(List<n_st> n_sts) {
        this.n_sts = n_sts;
    }

    public int getFinished() {
        return finished;
    }

    public int getUnfinished() {
        return unfinished;
    }

    public List<n_st> getN_sts() {
        return n_sts;
    }
}
