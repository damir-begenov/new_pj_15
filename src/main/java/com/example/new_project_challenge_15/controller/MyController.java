package com.example.new_project_challenge_15.controller;

import com.example.new_project_challenge_15.entity.n_st;
import com.example.new_project_challenge_15.entity.rel_final;
import com.example.new_project_challenge_15.repository.node_cRepository;
import com.example.new_project_challenge_15.repository.rel_final_repo;
import com.example.new_project_challenge_15.entity.node_c;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Collection;
import java.util.List;

@Controller
@AllArgsConstructor
public class MyController {

    private final com.example.new_project_challenge_15.repository.n_stRepo n_stRepo;
    private final node_cRepository node_cRepository;
    private final rel_final_repo rel_final_repo;

    @GetMapping("/all")
    public String getAll(Model model) {
        Collection<n_st> n_sts = n_stRepo.getAllUser();
        n_st n_st = n_stRepo.getByIINID("JHAFDBDAACBG").get(0);
        model.addAttribute("n", n_sts);
        return "main";
    }
//    }
//    @GetMapping("/alls")
//    public String getAllj(Model model) {
//        List<rel_final> rel_finals = rel_final_repo.findAll();
//        model.addAttribute("nf",rel_finals);
//        return "mains";
//    }
    @GetMapping("/{str}")
    public String getBookByTitleContainingk(@PathVariable String str,Model model) {
        List<rel_final> rel_finals = rel_final_repo.findByFIO(str);
        List<node_c> node_cs = node_cRepository.getAllUserNodeByFIO(str);
        model.addAttribute("rf",rel_finals);
        model.addAttribute("nc",node_cs);
        return "mains";
    }


//    @GetMapping("/alls")
//    public String getAlls(Model model) {
//        Collection<rel_final> rel_finals = rel_final_repo.finfs();
//        model.addAttribute("rf",rel_finals);
//        return "mains";
//    }

//    @GetMapping
//    public Collection<n_st> getalll(){
//
//        return n_stRepo.getAllUser();
//    }
//    @GetMapping("/{fio}")
//    public Collection<n_st> getfromid(@PathVariable String fio){
//        return n_stRepo.findByFIO(fio);
//    }

}