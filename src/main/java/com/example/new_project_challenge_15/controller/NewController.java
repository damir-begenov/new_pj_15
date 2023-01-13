package com.example.new_project_challenge_15.controller;

import com.example.new_project_challenge_15.entity.SchoolPageEntity;
import com.example.new_project_challenge_15.entity.n_st;
import com.example.new_project_challenge_15.entity.node_c;
import com.example.new_project_challenge_15.entity.rel_final;
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
