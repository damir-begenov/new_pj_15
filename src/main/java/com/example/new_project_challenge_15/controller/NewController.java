package com.example.new_project_challenge_15.controller;

import com.example.new_project_challenge_15.entity.*;
import com.example.new_project_challenge_15.repository.n_stRepo;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
public class NewController {
    private final n_stRepo n_stRepo;
    private final com.example.new_project_challenge_15.repository.node_cRepository node_cRepository;
    private final com.example.new_project_challenge_15.repository.rel_final_repo rel_final_repo;

    @GetMapping("/alltest/{IIN}/{date}")
    public doubleReturn getByDateAndIIN(@PathVariable String IIN, @PathVariable String date) throws ParseException{
        List<n_st> persons = n_stRepo.findByIINIDandDate(IIN, date);
        List<nodeStudentModel> nodesToAppend = new ArrayList<>();
        List<edgesModel> edgesToAppend = new ArrayList<>();
        List<String> BINs = new ArrayList<>();
        List<String> IINs = new ArrayList<>();
        // List<node_c> localCompanies = new ArrayList<>(); Можно добавить что бы поиск был быстрее но хуй знает пока вдруг не понадобится
        for (n_st person: persons) {
            nodeStudentModel node = new nodeStudentModel();
            if (!IINs.contains(person.getIINID())) {
                node.setNodeStudentModel(person.getFIO(), person.getIINID(), person.getLABEL(), false);
                IINs.add(person.getIINID());
                nodesToAppend.add(node);
            } else {
                for (int i=0; i<IINs.size(); i++) {
                    if (nodesToAppend.get(i).getBIN_IIN()==person.getIINID()) {
                        node.setNodeStudentModel(nodesToAppend.get(i).getName(),nodesToAppend.get(i).getBIN_IIN(),nodesToAppend.get(i).getLabl(), false, nodesToAppend.get(i).getId());
                    }
                }
            }
            List<rel_final> relations = rel_final_repo.findRelatioFinals(person.getIINID());
            for (rel_final relation: relations) {
                String start_date = relation.getStart_date();
                String end_date = relation.getEnd_date();
                DateFormat formatter = new SimpleDateFormat("dd.mm.yyyy");
                Date date_1 = formatter.parse(start_date);
                Date date_2;
                if(end_date==""){
                    date_2 = null;
                }
                else {
                    date_2 = formatter.parse(end_date);
                }
                String bin = relation.getEND_ID();
                if (BINs.contains(bin)) {
                    for (int i=0; i<BINs.size(); i++) {
                        if (nodesToAppend.get(i).getBIN_IIN().equals(bin)) {
                            edgesModel edge = new edgesModel(node.getId(), nodesToAppend.get(i).getId(),  start_date, end_date);
                            edgesToAppend.add(edge);
                            break;
                        }
                    }
                } else {
                    node_c compNode_c = node_cRepository.getByBiniID(bin).get(0);
                    nodeStudentModel company = new nodeStudentModel(compNode_c.getCompany(), compNode_c.getBINID(), compNode_c.getLABEL(), true);
                    nodesToAppend.add(0, company);
                    edgesModel edge = new edgesModel(node.getId(), company.getId());
                    BINs.add(bin);
                    edgesToAppend.add(edge);
                    // localCompanies.add(0, compNode_c);
                }
            }
        }

        doubleReturn doubleReturn = new doubleReturn(nodesToAppend, edgesToAppend);
        return doubleReturn;
    }
    @GetMapping("/connection/{IINID}/{dateOne}")
    public doubleReturn findByIINIDandDate(@PathVariable String IINID, @PathVariable String dateOne) throws ParseException{
        List<n_st> persons = n_stRepo.findByIINIDandDate(IINID, dateOne);
        List<nodeStudentModel> nodesToAppend = new ArrayList<>();
        List<edgesModel> edgesToAppend = new ArrayList<>();
        List<String> BINs = new ArrayList<>();
        List<String> IINs = new ArrayList<>();
        // List<node_c> localCompanies = new ArrayList<>(); Можно добавить что бы поиск был быстрее но хуй знает пока вдруг не понадобится
        for (n_st person: persons) {
            nodeStudentModel node = new nodeStudentModel();
            if (!IINs.contains(person.getIINID())) {
                node.setNodeStudentModel(person.getFIO(), person.getIINID(), person.getLABEL(), false);
                IINs.add(person.getIINID());
                nodesToAppend.add(node);
            } else {
                for (int i=0; i<IINs.size(); i++) {
                    if (nodesToAppend.get(i).getBIN_IIN()==person.getIINID()) {
                        node.setNodeStudentModel(nodesToAppend.get(i).getName(),nodesToAppend.get(i).getBIN_IIN(),nodesToAppend.get(i).getLabl(), false, nodesToAppend.get(i).getId());
                    }
                }
            }
            List<rel_final> relations = rel_final_repo.findRelatioFinals(person.getIINID());
            for (rel_final relation: relations) {
                String bin = relation.getEND_ID();
                String start_date = relation.getStart_date();
                String end_date = relation.getEnd_date();
                DateFormat formatter = new SimpleDateFormat("dd.mm.yyyy");
                Date date_1 = formatter.parse(start_date);
                Date date_2;
                if(end_date==""){
                    date_2 = null;
                }
                else {
                    date_2 = formatter.parse(end_date);
                }
                if (BINs.contains(bin)) {
                    for (int i=0; i<BINs.size(); i++) {
                        if (nodesToAppend.get(i).getBIN_IIN().equals(bin)) {
                            edgesModel edge = new edgesModel(node.getId(), nodesToAppend.get(i).getId(), start_date, end_date);
                            edgesToAppend.add(edge);
                            break;
                        }
                    }
                } else {
                    node_c compNode_c = node_cRepository.getByBiniID(bin).get(0);
                    nodeStudentModel company = new nodeStudentModel(compNode_c.getCompany(), compNode_c.getBINID(), compNode_c.getLABEL(), true);
                    nodesToAppend.add(0, company);
                    edgesModel edge = new edgesModel(node.getId(), company.getId());
                    BINs.add(bin);
                    edgesToAppend.add(edge);
                    // localCompanies.add(0, compNode_c);
                }
            }
        }

        doubleReturn doubleReturn = new doubleReturn(nodesToAppend, edgesToAppend);
        return doubleReturn;
    }

