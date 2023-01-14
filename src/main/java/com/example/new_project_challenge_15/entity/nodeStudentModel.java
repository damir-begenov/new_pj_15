package com.example.new_project_challenge_15.entity;

public class nodeStudentModel {
    private static int _id = 0;
    private int id;
    private String label;
    private String title;
    private boolean main;

    public nodeStudentModel() {
    }

    public nodeStudentModel(String label, String title, boolean main) {
        this.label = label;
        this.title = title;
        this.main = main;
        this.id = _id++;
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
}
