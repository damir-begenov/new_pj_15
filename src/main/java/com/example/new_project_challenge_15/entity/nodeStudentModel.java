package com.example.new_project_challenge_15.entity;

import java.util.Set;

public class nodeStudentModel {
    private static int _id = 0;
    private int id;
    private String label;
    private String title;
    private boolean main;
    private String BIN_IIN;

    public nodeStudentModel() {
    }

    public nodeStudentModel(String label, String title, boolean main) {
        this.label = label;
        this.title = title;
        this.main = main;
        this.id = _id++;
    }
    public nodeStudentModel(String label, String title, String BIN_IIN, boolean main) {
        this.label = label;
        this.title = title;
        this.main = main;
        this.id = _id++;
        this.BIN_IIN = BIN_IIN;
    }

    public void setNodeStudentModel(String label, String title, String BIN_IIN, boolean main) {
        this.label = label;
        this.title = title;
        this.main = main;
        this.id = _id++;
        this.BIN_IIN = BIN_IIN;
    }
    public void setNodeStudentModel(String label, String title, String BIN_IIN, boolean main, int id) {
        this.label = label;
        this.title = title;
        this.main = main;
        this.id = id;
        this.BIN_IIN = BIN_IIN;
    }



    public int getId() {
        return id;
    }

    public String getLabel() {
        return label;
    }
    public String getTitle() {
        return title;
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
