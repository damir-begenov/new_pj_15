package com.example.new_project_challenge_15.controller;

import com.example.new_project_challenge_15.entity.*;
import com.example.new_project_challenge_15.entity.enums.School;
import com.example.new_project_challenge_15.repository.n_stRepo;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.text.NumberFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
public class NewController {
    private final n_stRepo n_stRepo;
    private final com.example.new_project_challenge_15.repository.node_cRepository node_cRepository;
    private final com.example.new_project_challenge_15.repository.rel_final_repo rel_final_repo;

//    @GetMapping("/{fio}")
//    public Collection<n_st> getfromidd(@PathVariable String fio){
//        return n_stRepo.findByFIO(fio);
//    }
//    @GetMapping("/{str}")
//    public List getBookByTitleContaining(@PathVariable String str) {
//        return rel_final_repo.findByFIO(str);
//    }
    @GetMapping("/alls")
    public List<n_st> getfromiddf(){

        return n_stRepo.getAllUser();
    }
    @GetMapping("/alls/{FIO}")
    public List<n_st> getBYFIO(@PathVariable String FIO){
        return n_stRepo.findByFIO(FIO);
    }

    @GetMapping("/alls/finished")
    public List<n_st> getFinished(){
        return n_stRepo.findFinishedTheSchool();
    }
    @GetMapping("/alls/unfinished")
    public List<n_st> getUnfinshed(){
        return n_stRepo.findDidntFininshed();
    }
    @GetMapping ("/newlink")
    public nodes getNodes() {
        nodes nodes = new nodes();
        School school = new School();
        school.setBIIN("ABBBEAAADGCG");
        List<edges> edges = new ArrayList<>();
        List<n_st> nn = n_stRepo.findBySchool("ABBBEAAADGCG");
        List<students> students = new ArrayList<>();
        for (n_st n : nn) {
            List<rel_final> node = n.getRel_finals();
            rel_final lol = node.get(0);
            students students1 = new students();
            students1.setFIO(n.getFIO());
            students.add(students1);
            nodes.setStudents(students);
            edges edges1 = new edges();
            edges1.setFrom(n.getFIO());
            edges1.setTo(school.getBIIN());
            edges.add(edges1);
            nodes.setEdges(edges);
        }
        nodes.setSchool(school);
        return nodes;
    }

    @GetMapping("/persons")
    public doubleReturn getGraphData() {
        List<n_st> nn = n_stRepo.findBySchool("ABBBEAAADGCG");
        nodeStudentModel school = new nodeStudentModel("School", "ABBBEAAADGCG", true);
        List<nodeStudentModel> nodesToAppend = new ArrayList<>();
        nodesToAppend.add(0, school);
        List<edgesModel> edgesToAppend = new ArrayList<>();
        for (n_st n: nn) {
            nodeStudentModel temp = new nodeStudentModel(n.getFIO(), n.getIINID(), false);
            edgesModel relTemp = new edgesModel(temp.getId(), school.getId());
            nodesToAppend.add(temp);
            edgesToAppend.add(relTemp);
        }
        doubleReturn doubleReturn = new doubleReturn(nodesToAppend, edgesToAppend);
        return doubleReturn;
    }

    // @GetMapping("/{IINID}")
    // public doubleReturn getPersonsGraph(@PathVariable String IINID) {
    //     n_st currentStudent = n_stRepo.getByIINID(IINID);
    //     nodeStudentModel node0 = new nodeStudentModel(currentStudent.getFIO(), IINID, true);
    //     node_c node_c = currentStudent.getRel_finals().get(0).getNode_c();
    //     nodeStudentModel school = new nodeStudentModel(node_c.getCompany(), node_c.getLABEL(), false);
    //     List<nodeStudentModel> nodesToAppend = new ArrayList<>();
    //     nodesToAppend.add(0, node0);
    //     List<edgesModel> edgesToAppend = new ArrayList<>();
    //     for (rel)
    //     return 
    // }


    @GetMapping("/alls/school/{BINID}")
    public SchoolPageEntity getbySchool(@PathVariable String BINID) throws ParseException {
        int finished = 0;
        int unfinished = 0;
        double avg_gpa = 0;
        int length=0;
        List<n_st> n_sts = new ArrayList<>();
        SchoolPageEntity schoolPageEntity = new SchoolPageEntity();
        List<n_st> nn =  n_stRepo.findBySchool(BINID);
        List<Date> dates = new ArrayList<>();
        for(n_st n: nn) {
            List<rel_final> node = n.getRel_finals();
            rel_final lol = node.get(0);
            SimpleDateFormat formatter = new SimpleDateFormat("dd.MM.yyyy");
            String studyTime = null;
            NumberFormat format = NumberFormat.getInstance(Locale.FRANCE);
            Number number = format.parse(lol.getGPA());
            double d = number.doubleValue();
            avg_gpa+=d;
            if (lol.getEnd_date()!="") {
                finished++;
                length++;
            } else {
                unfinished++;
                length++;
            }
            if(lol.getEnd_date()!=""){
                Date afterConvDate = formatter.parse(lol.getStart_date());
                Date afterConvDates = formatter.parse(lol.getEnd_date());
                long difference_In_Time = afterConvDates.getTime() - afterConvDate.getTime();
                long difference_In_Years = (difference_In_Time / (1000l * 60 * 60 * 24 * 365));
                long difference_In_Days = (difference_In_Time / (1000 * 60 * 60 * 24)) % 365;
                studyTime = difference_In_Years + " years, " + difference_In_Days + " days, ";
            }
            n.setStydyTime(studyTime);
            n_sts.add(n);
        }
        schoolPageEntity.setAvgGPA(avg_gpa/(length+1));
        schoolPageEntity.setN_sts(n_sts);
        schoolPageEntity.setFinished(finished);
        schoolPageEntity.setUnfinished(unfinished);
        return schoolPageEntity;
    }
    @GetMapping("/alls/school")
    public List<node_c> getAllSchools(){
        return node_cRepository.getAllSchoolss();
    }


}
