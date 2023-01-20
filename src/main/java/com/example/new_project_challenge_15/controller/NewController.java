package com.example.new_project_challenge_15.controller;

import com.example.new_project_challenge_15.entity.*;
import com.example.new_project_challenge_15.entity.enums.School;
import com.example.new_project_challenge_15.repository.n_stRepo;
import com.example.new_project_challenge_15.repository.rel_final_repo;

import javassist.expr.NewArray;
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

    @GetMapping("/connection/{OneIIN}/{SecIIN}")
    public doubleReturn findBetweenTwo(@PathVariable String OneIIN, @PathVariable String SecIIN) {
        List<n_st> persons = n_stRepo.findBetweenTwo(OneIIN, SecIIN);
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
                    if (nodesToAppend.get(i).getTitle()==person.getIINID()) {
                        node.setNodeStudentModel(nodesToAppend.get(i).getLabel(),nodesToAppend.get(i).getTitle(),nodesToAppend.get(i).getLabel(), false, nodesToAppend.get(i).getId());
                    }
                }
            }
            List<rel_final> relations = rel_final_repo.findRelatioFinals(person.getIINID());
            for (rel_final relation: relations) {
                String bin = relation.getEND_ID();
                if (BINs.contains(bin)) {
                    for (int i=0; i<BINs.size(); i++) {
                        if (nodesToAppend.get(i).getTitle().equals(bin)) {
                            edgesModel edge = new edgesModel(node.getId(), nodesToAppend.get(i).getId());
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

    @GetMapping("/relation")
    public doubleReturn getALLL() {
        // List<rel_final> blyat = rel_final_repo.findAllRelations();
        List<n_st> persons = n_stRepo.getAllUser();
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
                    if (nodesToAppend.get(i).getTitle()==person.getIINID()) {
                        node.setNodeStudentModel(nodesToAppend.get(i).getLabel(),nodesToAppend.get(i).getTitle(),nodesToAppend.get(i).getLabel(), false, nodesToAppend.get(i).getId());
                    }
                }
            }
            List<rel_final> relations = rel_final_repo.findRelatioFinals(person.getIINID());
            for (rel_final relation: relations) {
                String bin = relation.getEND_ID();
                if (BINs.contains(bin)) {
                    for (int i=0; i<BINs.size(); i++) {
                        if (nodesToAppend.get(i).getTitle().equals(bin)) {
                            edgesModel edge = new edgesModel(node.getId(), nodesToAppend.get(i).getId());
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

    @GetMapping("/connection/{IIN}")
    public doubleReturn getRelation(@PathVariable String IIN) {
        List<n_st> persons = n_stRepo.getAllRelated(IIN);
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
                    if (nodesToAppend.get(i).getTitle()==person.getIINID()) {
                        node.setNodeStudentModel(nodesToAppend.get(i).getLabel(),nodesToAppend.get(i).getTitle(),nodesToAppend.get(i).getLabel(), false, nodesToAppend.get(i).getId());
                    }
                }
            }
            List<rel_final> relations = rel_final_repo.findRelatioFinals(person.getIINID());
            for (rel_final relation: relations) {
                String bin = relation.getEND_ID();
                if (BINs.contains(bin)) {
                    for (int i=0; i<BINs.size(); i++) {
                        if (nodesToAppend.get(i).getTitle().equals(bin)) {
                            edgesModel edge = new edgesModel(node.getId(), nodesToAppend.get(i).getId());
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
    @GetMapping("/relation/classmates/{IIN}")
    public doubleReturn getRelations(@PathVariable String IIN) {
        List<n_st> persons = n_stRepo.getttt(IIN);
        List<nodeStudentModel> nodesToAppend = new ArrayList<>();
        List<edgesModel> edgesToAppend = new ArrayList<>();
        List<String> BINs = new ArrayList<>();
        List<String> IINs = new ArrayList<>();
//        List<n_st> n_stsUser = n_stRepo.getttt(IIN);
//        List<String> UserSTARTDate = new ArrayList<>();
//        for(n_st nSt: n_stsUser) {
//            List<rel_final> rel_finalssUser = nSt.getRel_finals();
//            rel_final rel_finalUser = rel_finalssUser.get(0);
//            UserSTARTDate.add(rel_finalUser.getStart_date());
//            System.out.println(rel_finalUser.getStart_date());
//        }
        // List<node_c> localCompanies = new ArrayList<>(); Можно добавить что бы поиск был быстрее но хуй знает пока вдруг не понадобится
        for (n_st person: persons) {
            nodeStudentModel node = new nodeStudentModel();
            List<rel_final> rel_finals = person.getRel_finals();
            rel_final rel_final = rel_finals.get(0);
            System.out.println(rel_final.getStart_date());
            if (!IINs.contains(person.getIINID())) {
                node.setNodeStudentModel(person.getFIO(), person.getIINID(), person.getLABEL(), false);
                IINs.add(person.getIINID());
                nodesToAppend.add(node);
            } else {
                for (int i=0; i<IINs.size(); i++) {
                    if (nodesToAppend.get(i).getTitle()==person.getIINID()) {
                        node.setNodeStudentModel(nodesToAppend.get(i).getLabel(),nodesToAppend.get(i).getTitle(),nodesToAppend.get(i).getLabel(), false, nodesToAppend.get(i).getId());
                    }
                }
            }
            List<rel_final> relations = rel_final_repo.findRelatioFinals(person.getIINID());
            for (rel_final relation: relations) {
                String bin = relation.getEND_ID();
                if (BINs.contains(bin)) {
                    for (int i=0; i<BINs.size(); i++) {
                        if (nodesToAppend.get(i).getTitle().equals(bin)) {
                            edgesModel edge = new edgesModel(node.getId(), nodesToAppend.get(i).getId());
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

    @GetMapping("/relationss/{IIN}")
    public doubleReturn getRelationlkkkjljkljk(@PathVariable String IIN) {
        List<n_st> persons = n_stRepo.getAllRelated(IIN);
        List<nodeStudentModel> nodesToAppend = new ArrayList<>();
        List<edgesModel> edgesToAppend = new ArrayList<>();
        List<String> BINs = new ArrayList<>();
        List<String> IINs = new ArrayList<>();
        List<rel_final> rel_finalss = new ArrayList<>();
        // List<node_c> localCompanies = new ArrayList<>(); Можно добавить что бы поиск был быстрее но хуй знает пока вдруг не понадобится
        for (n_st person: persons) {
            
            rel_finalss =  person.getRel_finals();
            rel_final lol = rel_finalss.get(0);
            lol.getEND_ID();
            System.out.println(lol.getStart_date());
            nodeStudentModel node = new nodeStudentModel();
            if (!IINs.contains(person.getIINID())) {
                node.setNodeStudentModel(person.getFIO(), person.getIINID(), person.getLABEL(), false);
                IINs.add(person.getIINID());
                nodesToAppend.add(node);
            } else {
                for (int i=0; i<IINs.size(); i++) {
                    if (nodesToAppend.get(i).getTitle()==person.getIINID()) {
                        node.setNodeStudentModel(nodesToAppend.get(i).getLabel(),nodesToAppend.get(i).getTitle(),nodesToAppend.get(i).getLabel(), false, nodesToAppend.get(i).getId());
                    }
                }
            }
            List<rel_final> relations = rel_final_repo.findRelatioFinals(person.getIINID());
            for (rel_final relation: relations) {
                String bin = relation.getEND_ID();
                if (BINs.contains(bin)) {
                    for (int i=0; i<BINs.size(); i++) {
                        if (nodesToAppend.get(i).getTitle().equals(bin)) {
                            edgesModel edge = new edgesModel(node.getId(), nodesToAppend.get(i).getId());
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
            // List<rel_final> node = n.getRel_finals();
            // rel_final lol = node.get(0);
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
    @GetMapping("/getrvery") 
    public doubleReturn getEvery() {
        List<nodeStudentModel> nodesToAppend = new ArrayList<>();
        List<edgesModel> edgesToAppend = new ArrayList<>();
        List<n_st> persons = n_stRepo.getAllUser();
        List<String> companies = new ArrayList<>(); 
        for (n_st person: persons) {
            nodeStudentModel currPerson = new nodeStudentModel(person.getFIO(), person.getIINID(), person.getLABEL(), false);
            nodesToAppend.add(currPerson);
            List<rel_final> relations = rel_final_repo.findRelatioFinals(person.getIINID());
            for (rel_final relation: relations) {
                System.out.println(relation.getEND_ID());
                String BIN = relation.getEND_ID();
                node_c currCompany = node_cRepository.getByBiniID(BIN).get(0);
                if (!companies.contains(BIN)) {
                    companies.add(BIN);
                    nodeStudentModel currCompanyNode = new nodeStudentModel(currCompany.getCompany(), currCompany.getLABEL(), currCompany.getBINID(), true);
                    edgesModel currRelationEdge = new edgesModel(currPerson.getId(), currCompanyNode.getId());
                    edgesToAppend.add(currRelationEdge);
                    nodesToAppend.add(0, currCompanyNode);
                } else {
                    nodeStudentModel elseCompany = new nodeStudentModel();
                    for (nodeStudentModel comp: nodesToAppend) {
                        if (comp.getBIN_IIN() == BIN) {
                            elseCompany = comp;
                        }
                    }
                    edgesModel currRelationEdge = new edgesModel(currPerson.getId(), elseCompany.getId());
                    System.out.println();
                    edgesToAppend.add(0, currRelationEdge);
                }
            }
        }
        doubleReturn doubleReturn = new doubleReturn(nodesToAppend, edgesToAppend);
        return doubleReturn;
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
        // List<nodeStudentModel> nodesToAppend = new ArrayList<>();
        // List<edgesModel> edgesToAppend = new ArrayList<>();
        // List<n_st> persons = n_stRepo.getAllUser();
        // List<String> binids = new ArrayList<>();
        // for (n_st person: persons) {
        //     nodeStudentModel thisPer = new nodeStudentModel(person.getFIO(), person.getIINID(), false);
        //     nodesToAppend.add(thisPer);
        //     List<rel_final> relations = person.getRel_finals();
        //     for (rel_final relation: relations) {
        //         String BIN = relation.getNode_c().getBINID();
        //         node_c curNode_c = node_cRepository.getByBiniID(BIN).get(0);
        //         System.out.println(curNode_c.getBINID());
        //         nodeStudentModel curSchool = new nodeStudentModel(curNode_c.getCompany(), curNode_c.getLABEL(), false);
        //         if(binids.contains(BIN)){
        //         }else {
        //             nodesToAppend.add(curSchool);
        //             binids.add(BIN);
        //         }
        //         edgesModel edge = new edgesModel(thisPer.getId(), curSchool.getId());
        //         edgesToAppend.add(edge);
        //     }
        // }
        // doubleReturn result = new doubleReturn(nodesToAppend, edgesToAppend);
        // return result;
    }
    // @GetMapping("/persons/school/{BINID}")
    // public doubleReturn getGraphDatass(@PathVariable String BINID) {
    //     List<n_st> nn = n_stRepo.findBySchool(BINID);
    //     nodeStudentModel school = new nodeStudentModel("School", BINID, true);
    //     List<nodeStudentModel> nodesToAppend = new ArrayList<>();
    //     nodesToAppend.add(0, school);
    //     List<edgesModel> edgesToAppend = new ArrayList<>();
    //     for (n_st n: nn) {
    //         nodeStudentModel temp = new nodeStudentModel(n.getFIO(), n.getIINID(), false);
    //         edgesModel relTemp = new edgesModel(temp.getId(), school.getId());
    //         nodesToAppend.add(temp);
    //         edgesToAppend.add(relTemp);
    //     }
    //     doubleReturn doubleReturn = new doubleReturn(nodesToAppend, edgesToAppend);
    //     return doubleReturn;
    // }
    @GetMapping("/test")
    public doubleReturn fsd(){
        nodeStudentModel school = new nodeStudentModel("School", "kromtau", true);
        nodeStudentModel school1 = new nodeStudentModel("School1", "Aktobe", true);
        List<nodeStudentModel> nodesToAppend = new ArrayList<>();
        List<edgesModel> edgesToAppend = new ArrayList<>();
        nodeStudentModel temp = new nodeStudentModel("damir", "04", false);
        nodeStudentModel temp1 = new nodeStudentModel("rembo", "03", false);
        edgesModel relTemp = new edgesModel(temp.getId(), school.getId());
        edgesModel relTemp1 = new edgesModel(temp1.getId(), school.getId());
        edgesModel relTemp2 = new edgesModel(temp.getId(), school1.getId());
        nodesToAppend.add(temp);
        nodesToAppend.add(temp1);
        nodesToAppend.add(school);
        nodesToAppend.add(school1);
        edgesToAppend.add(relTemp);
        edgesToAppend.add(relTemp1);
        edgesToAppend.add(relTemp2);
        doubleReturn doubleReturn = new doubleReturn();
        doubleReturn.setNodes(nodesToAppend);
        doubleReturn.setEdges(edgesToAppend);
        return doubleReturn;
    }

    @GetMapping("/whole")
    public doubleReturn getRvery() {
        List<nodeStudentModel> nodesToAppend = new ArrayList<>();
        List<edgesModel> edgesToAppend = new ArrayList<>();
        List<n_st> persons = n_stRepo.getAllUser();
        List<String> binids = new ArrayList<>();
        for (n_st person: persons) {
            nodeStudentModel thisPer = new nodeStudentModel(person.getFIO(), person.getIINID(), false);
            nodesToAppend.add(thisPer);
            List<rel_final> relations = person.getRel_finals();
            for (rel_final relation: relations) {
                String BIN = relation.getNode_c().getBINID();
                node_c curNode_c = node_cRepository.getByBiniID(BIN).get(0);
                nodeStudentModel curSchool = new nodeStudentModel(curNode_c.getCompany(), curNode_c.getLABEL(), false);
                if(binids.contains(BIN)){
                }else {
                    nodesToAppend.add(0, curSchool);
                    binids.add(BIN);
                }
                edgesModel edge = new edgesModel(thisPer.getId(), curSchool.getId());
                edgesToAppend.add(edge);
            }
        }
        doubleReturn result = new doubleReturn(nodesToAppend, edgesToAppend);
        return result;
    }

    @GetMapping("/personss")
    public  doubleReturn getGraphDatas() {
        List<n_st> n_sts = n_stRepo.getAllUser();
        List<nodeStudentModel> nodesToAppend = new ArrayList<>();
        List<edgesModel> edgesToAppend = new ArrayList<>();
        List<String> schools = new ArrayList<>();
        List<nodeStudentModel> tempTest = new ArrayList<>();
        for(n_st nSt : n_sts){
          List<rel_final>  rel_finals =  nSt.getRel_finals();
          rel_final rel_final = rel_finals.get(0);
          rel_final.getNode_c().getBINID();
          if(schools.contains(rel_final.getNode_c().getBINID())){

          }else {
              schools.add(rel_final.getNode_c().getBINID());
          }
        }
        for(String sch : schools){
        List<n_st> nn = n_stRepo.findBySchool(sch);
        nodeStudentModel school = new nodeStudentModel("School", sch, true);
        nodesToAppend.add(0, school);
        for (n_st n: nn) {
            nodeStudentModel temp = new nodeStudentModel(n.getFIO(), n.getIINID(), false);
            if(tempTest.contains(temp)){
            }
            else{
                tempTest.add(temp);
                nodesToAppend.add(temp);
        }
        edgesModel relTemp = new edgesModel(temp.getId(), school.getId());
        edgesToAppend.add(relTemp);
    }}
        doubleReturn doubleReturn = new doubleReturn(nodesToAppend, edgesToAppend);
        return doubleReturn;
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
