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
            if (!ids.contains(person.getId())) {
                ids.add(person.getId());
                Nodes currNode = new Nodes(person.getId(), person.getName(), "", person.getBorn());
                nodes.add(currNode);
            }
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
                propertiesModel newprop = new propertiesModel();
                newprop.setName("rating");
                newprop.setValue(""+reviewed.getRating());
                properties.add(0, newprop);
                propertiesModel newprop2 = new propertiesModel();
                newprop2.setName("summary");
                newprop2.setValue(""+reviewed.getSummary());
                properties.add(0, newprop2);
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

    public doubleReturn getByIdLevelAndLimit(Long ID, int DEPTH, int LIMIT) {
        List<Person> db = oRepo.getWithFilter(ID, DEPTH, LIMIT);
        return ConstructDoubleReturn(db);
    }

    public doubleReturn getShortestPaths(Long ID, Long SECONDID) {
        List<Person> db = oRepo.getAllShortestPaths(ID, SECONDID);
        return ConstructDoubleReturn(db);
    }

//     public List<Person> executeQuery(String query) {
//         Session session = Neo4jSessionFactory.getInstance().getNeo4jSession();

// String query = "MATCH (n)-[r*1..2]-(m) WHERE id(n) = 438 " +
//                "WITH n, m, COLLECT(r) AS rels " +
//                "UNWIND rels AS r " +
//                "WITH n, m, " +
//                "COLLECT(CASE WHEN type(r) = 'ACTED_IN' THEN r END) AS acted_ins, " +
//                "COLLECT(CASE WHEN type(r) = 'DIRECTED' THEN r END) AS directeds, " +
//                "COLLECT(CASE WHEN type(r) = 'PRODUCED' THEN r END) AS produceds, " +
//                "COLLECT(CASE WHEN type(r) = 'REVIEWED' THEN r END) AS revieweds, " +
//                "COLLECT(CASE WHEN type(r) = 'WROTE' THEN r END) AS wrotes " +
//                "RETURN {id: id(n), name: n.name, born: n.born, " +
//                "acted_ins: act_ins, directeds: directeds, produceds: produceds, " +
//                "revieweds: revieweds, wrotes: wrotes} " +
//                "LIMIT 10";

// StatementResult result = session.run(query);

// List<Person> persons = new ArrayList<>();
// while (result.hasNext()) {
//   Record record = result.next();
//   Map<String, Object> map = record.get("{id: id(n), name: n.name, born: n.born, acted_ins: act_ins, directeds: directeds, produceds: produceds, revieweds: revieweds, wrotes: wrotes}").asMap();

//   Person person = new Person();
//   person.setId(map.get("id").asLong());
//   person.setName(map.get("name").asString());
//   person.setBorn(map.get("born").asInt());
  
//   List<ACTED_IN> act_ins = (List<ACTED_IN>) map.get("acted_ins");
//   List<DIRECTED> directeds = (List<DIRECTED>) map.get("directeds");
//   List<PRODUCED> produceds = (List<PRODUCED>) map.get("produceds");
//   List<REVIEWED> revieweds = (List<REVIEWED>) map.get("revieweds");
//   List<WROTE> wrotes = (List<WROTE>) map.get("wrotes");
  
//   person.setActed_ins(act_ins);
//   person.setDirecteds(directeds);
//   person.setProduceds(produceds);
//   person.setRevieweds(revieweds);
//   person.setWrotes(wrotes);
  
//   persons.add(person);
// }

// session.close();

// return persons;

//     }
}