    @GetMapping("/double/{OneIIN}/{SecIIN}")
    public doubleReturn findBetweenTwo(@PathVariable String OneIIN, @PathVariable String SecIIN) throws ParseException{
        List<n_st> persons = new ArrayList<>();
        try {
            persons = n_stRepo.findBetweenTwo(OneIIN, SecIIN);
        }
          catch(Exception e) {
            // List<String> BINs = new ArrayList<>();
            System.out.println(e);
            List<String> IINs = new ArrayList<>();
            n_st peron = n_stRepo.findByIINID(OneIIN).get(0);
            persons.add(peron);
            n_st peron2 = n_stRepo.findByIINID(SecIIN).get(0);
            persons.add(peron2);
            List<nodeStudentModel> nodesToAppend = new ArrayList<>();
            List<edgesModel> edgesToAppend = new ArrayList<>();
            for (n_st person: persons) {
                nodeStudentModel node = new nodeStudentModel();
                if (!IINs.contains(person.getIINID())) {
                    node.setNodeStudentModel(person.getFIO(), person.getIINID(), person.getLABEL(), false);
                    IINs.add(person.getIINID());
                    nodesToAppend.add(node);
                } else {
                    for (int i=0; i<IINs.size(); i++) {
                        if (nodesToAppend.get(i).getBIN_IIN()==person.getIINID()) {
                            node.setNodeStudentModel(nodesToAppend.get(i).getName(),nodesToAppend.get(i).getBIN_IIN(),nodesToAppend.get(i).getLabl(), false, nodesToAppend.get(i).getId());
                        }
                    }
                }
            }
            doubleReturn doubleReturn = new doubleReturn(nodesToAppend, edgesToAppend);
            return doubleReturn;
        }
        List<nodeStudentModel> nodesToAppend = new ArrayList<>();
        List<edgesModel> edgesToAppend = new ArrayList<>();
        List<String> BINs = new ArrayList<>();
        List<String> IINs = new ArrayList<>();
        // List<node_c> localCompanies = new ArrayList<>(); Можно добавить что бы поиск был быстрее но хуй знает пока вдруг не понадобится
        for (n_st person: persons) {
            nodeStudentModel node = new nodeStudentModel();
            if (!IINs.contains(person.getIINID())) {
                node.setNodeStudentModel(person.getFIO(), person.getIINID(), person.getLABEL(), false);
                IINs.add(person.getIINID());
                nodesToAppend.add(node);
            } else {
                for (int i=0; i<IINs.size(); i++) {
                    if (nodesToAppend.get(i).getBIN_IIN()==person.getIINID()) {
                        node.setNodeStudentModel(nodesToAppend.get(i).getName(),nodesToAppend.get(i).getBIN_IIN(),nodesToAppend.get(i).getLabl(), false, nodesToAppend.get(i).getId());
                    }
                }
            }
            List<rel_final> relations = rel_final_repo.findRelatioFinals(person.getIINID());
            for (rel_final relation: relations) {
                String bin = relation.getEND_ID();
                String start_date = relation.getStart_date();
                String end_date = relation.getEnd_date();
                SimpleDateFormat formatter = new SimpleDateFormat("dd.MM.yyyy");
                if (BINs.contains(bin)) {
                    for (int i=0; i<BINs.size(); i++) {
                        if (nodesToAppend.get(i).getBIN_IIN().equals(bin)) {
                            edgesModel edge = new edgesModel(node.getId(), nodesToAppend.get(i).getId(),start_date,end_date);
                            edgesToAppend.add(edge);
                            break;
                        }
                    }
                } else {
                    node_c compNode_c = node_cRepository.getByBiniID(bin).get(0);
                    nodeStudentModel company = new nodeStudentModel(compNode_c.getCompany(), compNode_c.getBINID(), compNode_c.getLABEL(), true);
                    nodesToAppend.add(0, company);
                    edgesModel edge = new edgesModel(node.getId(), company.getId(),start_date,end_date);
                    BINs.add(bin);
                    edgesToAppend.add(edge);
                    // localCompanies.add(0, compNode_c);
                }
            }
        }

        doubleReturn doubleReturn = new doubleReturn(nodesToAppend, edgesToAppend);
        return doubleReturn;
    }

    

