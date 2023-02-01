package com.example.new_project_challenge_15.service;

import com.example.new_project_challenge_15.entity.Movie;
import com.example.new_project_challenge_15.entity.Person;
import com.example.new_project_challenge_15.entity.doubleReturn;
import com.example.new_project_challenge_15.entity.edgesModel;
import com.example.new_project_challenge_15.entity.rels.ACTED_IN;
import com.example.new_project_challenge_15.entity.rels.DIRECTED;
import com.example.new_project_challenge_15.repository.movieRepo;
import com.example.new_project_challenge_15.repository.objectRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PersonService {
    @Autowired
    objectRepo oRepo;
    @Autowired
    movieRepo movieRepo;
    public doubleReturn getAllObjects() {
        doubleReturn doubleReturn = new doubleReturn();
        List<Person> list = oRepo.findAll();
        List<Person> movie_p = new ArrayList<>();
        List<Movie> listMovie = movieRepo.getAll();

//        System.out.println(movie_p);
        List<edgesModel> edgesModels = new ArrayList<>();
        for(Person lists : list){
            List<ACTED_IN> lolActed = lists.getActed_ins();
            List<DIRECTED> lolDirected = lists.getDirecteds();
            for(ACTED_IN lols : lolActed){
                edgesModel edgesModel = new edgesModel();
                lols.setId_movie(lols.getMovie().getId());
                lols.setMovie(null);
                edgesModel.setFrom(lists.getId());
                edgesModel.setTo(lols.getId());
                edgesModels.add(edgesModel);
            }
//            for(DIRECTED lolsDirected : lolDirected){
//                edgesModel edgesModel = new edgesModel();
//                edgesModel.setFrom(lists.getId());
//                edgesModel.setTo(lolsDirected.getId());
//                edgesModels.add(edgesModel);
//            }
        }
        for(Movie listM : listMovie){
            Person newPers = new Person();
            newPers.setIdd(listM.getId());
            newPers.setId(null);
            newPers.setReleased(listM.getReleased());
            newPers.setTagline(listM.getTagline());
            newPers.setTitle(listM.getTitle());
//            System.out.println(listM);
            movie_p.add(newPers);
            System.out.println(newPers);
            list.add(newPers);

        }
        doubleReturn.setNodes(list);
        doubleReturn.setEdges(edgesModels);
        System.out.println(edgesModels);
        return doubleReturn;
    }
}
