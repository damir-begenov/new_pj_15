package com.example.new_project_challenge_15.entity;

import java.util.Set;

public class nodeStudentModel {
    private static int _id = 0;
    private int id;
    private String name;
    private String labl;
    private String BIN_IIN;
    private boolean main;

    public nodeStudentModel() {
    }

    public nodeStudentModel(String name, String bin_iin, String labl) {
        this.name = name;
        this.labl = labl;
        this.BIN_IIN = bin_iin;
        this.id = _id++;
    }
    public nodeStudentModel(String name, String bin_iin, String labl, boolean main) {
        this.name = name;
        this.labl = labl;
        this.BIN_IIN = bin_iin;
        this.main = main;
        this.id = _id++;
    }

    public void setNodeStudentModel(String name, String bin_iin, String labl, boolean main) {
        this.name = name;
        this.labl = labl;
        this.BIN_IIN = bin_iin;
        this.main = main;
        this.id = _id++;
    }
    public void setNodeStudentModel(String name, String bin_iin, String labl, boolean main, int id) {
        this.name = name;
        this.labl = labl;
        this.BIN_IIN = bin_iin;
        this.main = main;
        this.id = id;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }
    public String getLabl() {
        return labl;
    }
    public static int get_id() {
        return _id;
    }
    public boolean getMain() {
        return main;
    }
    public String getBIN_IIN() {
        return BIN_IIN;
    }
}