    @GetMapping("/connection/{IIN}")
    public doubleReturn getRelation(@PathVariable String IIN) throws ParseException{
        List<n_st> persons = n_stRepo.getALL(IIN, "rel_final");
        List<nodeStudentModel> nodesToAppend = new ArrayList<>();
        List<edgesModel> edgesToAppend = new ArrayList<>();
        List<String> BINs = new ArrayList<>();
        List<String> IINs = new ArrayList<>();
        // List<node_c> localCompanies = new ArrayList<>(); Можно добавить что бы поиск был быстрее но хуй знает пока вдруг не понадобится
        for (n_st person: persons) {
            nodeStudentModel node = new nodeStudentModel();
            if (!IINs.contains(person.getIINID())) {
                node.setNodeStudentModel(person.getFIO(), person.getIINID(), person.getLABEL(), false);
                IINs.add(person.getIINID());
                nodesToAppend.add(node);
            } else {
                for (int i=0; i<IINs.size(); i++) {
                    if (nodesToAppend.get(i).getBIN_IIN()==person.getIINID()) {
                        node.setNodeStudentModel(nodesToAppend.get(i).getName(),nodesToAppend.get(i).getBIN_IIN(),nodesToAppend.get(i).getName(), false, nodesToAppend.get(i).getId());
                    }
                }
            }
            List<rel_final> relations = rel_final_repo.findRelatioFinals(person.getIINID());
            
            for (rel_final relation: relations) {
                String bin = relation.getEND_ID();
                String start_date = relation.getStart_date();
                String end_date = relation.getEnd_date();
                if (BINs.contains(bin)) {
                    for (int i=0; i<BINs.size(); i++) {
                        if (nodesToAppend.get(i).getBIN_IIN().equals(bin)) {
                            edgesModel edge = new edgesModel(node.getId(), nodesToAppend.get(i).getId(),start_date,end_date);
                            edgesToAppend.add(edge);
                            break;
                        }
                    }
                } else {
                    node_c compNode_c = node_cRepository.getByBiniID(bin).get(0);
                    nodeStudentModel company = new nodeStudentModel(compNode_c.getCompany(), compNode_c.getBINID(), compNode_c.getLABEL(), true);
                    nodesToAppend.add(0, company);
                    edgesModel edge = new edgesModel(node.getId(), company.getId(),start_date,end_date);
                    BINs.add(bin);
                    edgesToAppend.add(edge);
                    // localCompanies.add(0, compNode_c);
                }
            }
        }

        doubleReturn doubleReturn = new doubleReturn(nodesToAppend, edgesToAppend);
        return doubleReturn;
    }
    // @GetMapping("/getjson/{IIN}") 
    // public List<String> GetJSON(@PathVariable String IIN) {

