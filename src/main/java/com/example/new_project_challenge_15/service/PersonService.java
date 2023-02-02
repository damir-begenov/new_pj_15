package com.example.new_project_challenge_15.service;

import com.example.new_project_challenge_15.entity.Movie;
import com.example.new_project_challenge_15.entity.Nodes;
import com.example.new_project_challenge_15.entity.Person;
import com.example.new_project_challenge_15.entity.doubleReturn;
import com.example.new_project_challenge_15.entity.edgesModel;
import com.example.new_project_challenge_15.entity.propertiesModel;
import com.example.new_project_challenge_15.entity.relationModel;
import com.example.new_project_challenge_15.entity.rels.*;
import com.example.new_project_challenge_15.repository.movieRepo;
import com.example.new_project_challenge_15.repository.objectRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.management.relation.Relation;

@Service
public class PersonService {
    @Autowired
    objectRepo oRepo;
    @Autowired
    movieRepo movieRepo;

    private doubleReturn ConstructDoubleReturn(List<Person> db) {
        List<Nodes> nodes = new ArrayList<>();
        List<relationModel> edges = new ArrayList<>();
        List<Long> ids = new ArrayList<>();
        for (Person person : db) {
            ids.add(person.getId());
            Nodes currNode = new Nodes(person.getId(), person.getName(), "", person.getBorn());
            nodes.add(currNode);
            List<ACTED_IN> acted_INs = person.getActed_ins();
            for (ACTED_IN acted : acted_INs) {
                List<propertiesModel> properties = new ArrayList<>();
                for (String role: acted.getRoles()) {
                    propertiesModel property = new propertiesModel();
                    property.setName("role");
                    property.setValue(role);
                    properties.add(property);
                }
                relationModel currRel = new relationModel(person.getId(), acted.getMovie().getId(), properties);
                currRel.setType("acted_in");
                edges.add(currRel);
                if (!ids.contains(acted.getMovie().getId())) {
                    ids.add(acted.getMovie().getId());
                    Nodes currMovie = new Nodes(acted.getMovie().getId(), acted.getMovie().getTitle(), acted.getMovie().getTagline(), acted.getMovie().getReleased());
                    nodes.add(currMovie);
                }
            }
            List<DIRECTED> directeds = person.getDirecteds();
            for (DIRECTED directed : directeds) {
                List<propertiesModel> properties = new ArrayList<>();
                relationModel currRel = new relationModel(person.getId(), directed.getMovie().getId(), properties);
                currRel.setType("directed");
                edges.add(currRel);
                if (!ids.contains(directed.getMovie().getId())) {
                    ids.add(directed.getMovie().getId());
                    Nodes currMovie = new Nodes(directed.getMovie().getId(), directed.getMovie().getTitle(), directed.getMovie().getTagline(), directed.getMovie().getReleased());
                    nodes.add(currMovie);
                }
            }
            List<PRODUCED> produceds = person.getProduceds();
            for (PRODUCED produced : produceds) {
                List<propertiesModel> properties = new ArrayList<>();
                relationModel currRel = new relationModel(person.getId(), produced.getMovie().getId(), properties);
                currRel.setType("produced");
                edges.add(currRel);
                if (!ids.contains(produced.getMovie().getId())) {
                    ids.add(produced.getMovie().getId());
                    Nodes currMovie = new Nodes(produced.getMovie().getId(), produced.getMovie().getTitle(), produced.getMovie().getTagline(), produced.getMovie().getReleased());
                    nodes.add(currMovie);
                }
            }
            List<REVIEWED> revieweds = person.getRevieweds();
            for (REVIEWED reviewed : revieweds) {
                List<propertiesModel> properties = new ArrayList<>();
                relationModel currRel = new relationModel(person.getId(), reviewed.getMovie().getId(), properties);
                currRel.setType("reviewed");
                edges.add(currRel);
                if (!ids.contains(reviewed.getMovie().getId())) {
                    ids.add(reviewed.getMovie().getId());
                    Nodes currMovie = new Nodes(reviewed.getMovie().getId(), reviewed.getMovie().getTitle(), reviewed.getMovie().getTagline(), reviewed.getMovie().getReleased());
                    nodes.add(currMovie);
                }
            }
            List<WROTE> wrotes = person.getWrotes();
            for (WROTE wrote : wrotes) {
                List<propertiesModel> properties = new ArrayList<>();
                relationModel currRel = new relationModel(person.getId(), wrote.getMovie().getId(), properties);
                currRel.setType("wrote");
                edges.add(currRel);
                if (!ids.contains(wrote.getMovie().getId())) {
                    ids.add(wrote.getMovie().getId());
                    Nodes currMovie = new Nodes(wrote.getMovie().getId(), wrote.getMovie().getTitle(), wrote.getMovie().getTagline(), wrote.getMovie().getReleased());
                    nodes.add(currMovie);
                }
            }
            List<FOLLOWS> follows = person.getFollows();
            for (FOLLOWS follows1 : follows) {
                List<propertiesModel> properties = new ArrayList<>();
                relationModel currRel = new relationModel(person.getId(), follows1.getPerson().getId(), properties);
                currRel.setType("follows");
                edges.add(currRel);

            }
        }
        doubleReturn doubleReturn = new doubleReturn(nodes, edges);
        return doubleReturn;
    }

    public doubleReturn getById(Long id) {
        List<Person> db  = oRepo.getById(id);
        return ConstructDoubleReturn(db);
    }

    public doubleReturn getAllPersons() {
        List<Person> db  = oRepo.findAll();
        return ConstructDoubleReturn(db);
    }
}