    // }

   
//     @GetMapping("/persons")
//     public doubleReturn getGraphData() {
//         List<n_st> nn = n_stRepo.findBySchool("ABBBEAAADGCG");
//         nodeStudentModel school = new nodeStudentModel("School", "ABBBEAAADGCG", true);
//         List<nodeStudentModel> nodesToAppend = new ArrayList<>();
//         nodesToAppend.add(0, school);
//         List<edgesModel> edgesToAppend = new ArrayList<>();
//         for (n_st n: nn) {
//             nodeStudentModel temp = new nodeStudentModel(n.getFIO(), n.getIINID(), false);
//             edgesModel relTemp = new edgesModel(temp.getId(), school.getId());
//             nodesToAppend.add(temp);
//             edgesToAppend.add(relTemp);
//         }
//         doubleReturn doubleReturn = new doubleReturn(nodesToAppend, edgesToAppend);
//         return doubleReturn;
//         // List<nodeStudentModel> nodesToAppend = new ArrayList<>();
//         // List<edgesModel> edgesToAppend = new ArrayList<>();
//         // List<n_st> persons = n_stRepo.getAllUser();
//         // List<String> binids = new ArrayList<>();
//         // for (n_st person: persons) {
//         //     nodeStudentModel thisPer = new nodeStudentModel(person.getFIO(), person.getIINID(), false);
//         //     nodesToAppend.add(thisPer);
//         //     List<rel_final> relations = person.getRel_finals();
//         //     for (rel_final relation: relations) {
//         //         String BIN = relation.getNode_c().getBINID();
//         //         node_c curNode_c = node_cRepository.getByBiniID(BIN).get(0);
//         //         System.out.println(curNode_c.getBINID());
//         //         nodeStudentModel curSchool = new nodeStudentModel(curNode_c.getCompany(), curNode_c.getLABEL(), false);
//         //         if(binids.contains(BIN)){
//         //         }else {
//         //             nodesToAppend.add(curSchool);
//         //             binids.add(BIN);
//         //         }
//         //         edgesModel edge = new edgesModel(thisPer.getId(), curSchool.getId());
//         //         edgesToAppend.add(edge);
//         //     }
//         // }
//         // doubleReturn result = new doubleReturn(nodesToAppend, edgesToAppend);
//         // return result;
//     }
//     // @GetMapping("/persons/school/{BINID}")
//     // public doubleReturn getGraphDatass(@PathVariable String BINID) {
//     //     List<n_st> nn = n_stRepo.findBySchool(BINID);
//     //     nodeStudentModel school = new nodeStudentModel("School", BINID, true);
//     //     List<nodeStudentModel> nodesToAppend = new ArrayList<>();
//     //     nodesToAppend.add(0, school);
//     //     List<edgesModel> edgesToAppend = new ArrayList<>();
//     //     for (n_st n: nn) {
//     //         nodeStudentModel temp = new nodeStudentModel(n.getFIO(), n.getIINID(), false);
//     //         edgesModel relTemp = new edgesModel(temp.getId(), school.getId());
//     //         nodesToAppend.add(temp);
//     //         edgesToAppend.add(relTemp);
//     //     }
//     //     doubleReturn doubleReturn = new doubleReturn(nodesToAppend, edgesToAppend);
//     //     return doubleReturn;
//     // }
//     @GetMapping("/test")
//     public doubleReturn fsd(){
//         nodeStudentModel school = new nodeStudentModel("School", "kromtau", true);
//         nodeStudentModel school1 = new nodeStudentModel("School1", "Aktobe", true);
//         List<nodeStudentModel> nodesToAppend = new ArrayList<>();
//         List<edgesModel> edgesToAppend = new ArrayList<>();
//         nodeStudentModel temp = new nodeStudentModel("damir", "04", false);
//         nodeStudentModel temp1 = new nodeStudentModel("rembo", "03", false);
//         edgesModel relTemp = new edgesModel(temp.getId(), school.getId());
//         edgesModel relTemp1 = new edgesModel(temp1.getId(), school.getId());
//         edgesModel relTemp2 = new edgesModel(temp.getId(), school1.getId());
//         nodesToAppend.add(temp);
//         nodesToAppend.add(temp1);
//         nodesToAppend.add(school);
//         nodesToAppend.add(school1);
//         edgesToAppend.add(relTemp);
//         edgesToAppend.add(relTemp1);
//         edgesToAppend.add(relTemp2);
//         doubleReturn doubleReturn = new doubleReturn();
//         doubleReturn.setNodes(nodesToAppend);
//         doubleReturn.setEdges(edgesToAppend);
//         return doubleReturn;
//     }

//     @GetMapping("/whole")
//     public doubleReturn getRvery() {
//         List<nodeStudentModel> nodesToAppend = new ArrayList<>();
//         List<edgesModel> edgesToAppend = new ArrayList<>();
//         List<n_st> persons = n_stRepo.getAllUser();
//         List<String> binids = new ArrayList<>();
//         for (n_st person: persons) {
//             nodeStudentModel thisPer = new nodeStudentModel(person.getFIO(), person.getIINID(), false);
//             nodesToAppend.add(thisPer);
//             List<rel_final> relations = person.getRel_finals();
//             for (rel_final relation: relations) {
//                 String BIN = relation.getNode_c().getBINID();
//                 node_c curNode_c = node_cRepository.getByBiniID(BIN).get(0);
//                 nodeStudentModel curSchool = new nodeStudentModel(curNode_c.getCompany(), curNode_c.getLABEL(), false);
//                 if(binids.contains(BIN)){
//                 }else {
//                     nodesToAppend.add(0, curSchool);
//                     binids.add(BIN);
//                 }
//                 edgesModel edge = new edgesModel(thisPer.getId(), curSchool.getId());
//                 edgesToAppend.add(edge);
//             }
//         }
//         doubleReturn result = new doubleReturn(nodesToAppend, edgesToAppend);
//         return result;
//     }

//     @GetMapping("/personss")
//     public  doubleReturn getGraphDatas() {
//         List<n_st> n_sts = n_stRepo.getAllUser();
//         List<nodeStudentModel> nodesToAppend = new ArrayList<>();
//         List<edgesModel> edgesToAppend = new ArrayList<>();
//         List<String> schools = new ArrayList<>();
//         List<nodeStudentModel> tempTest = new ArrayList<>();
//         for(n_st nSt : n_sts){
//           List<rel_final>  rel_finals =  nSt.getRel_finals();
//           rel_final rel_final = rel_finals.get(0);
//           rel_final.getNode_c().getBINID();
//           if(schools.contains(rel_final.getNode_c().getBINID())){

//           }else {
//               schools.add(rel_final.getNode_c().getBINID());
//           }
//         }
//         for(String sch : schools){
//         List<n_st> nn = n_stRepo.findBySchool(sch);
//         nodeStudentModel school = new nodeStudentModel("School", sch, true);
//         nodesToAppend.add(0, school);
//         for (n_st n: nn) {
//             nodeStudentModel temp = new nodeStudentModel(n.getFIO(), n.getIINID(), false);
//             if(tempTest.contains(temp)){
//             }
//             else{
//                 tempTest.add(temp);
//                 nodesToAppend.add(temp);
//         }
//         edgesModel relTemp = new edgesModel(temp.getId(), school.getId());
//         edgesToAppend.add(relTemp);
//     }}
//         doubleReturn doubleReturn = new doubleReturn(nodesToAppend, edgesToAppend);
//         return doubleReturn;
// }


//     @GetMapping("/alls/school/{BINID}")
//     public SchoolPageEntity getbySchool(@PathVariable String BINID) throws ParseException {
//         int finished = 0;
//         int unfinished = 0;
//         double avg_gpa = 0;
//         int length=0;
//         List<n_st> n_sts = new ArrayList<>();
//         SchoolPageEntity schoolPageEntity = new SchoolPageEntity();
//         List<n_st> nn =  n_stRepo.findBySchool(BINID);
//         List<Date> dates = new ArrayList<>();
//         for(n_st n: nn) {
//             List<rel_final> node = n.getRel_finals();
//             rel_final lol = node.get(0);
//             SimpleDateFormat formatter = new SimpleDateFormat("dd.MM.yyyy");
//             String studyTime = null;
//             NumberFormat format = NumberFormat.getInstance(Locale.FRANCE);
//             Number number = format.parse(lol.getGPA());
//             double d = number.doubleValue();
//             avg_gpa+=d;
//             if (lol.getEnd_date()!="") {
//                 finished++;
//                 length++;
//             } else {
//                 unfinished++;
//                 length++;
//             }
//             if(lol.getEnd_date()!=""){
//                 Date afterConvDate = formatter.parse(lol.getStart_date());
//                 Date afterConvDates = formatter.parse(lol.getEnd_date());
//                 long difference_In_Time = afterConvDates.getTime() - afterConvDate.getTime();
//                 long difference_In_Years = (difference_In_Time / (1000l * 60 * 60 * 24 * 365));
//                 long difference_In_Days = (difference_In_Time / (1000 * 60 * 60 * 24)) % 365;
//                 studyTime = difference_In_Years + " years, " + difference_In_Days + " days, ";
//             }
//             n.setStydyTime(studyTime);
//             n_sts.add(n);
//         }
//         schoolPageEntity.setAvgGPA(avg_gpa/(length+1));
//         schoolPageEntity.setN_sts(n_sts);
//         schoolPageEntity.setFinished(finished);
//         schoolPageEntity.setUnfinished(unfinished);
//         return schoolPageEntity;
//     }
//     @GetMapping("/alls/school")
//     public List<node_c> getAllSchools(){
//         return node_cRepository.getAllSchoolss();
//     }


}
