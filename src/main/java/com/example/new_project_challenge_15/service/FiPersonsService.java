package com.example.new_project_challenge_15.service;


import com.example.new_project_challenge_15.entity.*;
import com.example.new_project_challenge_15.entity.rels.*;
import com.example.new_project_challenge_15.models.photoDb;
import com.example.new_project_challenge_15.repository.newCompanyRepo;
import com.example.new_project_challenge_15.repository.newPersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class FiPersonsService {
    @Autowired
    newCompanyRepo companyRepo;
    @Autowired
    newPersonService personRepo;
    @Autowired
    newPhotoService newPhotoService;

    private Nodes tryAddPhoto(Nodes node, String IIN) {
        try {
            photoDb photoDb = newPhotoService.getPhotoByIIN(IIN);
            node.setPhotoDbf(photoDb);
            return node;
        } catch (Exception e) {
            System.out.println(e);
        }
        return node;
    }

    public doubleReturn shortOpen(Long ID, List<String> relations) {
        return ConstructDoubleReturn(personRepo.shortOpen(ID, relations), companyRepo.shortOpen(ID, relations));
    }

    public doubleReturn getShortestPaths(String FIRST, String SECOND, List<String> list) {
        return ConstructDoubleReturn(personRepo.getPathsWithIIN(FIRST, SECOND, list), companyRepo.getPathsWithIIN(FIRST, SECOND, list));
    }

    public doubleReturn getUlFlPath(String ul, String person, List<String> relations) {
        return ConstructDoubleReturn(personRepo.getUlFlPath(person, ul, relations), companyRepo.getUlFlPath(person, ul, relations));
    }

    public doubleReturn getUlUlPath(String ul1, String ul2, List<String> relations) {
        return ConstructDoubleReturn(personRepo.getUlUlPath(ul1, ul2, relations), companyRepo.getUlUlPath(ul1, ul2, relations));
    }

    public doubleReturn getUlTree(String ul, List<String> relations, int depth, int limit) {
        if (depth==1) {
            return ConstructDoubleReturn(personRepo.getUlTree1(ul, limit, relations), companyRepo.getUlTree1(ul, limit, relations));
        } else if (depth==2) {
            return ConstructDoubleReturn(personRepo.getUlTree2(ul, limit, relations), companyRepo.getUlTree2(ul, limit, relations));
        } else if (depth==3) {
            return ConstructDoubleReturn(personRepo.getUlTree3(ul, limit, relations), companyRepo.getUlTree3(ul, limit, relations));
        } else if (depth==4) {
            return ConstructDoubleReturn(personRepo.getUlTree4(ul, limit, relations), companyRepo.getUlTree4(ul, limit, relations));
        } else if (depth==5) {
            return ConstructDoubleReturn(personRepo.getUlTree5(ul, limit, relations), companyRepo.getUlTree5(ul, limit, relations));
        } else if (depth==6) {
            return ConstructDoubleReturn(personRepo.getUlTree6(ul, limit, relations), companyRepo.getUlTree6(ul, limit, relations));
        } else if (depth==7) {
            return ConstructDoubleReturn(personRepo.getUlTree7(ul, limit, relations), companyRepo.getUlTree7(ul, limit, relations));
        } else if (depth==8) {
            return ConstructDoubleReturn(personRepo.getUlTree8(ul, limit, relations), companyRepo.getUlTree8(ul, limit, relations));
        } else if (depth==9) {
            return ConstructDoubleReturn(personRepo.getUlTree9(ul, limit, relations), companyRepo.getUlTree9(ul, limit, relations));
        } else if (depth==10) {
            return ConstructDoubleReturn(personRepo.getUlTree10(ul, limit, relations), companyRepo.getUlTree10(ul, limit, relations));
        } else if (depth==11) {
            return ConstructDoubleReturn(personRepo.getUlTree11(ul, limit, relations), companyRepo.getUlTree11(ul, limit, relations));
        } else if (depth==12) {
            return ConstructDoubleReturn(personRepo.getUlTree12(ul, limit, relations), companyRepo.getUlTree12(ul, limit, relations));
        } else if (depth==13) {
            return ConstructDoubleReturn(personRepo.getUlTree13(ul, limit, relations), companyRepo.getUlTree13(ul, limit, relations));
        }
        return ConstructDoubleReturn(personRepo.getUlTree13(ul, limit, relations), companyRepo.getUlTree13(ul, limit, relations));
    }

    public doubleReturn getPersonTree(String person,int depth, int limit, List<String> relations) {
        if(depth==1) {
            return ConstructDoubleReturn(personRepo.getPersonTreeDepthOne(person, limit, relations), companyRepo.getPersonTreeDepthOne(person, limit, relations));
        }
        if(depth==2) {
            return ConstructDoubleReturn(personRepo.getPersonTreeDepthTwo(person, limit, relations), companyRepo.getPersonTreeDepthTwo(person, limit, relations));
        }
        if(depth==3) {
            return ConstructDoubleReturn(personRepo.getPersonTreeDepthThree(person, limit, relations), companyRepo.getPersonTreeDepthThree(person, limit, relations));
        }
        if(depth==4) {
            return ConstructDoubleReturn(personRepo.getPersonTreeDepth4(person, limit, relations), companyRepo.getPersonTreeDepth4(person, limit, relations));
        }
        if(depth==5) {
            return ConstructDoubleReturn(personRepo.getPersonTreeDepth5(person, limit, relations), companyRepo.getPersonTreeDepth5(person, limit, relations));
        }
        if(depth==6) {
            return ConstructDoubleReturn(personRepo.getPersonTreeDepth6(person, limit, relations), companyRepo.getPersonTreeDepth6(person, limit, relations));
        }
        if(depth==7) {
            return ConstructDoubleReturn(personRepo.getPersonTreeDepth7(person, limit, relations), companyRepo.getPersonTreeDepth7(person, limit, relations));
        }
        if(depth==8) {
            return ConstructDoubleReturn(personRepo.getPersonTreeDepth8(person, limit, relations), companyRepo.getPersonTreeDepth8(person, limit, relations));
        }
        if(depth==9) {
            return ConstructDoubleReturn(personRepo.getPersonTreeDepth9(person, limit, relations), companyRepo.getPersonTreeDepth9(person, limit, relations));
        }
        if(depth==10) {
            return ConstructDoubleReturn(personRepo.getPersonTreeDepth10(person, limit, relations), companyRepo.getPersonTreeDepth10(person, limit, relations));
        }
        if(depth==11) {
            return ConstructDoubleReturn(personRepo.getPersonTreeDepth11(person, limit, relations), companyRepo.getPersonTreeDepth11(person, limit, relations));
        }
        if(depth==12) {
            return ConstructDoubleReturn(personRepo.getPersonTreeDepth12(person, limit, relations), companyRepo.getPersonTreeDepth12(person, limit, relations));
        }
        if(depth==13) {
            return ConstructDoubleReturn(personRepo.getPersonTreeDepth13(person, limit, relations), companyRepo.getPersonTreeDepth13(person, limit, relations));
        }
        return ConstructDoubleReturn(personRepo.getPersonTreeDepth13(person, limit, relations), companyRepo.getPersonTreeDepth13(person, limit, relations));
    }
    public doubleReturn getPersonByFIO_(String F,String I,String O,int depth, int limit, List<String> relations) {
        if(depth==1) {
            return ConstructDoubleReturn(personRepo.getPersonByFIO_Depth1(F,I,O, limit, relations), companyRepo.getPersonByFIO_Depth1(F,I,O, limit, relations));
        }
        if(depth==2) {
            return ConstructDoubleReturn(personRepo.getPersonByFIO_Depth2(F,I,O, limit, relations), companyRepo.getPersonByFIO_Depth2(F,I,O, limit, relations));
        }
        if(depth==3) {
            return ConstructDoubleReturn(personRepo.getPersonByFIO_Depth3(F,I,O, limit, relations), companyRepo.getPersonByFIO_Depth3(F,I,O, limit, relations));
        }
        if(depth==4) {
            return ConstructDoubleReturn(personRepo.getPersonByFIO_Depth4(F,I,O, limit, relations), companyRepo.getPersonByFIO_Depth4(F,I,O, limit, relations));
        }
        if(depth==5) {
            return ConstructDoubleReturn(personRepo.getPersonByFIO_Depth5(F,I,O, limit, relations), companyRepo.getPersonByFIO_Depth5(F,I,O, limit, relations));
        }
        if(depth==6) {
            return ConstructDoubleReturn(personRepo.getPersonByFIO_Depth6(F,I,O, limit, relations), companyRepo.getPersonByFIO_Depth6(F,I,O, limit, relations));
        }
        if(depth==7) {
            return ConstructDoubleReturn(personRepo.getPersonByFIO_Depth7(F,I,O, limit, relations), companyRepo.getPersonByFIO_Depth7(F,I,O, limit, relations));
        }
        if(depth==8) {
            return ConstructDoubleReturn(personRepo.getPersonByFIO_Depth8(F,I,O, limit, relations), companyRepo.getPersonByFIO_Depth8(F,I,O, limit, relations));
        }
        if(depth==9) {
            return ConstructDoubleReturn(personRepo.getPersonByFIO_Depth9(F,I,O, limit, relations), companyRepo.getPersonByFIO_Depth9(F,I,O, limit, relations));
        }
        if(depth==10) {
            return ConstructDoubleReturn(personRepo.getPersonByFIO_Depth10(F,I,O, limit, relations), companyRepo.getPersonByFIO_Depth10(F,I,O, limit, relations));
        }
        if(depth==11) {
            return ConstructDoubleReturn(personRepo.getPersonByFIO_Depth11(F,I,O, limit, relations), companyRepo.getPersonByFIO_Depth11(F,I,O, limit, relations));
        }
        if(depth==12) {
            return ConstructDoubleReturn(personRepo.getPersonByFIO_Depth12(F,I,O, limit, relations), companyRepo.getPersonByFIO_Depth12(F,I,O, limit, relations));
        }
        if(depth==13) {
            return ConstructDoubleReturn(personRepo.getPersonByFIO_Depth13(F,I,O, limit, relations), companyRepo.getPersonByFIO_Depth13(F,I,O, limit, relations));
        }
        return ConstructDoubleReturn(personRepo.getPersonByFIO_Depth13(F,I,O, limit, relations), companyRepo.getPersonByFIO_Depth13(F,I,O, limit, relations));
    }
    private Map<String, Object> getPropertyMap(Object obj) {
        Map<String, Object> properties = new HashMap<>();

        Field[] fields = obj.getClass().getDeclaredFields();
        for (Field field: fields) {
            try {
                Object value = field.get(obj);
                properties.put(field.getName(), value);
            } catch (IllegalAccessException e){
                e.printStackTrace();
            }
        }

        return properties;
    }

    private doubleReturn ConstructDoubleReturn(List<Persons> personsList, List<Company> companies) {
        List<Nodes> nodes = new ArrayList<>();
        List<relationModel> edges = new ArrayList<>();
        List<Long> ids = new ArrayList<>();
        for (Company object: companies) {
            if (!ids.contains(object.getId())) {
                ids.add(object.getId());
                Nodes currNode = new Nodes();
                Map<String, Object> properties = getPropertyMap(object);
                currNode.setId(object.getId());
                currNode.setProperties(properties);
                nodes.add(currNode);
            }
            List<OPG> OPG = object.getOpgs();
            for (OPG relation: OPG) {
                Map<String, Object> properties = getPropertyMap(relation);
                relationModel currRel = new relationModel(object.getId(), relation.getCompany().getId(), properties);
                currRel.setType("OPG");
                edges.add(currRel);
                if (!ids.contains(relation.getCompany().getId())) {
                    ids.add(relation.getCompany().getId());
                    Nodes currNode = new Nodes();
                    Map<String, Object> properties2 = getPropertyMap(relation.getCompany());
                    currNode.setId(relation.getCompany().getId());
                    currNode.setProperties(properties2);
                    nodes.add(currNode);
                }
            }
            List<NTR_UL_FL> NTR_UL_FL = object.getNtrUlFls();
            for (NTR_UL_FL relation: NTR_UL_FL) {
                Map<String, Object> properties = getPropertyMap(relation);
                relationModel currRel = new relationModel(object.getId(), relation.getCompany().getId(), properties);
                currRel.setType("NTR_UL_FL");
                edges.add(currRel);
                if (!ids.contains(relation.getCompany().getId())) {
                    ids.add(relation.getCompany().getId());
                    Nodes currNode = new Nodes();
                    Map<String, Object> properties2 = getPropertyMap(relation.getCompany());
                    currNode.setId(relation.getCompany().getId());
                    currNode.setProperties(properties2);
                    nodes.add(currNode);
                }
            }
            List<IP> IP = object.getIps();
            for (IP relation: IP) {
                Map<String, Object> properties = getPropertyMap(relation);
                relationModel currRel = new relationModel(object.getId(), relation.getAddress().getId(), properties);
                currRel.setType("IP");
                edges.add(currRel);
                if (!ids.contains(relation.getAddress().getId())) {
                    ids.add(relation.getAddress().getId());
                    Nodes currNode = new Nodes();
                    Map<String, Object> properties2 = getPropertyMap(relation.getAddress());
                    currNode.setId(relation.getAddress().getId());
                    currNode.setProperties(properties2);
                    nodes.add(currNode);
                }
            }
            List<IP_KX> IP_KX = object.getIpKxes();
            for (IP_KX relation: IP_KX) {
                Map<String, Object> properties = getPropertyMap(relation);
                relationModel currRel = new relationModel(object.getId(), relation.getAddress().getId(), properties);
                currRel.setType("IP_KX");
                edges.add(currRel);
                if (!ids.contains(relation.getAddress().getId())) {
                    ids.add(relation.getAddress().getId());
                    Nodes currNode = new Nodes();
                    Map<String, Object> properties2 = getPropertyMap(relation.getAddress());
                    currNode.setId(relation.getAddress().getId());
                    currNode.setProperties(properties2);
                    nodes.add(currNode);
                }
            }
            List<FPG> FPG = object.getFpgs();
            for (FPG relation: FPG) {
                Map<String, Object> properties = getPropertyMap(relation);
                relationModel currRel = new relationModel(object.getId(), relation.getCompany().getId(), properties);
                currRel.setType("FPG");
                edges.add(currRel);
                if (!ids.contains(relation.getCompany().getId())) {
                    ids.add(relation.getCompany().getId());
                    Nodes currNode = new Nodes();
                    Map<String, Object> properties2 = getPropertyMap(relation.getCompany());
                    currNode.setId(relation.getCompany().getId());
                    currNode.setProperties(properties2);
                    nodes.add(currNode);
                }
            }
            List<GOSZAKUP> GOSZAKUP = object.getGoszakups();
            for (GOSZAKUP relation: GOSZAKUP) {
                Map<String, Object> properties = getPropertyMap(relation);
                relationModel currRel = new relationModel(object.getId(), relation.getCompany().getId(), properties);
                currRel.setType("GOSZAKUP");
                edges.add(currRel);
                if (!ids.contains(relation.getCompany().getId())) {
                    ids.add(relation.getCompany().getId());
                    Nodes currNode = new Nodes();
                    Map<String, Object> properties2 = getPropertyMap(relation.getCompany());
                    currNode.setId(relation.getCompany().getId());
                    currNode.setProperties(properties2);
                    nodes.add(currNode);
                }
            }
            List<FOUNDER_HIST> FOUNDER_HIST = object.getFounderHists();
            for (FOUNDER_HIST relation: FOUNDER_HIST) {
                Map<String, Object> properties = getPropertyMap(relation);
                relationModel currRel = new relationModel(relation.getCompany().getId(),object.getId(), properties);
                currRel.setType("FOUNDER_HIST");
                edges.add(currRel);
                if (!ids.contains(relation.getCompany().getId())) {
                    ids.add(relation.getCompany().getId());
                    Nodes currNode = new Nodes();
                    Map<String, Object> properties2 = getPropertyMap(relation.getCompany());
                    currNode.setId(relation.getCompany().getId());
                    currNode.setProperties(properties2);
                    nodes.add(currNode);
                }
            }
            List<FOUNDER_CUR> FOUNDER_CUR = object.getFounderCurs();
            for (FOUNDER_CUR relation: FOUNDER_CUR) {
                Map<String, Object> properties = getPropertyMap(relation);
                relationModel currRel = new relationModel(object.getId(), relation.getCompany().getId(), properties);
                currRel.setType("FOUNDER_CUR");
                edges.add(currRel);
                if (!ids.contains(relation.getCompany().getId())) {
                    ids.add(relation.getCompany().getId());
                    Nodes currNode = new Nodes();
                    Map<String, Object> properties2 = getPropertyMap(relation.getCompany());
                    currNode.setId(relation.getCompany().getId());
                    currNode.setProperties(properties2);
                    nodes.add(currNode);
                }
            }
            List<DIRECTOR_CUR> DIRECTOR_CUR = object.getDirectorCurs();
            for (DIRECTOR_CUR relation: DIRECTOR_CUR) {
                Map<String, Object> properties = getPropertyMap(relation);
                relationModel currRel = new relationModel(object.getId(), relation.getPerson().getId(), properties);
                currRel.setType("DIRECTOR_CUR");
                edges.add(currRel);
                if (!ids.contains(relation.getPerson().getId())) {
                    ids.add(relation.getPerson().getId());
                    Nodes currNode = new Nodes();
                    Map<String, Object> properties2 = getPropertyMap(relation.getPerson());
                    currNode = tryAddPhoto(currNode, relation.getPerson().getIIN());
//                    photoDb photoDb = newPhotoService.getPhotoByIIN(relation.getPersons().getIIN());
//                    currNode.setPhotoDbf(photoDb);
                    currNode.setId(relation.getPerson().getId());
                    currNode.setProperties(properties2);
                    nodes.add(currNode);
                }
            }
            List<DIRECTOR_HIST> DIRECTOR_HIST = object.getDirectorHists();
            for (DIRECTOR_HIST relation: DIRECTOR_HIST) {
                Map<String, Object> properties = getPropertyMap(relation);
                relationModel currRel = new relationModel(object.getId(), relation.getPerson().getId(), properties);
                currRel.setType("DIRECTOR_HIST");
                edges.add(currRel);
                if (!ids.contains(relation.getPerson().getId())) {
                    ids.add(relation.getPerson().getId());
                    Nodes currNode = new Nodes();
                    Map<String, Object> properties2 = getPropertyMap(relation.getPerson());
                    currNode = tryAddPhoto(currNode, relation.getPerson().getIIN());
//                    photoDb photoDb = newPhotoService.getPhotoByIIN(relation.getPersons().getIIN());
//                    currNode.setPhotoDbf(photoDb);
                    currNode.setId(relation.getPerson().getId());
                    currNode.setProperties(properties2);
                    nodes.add(currNode);
                }
            }
            List<WORKER_HIST> WORKER_HIST = object.getWorkerHists();
            for (WORKER_HIST relation: WORKER_HIST) {
                Map<String, Object> properties = getPropertyMap(relation);
                relationModel currRel = new relationModel(object.getId(), relation.getPerson().getId(), properties);
                currRel.setType("WORKER_HIST");
                edges.add(currRel);
                if (!ids.contains(relation.getPerson().getId())) {
                    ids.add(relation.getPerson().getId());
                    Nodes currNode = new Nodes();
                    Map<String, Object> properties2 = getPropertyMap(relation.getPerson());
                    currNode = tryAddPhoto(currNode, relation.getPerson().getIIN());
//                    photoDb photoDb = newPhotoService.getPhotoByIIN(relation.getPerson().getIIN());
//                    currNode.setPhotoDbf(photoDb);
                    currNode.setId(relation.getPerson().getId());
                    currNode.setProperties(properties2);
                    nodes.add(currNode);
                }
            }
            List<WORKER_CUR> WORKER_CUR = object.getWorkerCurs();
            for (WORKER_CUR relation: WORKER_CUR) {
                Map<String, Object> properties = getPropertyMap(relation);
                relationModel currRel = new relationModel(object.getId(), relation.getPerson().getId(), properties);
                currRel.setType("WORKER_CUR");
                edges.add(currRel);
                if (!ids.contains(relation.getPerson().getId())) {
                    ids.add(relation.getPerson().getId());
                    Nodes currNode = new Nodes();
                    Map<String, Object> properties2 = getPropertyMap(relation.getPerson());
                    currNode = tryAddPhoto(currNode, relation.getPerson().getIIN());
//                    photoDb photoDb = newPhotoService.getPhotoByIIN(relation.getPerson().getIIN());
//                    currNode.setPhotoDbf(photoDb);
                    currNode.setId(relation.getPerson().getId());
                    currNode.setProperties(properties2);
                    nodes.add(currNode);
                }
            }
            List<SUDIM> SUDIM = object.getSudims();
            for (SUDIM relation: SUDIM) {
                Map<String, Object> properties = getPropertyMap(relation);
                relationModel currRel = new relationModel(object.getId(), relation.getPerson().getId(), properties);
                currRel.setType("SUDIM");
                edges.add(currRel);
                if (!ids.contains(relation.getPerson().getId())) {
                    ids.add(relation.getPerson().getId());
                    Nodes currNode = new Nodes();
                    Map<String, Object> properties2 = getPropertyMap(relation.getPerson());
                    currNode = tryAddPhoto(currNode, relation.getPerson().getIIN());
//                    photoDb photoDb = newPhotoService.getPhotoByIIN(relation.getPerson().getIIN());
//                    currNode.setPhotoDbf(photoDb);
                    currNode.setId(relation.getPerson().getId());
                    currNode.setProperties(properties2);
                    nodes.add(currNode);
                }
            }
            List<UCHILSYA> UCHILSYA = object.getUchilsyas();
            for (UCHILSYA relation: UCHILSYA) {
                Map<String, Object> properties = getPropertyMap(relation);
                relationModel currRel = new relationModel(object.getId(), relation.getPerson().getId(), properties);
                currRel.setType("UCHILSYA");
                edges.add(currRel);
                if (!ids.contains(relation.getPerson().getId())) {
                    ids.add(relation.getPerson().getId());
                    Nodes currNode = new Nodes();
                    Map<String, Object> properties2 = getPropertyMap(relation.getPerson());
                    currNode = tryAddPhoto(currNode, relation.getPerson().getIIN());
//                    photoDb photoDb = newPhotoService.getPhotoByIIN(relation.getPerson().getIIN());
//                    currNode.setPhotoDbf(photoDb);
                    currNode.setId(relation.getPerson().getId());
                    currNode.setProperties(properties2);
                    nodes.add(currNode);
                }
            }
            List<REG_ADDESS_UL> REG_ADDESS_UL = object.getRegAddessUls();
            for (REG_ADDESS_UL relation: REG_ADDESS_UL) {
                Map<String, Object> properties = getPropertyMap(relation);
                relationModel currRel = new relationModel(object.getId(), relation.getAddress().getId(), properties);
                currRel.setType("getAddress");
                edges.add(currRel);
                if (!ids.contains(relation.getAddress().getId())) {
                    ids.add(relation.getAddress().getId());
                    Nodes currNode = new Nodes();
                    Map<String, Object> properties2 = getPropertyMap(relation.getAddress());
                    currNode.setId(relation.getAddress().getId());
                    currNode.setProperties(properties2);
                    nodes.add(currNode);
                }
            }
            List<REG_ADDRESS> REG_ADDRESS = object.getRegAddresses();
            for (REG_ADDRESS relation: REG_ADDRESS) {
                Map<String, Object> properties = getPropertyMap(relation);
                relationModel currRel = new relationModel(object.getId(), relation.getPersons().getId(), properties);
                currRel.setType("REG_ADDRESS");
                edges.add(currRel);
                if (!ids.contains(relation.getPersons().getId())) {
                    ids.add(relation.getPersons().getId());
                    Nodes currNode = new Nodes();
                    Map<String, Object> properties2 = getPropertyMap(relation.getPersons());
                    currNode = tryAddPhoto(currNode, relation.getPersons().getIIN());
//                    photoDb photoDb = newPhotoService.getPhotoByIIN(relation.getPersons().getIIN());
//                    currNode.setPhotoDbf(photoDb);
                    currNode.setId(relation.getPersons().getId());
                    currNode.setProperties(properties2);
                    nodes.add(currNode);
                }
            }
            List<PDL> PDL = object.getPdls();
            for (PDL relation: PDL) {
                Map<String, Object> properties = getPropertyMap(relation);
                relationModel currRel = new relationModel(object.getId(), relation.getCompany().getId(), properties);
                currRel.setType("PDL");
                edges.add(currRel);
                if (!ids.contains(relation.getCompany().getId())) {
                    ids.add(relation.getCompany().getId());
                    Nodes currNode = new Nodes();
                    Map<String, Object> properties2 = getPropertyMap(relation.getCompany());
                    currNode.setId(relation.getCompany().getId());
                    currNode.setProperties(properties2);
                    nodes.add(currNode);
                }
            }
            List<DETDOM_HIST> detdomHistList = object.getDetdomHistList();
            for (DETDOM_HIST relation: detdomHistList) {
                Map<String, Object> properties = getPropertyMap(relation);
                relationModel currRel = new relationModel(object.getId(), relation.getCompany().getId(), properties);
                currRel.setType("DETDOM_HIST");
                edges.add(currRel);
                if (!ids.contains(relation.getCompany().getId())) {
                    ids.add(relation.getCompany().getId());
                    Nodes currNode = new Nodes();
                    Map<String, Object> properties2 = getPropertyMap(relation.getCompany());
                    currNode.setId(relation.getCompany().getId());
                    currNode.setProperties(properties2);
                    nodes.add(currNode);
                }
            }
            List<BUHGALTER> buhgalters = object.getBuhgalters();
            for (BUHGALTER relation: buhgalters) {
                Map<String, Object> properties = getPropertyMap(relation);
                relationModel currRel = new relationModel(object.getId(), relation.getCompany().getId(), properties);
                currRel.setType("BUHGALTER");
                edges.add(currRel);
                if (!ids.contains(relation.getCompany().getId())) {
                    ids.add(relation.getCompany().getId());
                    Nodes currNode = new Nodes();
                    Map<String, Object> properties2 = getPropertyMap(relation.getCompany());
                    currNode.setId(relation.getCompany().getId());
                    currNode.setProperties(properties2);
                    nodes.add(currNode);
                }
            }
            List<DFO_AFF_UL> DFO_AFF_UL = object.getDfoAffUls();
            for (DFO_AFF_UL relation: DFO_AFF_UL) {
                Map<String, Object> properties = getPropertyMap(relation);
                relationModel currRel = new relationModel(object.getId(), relation.getCompany().getId(), properties);
                currRel.setType("DFO_AFF_UL");
                edges.add(currRel);
                if (!ids.contains(relation.getCompany().getId())) {
                    ids.add(relation.getCompany().getId());
                    Nodes currNode = new Nodes();
                    Map<String, Object> properties2 = getPropertyMap(relation.getCompany());
                    currNode.setId(relation.getCompany().getId());
                    currNode.setProperties(properties2);
                    nodes.add(currNode);
                }
            }
            List<ESF_10and100> ESF_10and100 = object.getEsf_10and100s();
            for (ESF_10and100 relation: ESF_10and100) {
                Map<String, Object> properties = getPropertyMap(relation);
                Long endId = relation.getCompany().getId();
                if (relation.getCompany()==null) {
                    endId = personRepo.getEndNodeId(relation.id);
                }
                relationModel currRel = new relationModel(object.getId(), endId, properties);
                currRel.setType("ESF_10and100");
                edges.add(currRel);
                if (!ids.contains(relation.getCompany().getId())) {
                    ids.add(relation.getCompany().getId());
                    Nodes currNode = new Nodes();
                    Map<String, Object> properties2 = getPropertyMap(relation.getCompany());
                    currNode.setId(relation.getCompany().getId());
                    currNode.setProperties(properties2);
                    nodes.add(currNode);
                }
            }
            List<ESF_10and50> ESF_10and50 = object.getEsf10and50s();
            for (ESF_10and50 relation: ESF_10and50) {
                Map<String, Object> properties = getPropertyMap(relation);
                relationModel currRel = new relationModel(object.getId(), relation.getCompany().getId(), properties);
                currRel.setType("ESF_10and50");
                edges.add(currRel);
                if (!ids.contains(relation.getCompany().getId())) {
                    ids.add(relation.getCompany().getId());
                    Nodes currNode = new Nodes();
                    Map<String, Object> properties2 = getPropertyMap(relation.getCompany());
                    currNode.setId(relation.getCompany().getId());
                    currNode.setProperties(properties2);
                    nodes.add(currNode);
                }
            }
            List<ESF_50and100> ESF_50and100 = object.getEsf50and100s();
            for (ESF_50and100 relation: ESF_50and100) {
                Map<String, Object> properties = getPropertyMap(relation);
                relationModel currRel = new relationModel(object.getId(), relation.getCompany().getId(), properties);
                currRel.setType("ESF_50and100");
                edges.add(currRel);
                if (!ids.contains(relation.getCompany().getId())) {
                    ids.add(relation.getCompany().getId());
                    Nodes currNode = new Nodes();
                    Map<String, Object> properties2 = getPropertyMap(relation.getCompany());
                    currNode.setId(relation.getCompany().getId());
                    currNode.setProperties(properties2);
                    nodes.add(currNode);
                }
            }
            List<ESF_5and10> ESF_5and10 = object.getEsf5and10s();
            for (com.example.new_project_challenge_15.entity.rels.ESF_5and10 relation: ESF_5and10) {
                Map<String, Object> properties = getPropertyMap(relation);
                relationModel currRel = new relationModel(object.getId(), relation.getCompany().getId(), properties);
                currRel.setType("ESF_5and10");
                edges.add(currRel);
                if (!ids.contains(relation.getCompany().getId())) {
                    ids.add(relation.getCompany().getId());
                    Nodes currNode = new Nodes();
                    Map<String, Object> properties2 = getPropertyMap(relation.getCompany());
                    currNode.setId(relation.getCompany().getId());
                    currNode.setProperties(properties2);
                    nodes.add(currNode);
                }
            }
            List<ESF_100> ESF_100 = object.getEsf100s();
            for (ESF_100 relation: ESF_100) {
                Map<String, Object> properties = getPropertyMap(relation);
                relationModel currRel = new relationModel( object.getId(), relation.getCompany().getId(), properties);
                currRel.setType("ESF_100");
                edges.add(currRel);
                if (!ids.contains(relation.getCompany().getId())) {
                    ids.add(relation.getCompany().getId());
                    Nodes currNode = new Nodes();
                    Map<String, Object> properties2 = getPropertyMap(relation.getCompany());
                    currNode.setId(relation.getCompany().getId());
                    currNode.setProperties(properties2);
                    nodes.add(currNode);
                }
            }
        }
        for (Persons object: personsList) {
            if (!ids.contains(object.getId())) {
                ids.add(object.getId());
                Nodes currNode = new Nodes();
                Map<String, Object> properties = getPropertyMap(object);
                currNode = tryAddPhoto(currNode, object.getIIN());
//                photoDb photoDb = newPhotoService.getPhotoByIIN(object.getIIN());
//                currNode.setPhotoDbf(photoDb);
                currNode.setId(object.getId());
                currNode.setProperties(properties);
                nodes.add(currNode);
            }
            List<FOUNDER_CUR> FOUNDER_CUR = object.getFounderCurs();
            for (FOUNDER_CUR relation: FOUNDER_CUR) {
                Map<String, Object> properties = getPropertyMap(relation);
                relationModel currRel = new relationModel( relation.getCompany().getId(), object.getId(), properties);
                currRel.setType("FOUNDER_CUR");
                edges.add(currRel);
                if (!ids.contains(relation.getCompany().getId())) {
                    ids.add(relation.getCompany().getId());
                    Nodes currNode = new Nodes();
                    Map<String, Object> properties2 = getPropertyMap(relation.getCompany());
                    currNode.setId(relation.getCompany().getId());
                    currNode.setProperties(properties2);
                    nodes.add(currNode);
                }
            }
            List<REG_ADDRESS_CUR> regAddressCurs = object.getRegAddressCurs();
            for (REG_ADDRESS_CUR relation: regAddressCurs) {
                Map<String, Object> properties = getPropertyMap(relation);
                relationModel currRel = new relationModel(object.getId(), relation.getAddress().getId(), properties);
                currRel.setType("REG_ADDRESS_CUR");
                edges.add(currRel);
                if (!ids.contains(relation.getAddress().getId())) {
                    ids.add(relation.getAddress().getId());
                    Nodes currNode = new Nodes();
                    Map<String, Object> properties2 = getPropertyMap(relation.getAddress());
                    currNode.setId(relation.getAddress().getId());
                    currNode.setProperties(properties2);
                    nodes.add(currNode);
                }
            }
            List<REG_ADDRESS_HIST> REG_ADDRESS_HIST = object.getRegAddressHists();
            for (REG_ADDRESS_HIST relation: REG_ADDRESS_HIST) {
                Map<String, Object> properties = getPropertyMap(relation);
                relationModel currRel = new relationModel(object.getId(), relation.getAddress().getId(), properties);
                currRel.setType("REG_ADDRESS_HIST");
                edges.add(currRel);
                if (!ids.contains(relation.getAddress().getId())) {
                    ids.add(relation.getAddress().getId());
                    Nodes currNode = new Nodes();
                    Map<String, Object> properties2 = getPropertyMap(relation.getAddress());
                    currNode.setId(relation.getAddress().getId());
                    currNode.setProperties(properties2);
                    nodes.add(currNode);
                }
            }
            List<REG_ADDRESS> REG_ADDRESS = object.getRegAddresses();
            for (REG_ADDRESS relation: REG_ADDRESS) {
                Map<String, Object> properties = getPropertyMap(relation);
                relationModel currRel = new relationModel(object.getId(), relation.getPersons().getId(), properties);
                currRel.setType("REG_ADDRESS");
                edges.add(currRel);
                if (!ids.contains(relation.getPersons().getId())) {
                    ids.add(relation.getPersons().getId());
                    Nodes currNode = new Nodes();
                    Map<String, Object> properties2 = getPropertyMap(relation.getPersons());
                    currNode = tryAddPhoto(currNode, relation.getPersons().getIIN());
//                    photoDb photoDb = newPhotoService.getPhotoByIIN(object.getIIN());
//                    currNode.setPhotoDbf(photoDb);
                    currNode.setId(relation.getPersons().getId());
                    currNode.setProperties(properties2);
                    nodes.add(currNode);
                }
            }
            List<BUHGALTER> buhgalters = object.getBuhgalters();
            for (BUHGALTER relation: buhgalters) {
                Map<String, Object> properties = getPropertyMap(relation);
                relationModel currRel = new relationModel(object.getId(), relation.getCompany().getId(), properties);
                currRel.setType("BUHGALTER");
                edges.add(currRel);
                if (!ids.contains(relation.getCompany().getId())) {
                    ids.add(relation.getCompany().getId());
                    Nodes currNode = new Nodes();
                    Map<String, Object> properties2 = getPropertyMap(relation.getCompany());
                    currNode.setId(relation.getCompany().getId());
                    currNode.setProperties(properties2);
                    nodes.add(currNode);
                }
            }
            List<DETDOM_HIST> detdomHistList = object.getDetdomHistList();
            for (DETDOM_HIST relation: detdomHistList) {
                Map<String, Object> properties = getPropertyMap(relation);
                relationModel currRel = new relationModel(object.getId(), relation.getCompany().getId(), properties);
                currRel.setType("DETDOM_HIST");
                edges.add(currRel);
                if (!ids.contains(relation.getCompany().getId())) {
                    ids.add(relation.getCompany().getId());
                    Nodes currNode = new Nodes();
                    Map<String, Object> properties2 = getPropertyMap(relation.getCompany());
                    currNode.setId(relation.getCompany().getId());
                    currNode.setProperties(properties2);
                    nodes.add(currNode);
                }
            }
            List<DFO_AFF_FIZ> dfoAffFizs = object.getDfoAffFizs();
            for (DFO_AFF_FIZ relation: dfoAffFizs) {
                Map<String, Object> properties = getPropertyMap(relation);
                relationModel currRel = new relationModel(object.getId(), relation.getCompany().getId(), properties);
                currRel.setType("DFO_AFF_FIZ");
                edges.add(currRel);
                if (!ids.contains(relation.getCompany().getId())) {
                    ids.add(relation.getCompany().getId());
                    Nodes currNode = new Nodes();
                    Map<String, Object> properties2 = getPropertyMap(relation.getCompany());
                    currNode.setId(relation.getCompany().getId());
                    currNode.setProperties(properties2);
                    nodes.add(currNode);
                }
            }
            List<ZAGS_IIN> zagsIins = object.getZagsIins();
            for (ZAGS_IIN relation: zagsIins) {
                Map<String, Object> properties = getPropertyMap(relation);
                relationModel currRel = new relationModel(object.getId(), relation.getPerson().getId(), properties);
                currRel.setType("ZAGS_IIN");
                edges.add(currRel);
                if (!ids.contains(relation.getPerson().getId())) {
                    ids.add(relation.getPerson().getId());
                    Nodes currNode = new Nodes();
                    Map<String, Object> properties2 = getPropertyMap(relation.getPerson());
                    currNode = tryAddPhoto(currNode, relation.getPerson().getIIN());
//                    photoDb photoDb = newPhotoService.getPhotoByIIN(object.getIIN());
//                    currNode.setPhotoDbf(photoDb);
                    currNode.setId(relation.getPerson().getId());
                    currNode.setProperties(properties2);
                    nodes.add(currNode);
                }
            }
            List<ZAGS_FIO> zagsFios = object.getZagsFios();
            for (ZAGS_FIO relation: zagsFios) {
                Map<String, Object> properties = getPropertyMap(relation);
                relationModel currRel = new relationModel(object.getId(), relation.getPerson().getId(), properties);
                currRel.setType("ZAGS_FIO");
                edges.add(currRel);
                if (!ids.contains(relation.getPerson().getId())) {
                    ids.add(relation.getPerson().getId());
                    Nodes currNode = new Nodes();
                    Map<String, Object> properties2 = getPropertyMap(relation.getPerson());
                    currNode = tryAddPhoto(currNode, relation.getPerson().getIIN());
//                    photoDb photoDb = newPhotoService.getPhotoByIIN(object.getIIN());
//                    currNode.setPhotoDbf(photoDb);
                    currNode.setId(relation.getPerson().getId());
                    currNode.setProperties(properties2);
                    nodes.add(currNode);
                }
            }
            List<ZAGS> zags = object.getZags();
            for (ZAGS relation: zags) {
                Map<String, Object> properties = getPropertyMap(relation);
                relationModel currRel = new relationModel(object.getId(), relation.getPerson().getId(), properties);
                currRel.setType("ZAGS");
                edges.add(currRel);
                if (!ids.contains(relation.getPerson().getId())) {
                    ids.add(relation.getPerson().getId());
                    Nodes currNode = new Nodes();
                    Map<String, Object> properties2 = getPropertyMap(relation.getPerson());
                    currNode = tryAddPhoto(currNode, relation.getPerson().getIIN());
//                    photoDb photoDb = newPhotoService.getPhotoByIIN(object.getIIN());
//                    currNode.setPhotoDbf(photoDb);
                    currNode.setId(relation.getPerson().getId());
                    currNode.setProperties(properties2);
                    nodes.add(currNode);
                }
            }
            List<SLUZHIL> SLUZHIL = object.getSluzhils();
            for (SLUZHIL relation: SLUZHIL) {
                Map<String, Object> properties = getPropertyMap(relation);
                relationModel currRel = new relationModel(object.getId(), relation.getCompany().getId(), properties);
                currRel.setType("SLUZHIL");
                edges.add(currRel);
                if (!ids.contains(relation.getCompany().getId())) {
                    ids.add(relation.getCompany().getId());
                    Nodes currNode = new Nodes();
                    Map<String, Object> properties2 = getPropertyMap(relation.getCompany());
                    currNode.setId(relation.getCompany().getId());
                    currNode.setProperties(properties2);
                    nodes.add(currNode);
                }
            }
            List<SUDIM> SUDIM = object.getSudims();
            for (SUDIM relation: SUDIM) {
                Map<String, Object> properties = getPropertyMap(relation);
                relationModel currRel = new relationModel(object.getId(), relation.getPerson().getId(), properties);
                currRel.setType("SUDIM");
                edges.add(currRel);
                if (!ids.contains(relation.getPerson().getId())) {
                    ids.add(relation.getPerson().getId());
                    Nodes currNode = new Nodes();
                    Map<String, Object> properties2 = getPropertyMap(relation.getPerson());
                    currNode = tryAddPhoto(currNode, relation.getPerson().getIIN());
//                    photoDb photoDb = newPhotoService.getPhotoByIIN(object.getIIN());
//                    currNode.setPhotoDbf(photoDb);
                    currNode.setId(relation.getPerson().getId());
                    currNode.setProperties(properties2);
                    nodes.add(currNode);
                }
            }
            List<PDL> PDL = object.getPdls();
            for (PDL relation: PDL) {
                Map<String, Object> properties = getPropertyMap(relation);
                relationModel currRel = new relationModel(object.getId(), relation.getCompany().getId(), properties);
                currRel.setType("PDL");
                edges.add(currRel);
                if (!ids.contains(relation.getCompany().getId())) {
                    ids.add(relation.getCompany().getId());
                    Nodes currNode = new Nodes();
                    Map<String, Object> properties2 = getPropertyMap(relation.getCompany());
                    currNode.setId(relation.getCompany().getId());
                    currNode.setProperties(properties2);
                    nodes.add(currNode);
                }
            }
            List<NTR_FL> NTR_FL = object.getNtrFls();
            for (NTR_FL relation: NTR_FL) {
                Map<String, Object> properties = getPropertyMap(relation);
                relationModel currRel = new relationModel(object.getId(), relation.getCompany().getId(), properties);
                currRel.setType("NTR_FL");
                edges.add(currRel);
                if (!ids.contains(relation.getCompany().getId())) {
                    ids.add(relation.getCompany().getId());
                    Nodes currNode = new Nodes();
                    Map<String, Object> properties2 = getPropertyMap(relation.getCompany());
                    currNode.setId(relation.getCompany().getId());
                    currNode.setProperties(properties2);
                    nodes.add(currNode);
                }
            }
            List<OPG> OPG = object.getOpgs();
            for (OPG relation: OPG) {
                Map<String, Object> properties = getPropertyMap(relation);
                relationModel currRel = new relationModel(object.getId(), relation.getCompany().getId(), properties);
                currRel.setType("OPG");
                edges.add(currRel);
                if (!ids.contains(relation.getCompany().getId())) {
                    ids.add(relation.getCompany().getId());
                    Nodes currNode = new Nodes();
                    Map<String, Object> properties2 = getPropertyMap(relation.getCompany());
                    currNode.setId(relation.getCompany().getId());
                    currNode.setProperties(properties2);
                    nodes.add(currNode);
                }
            }
            List<ESF_10and100> ESF_10and100 = object.getEsf_10and100s();
            for (ESF_10and100 relation: ESF_10and100) {
                Map<String, Object> properties = getPropertyMap(relation);
                relationModel currRel = new relationModel(object.getId(), relation.getCompany().getId(), properties);
                currRel.setType("ESF_10and100");
                edges.add(currRel);
                if (!ids.contains(relation.getCompany().getId())) {
                    ids.add(relation.getCompany().getId());
                    Nodes currNode = new Nodes();
                    Map<String, Object> properties2 = getPropertyMap(relation.getCompany());
                    currNode.setId(relation.getCompany().getId());
                    currNode.setProperties(properties2);
                    nodes.add(currNode);
                }
            }
            List<ESF_10and100> ESF_10and100s = object.getEsf_10and100sOut();
            for (ESF_10and100 relation: ESF_10and100s) {
                Map<String, Object> properties = getPropertyMap(relation);
                relationModel currRel = new relationModel(object.getId(), relation.getCompany().getId(), properties);
                currRel.setType("ESF_10and100");
                edges.add(currRel);
                if (!ids.contains(relation.getCompany().getId())) {
                    ids.add(relation.getCompany().getId());
                    Nodes currNode = new Nodes();
                    Map<String, Object> properties2 = getPropertyMap(relation.getCompany());
                    currNode.setId(relation.getCompany().getId());
                    currNode.setProperties(properties2);
                    nodes.add(currNode);
                }
            }
            List<ESF_10and50> ESF_10and50 = object.getEsf10and50s();
            for (ESF_10and50 relation: ESF_10and50) {
                Map<String, Object> properties = getPropertyMap(relation);
                relationModel currRel = new relationModel(object.getId(), relation.getCompany().getId(), properties);
                currRel.setType("ESF_10and50");
                edges.add(currRel);
                if (!ids.contains(relation.getCompany().getId())) {
                    ids.add(relation.getCompany().getId());
                    Nodes currNode = new Nodes();
                    Map<String, Object> properties2 = getPropertyMap(relation.getCompany());
                    currNode.setId(relation.getCompany().getId());
                    currNode.setProperties(properties2);
                    nodes.add(currNode);
                }
            }
            List<ESF_10and50> ESF_10and50s = object.getEsf10and50sIncome();
            for (ESF_10and50 relation: ESF_10and50s) {
                Map<String, Object> properties = getPropertyMap(relation);
                relationModel currRel = new relationModel(object.getId(), relation.getCompany().getId(), properties);
                currRel.setType("ESF_10and50");
                edges.add(currRel);
                if (!ids.contains(relation.getCompany().getId())) {
                    ids.add(relation.getCompany().getId());
                    Nodes currNode = new Nodes();
                    Map<String, Object> properties2 = getPropertyMap(relation.getCompany());
                    currNode.setId(relation.getCompany().getId());
                    currNode.setProperties(properties2);
                    nodes.add(currNode);
                }
            }
            List<ESF_50and100> ESF_50and100 = object.getEsf50and100s();
            for (ESF_50and100 relation: ESF_50and100) {
                Map<String, Object> properties = getPropertyMap(relation);
                relationModel currRel = new relationModel(object.getId(), relation.getCompany().getId(), properties);
                currRel.setType("ESF_50and100");
                edges.add(currRel);
                if (!ids.contains(relation.getCompany().getId())) {
                    ids.add(relation.getCompany().getId());
                    Nodes currNode = new Nodes();
                    Map<String, Object> properties2 = getPropertyMap(relation.getCompany());
                    currNode.setId(relation.getCompany().getId());
                    currNode.setProperties(properties2);
                    nodes.add(currNode);
                }
            }
            List<ESF_50and100> ESF_50and100a = object.getEsf50and100sIncome();
            for (ESF_50and100 relation: ESF_50and100a) {
                Map<String, Object> properties = getPropertyMap(relation);
                relationModel currRel = new relationModel(object.getId(), relation.getCompany().getId(), properties);
                currRel.setType("ESF_50and100");
                edges.add(currRel);
                if (!ids.contains(relation.getCompany().getId())) {
                    ids.add(relation.getCompany().getId());
                    Nodes currNode = new Nodes();
                    Map<String, Object> properties2 = getPropertyMap(relation.getCompany());
                    currNode.setId(relation.getCompany().getId());
                    currNode.setProperties(properties2);
                    nodes.add(currNode);
                }
            }
            List<ESF_5and10> ESF_5and10 = object.getEsf5and10s();
            for (com.example.new_project_challenge_15.entity.rels.ESF_5and10 relation: ESF_5and10) {
                Map<String, Object> properties = getPropertyMap(relation);
                relationModel currRel = new relationModel(object.getId(), relation.getCompany().getId(), properties);
                currRel.setType("ESF_5and10");
                edges.add(currRel);
                if (!ids.contains(relation.getCompany().getId())) {
                    ids.add(relation.getCompany().getId());
                    Nodes currNode = new Nodes();
                    Map<String, Object> properties2 = getPropertyMap(relation.getCompany());
                    currNode.setId(relation.getCompany().getId());
                    currNode.setProperties(properties2);
                    nodes.add(currNode);
                }
            }
            List<com.example.new_project_challenge_15.entity.rels.ESF_5and10> ESF_5and10a = object.getEsf5and10sOut();
            for (com.example.new_project_challenge_15.entity.rels.ESF_5and10 relation: ESF_5and10a) {
                Map<String, Object> properties = getPropertyMap(relation);
                relationModel currRel = new relationModel(object.getId(), relation.getCompany().getId(), properties);
                currRel.setType("ESF_5and10");
                edges.add(currRel);
                if (!ids.contains(relation.getCompany().getId())) {
                    ids.add(relation.getCompany().getId());
                    Nodes currNode = new Nodes();
                    Map<String, Object> properties2 = getPropertyMap(relation.getCompany());
                    currNode.setId(relation.getCompany().getId());
                    currNode.setProperties(properties2);
                    nodes.add(currNode);
                }
            }
            List<ESF_100> ESF_100 = object.getEsf100s();
            for (ESF_100 relation: ESF_100) {
                Map<String, Object> properties = getPropertyMap(relation);
                relationModel currRel = new relationModel(object.getId(), relation.getCompany().getId(), properties);
                currRel.setType("ESF_100");
                edges.add(currRel);
                if (!ids.contains(relation.getCompany().getId())) {
                    ids.add(relation.getCompany().getId());
                    Nodes currNode = new Nodes();
                    Map<String, Object> properties2 = getPropertyMap(relation.getCompany());
                    currNode.setId(relation.getCompany().getId());
                    currNode.setProperties(properties2);
                    nodes.add(currNode);
                }
            }
            List<ESF_100> ESF_10a0 = object.getEsf100sIncome();
            for (ESF_100 relation: ESF_10a0) {
                Map<String, Object> properties = getPropertyMap(relation);
                relationModel currRel = new relationModel(object.getId(), relation.getCompany().getId(), properties);
                currRel.setType("ESF_100");
                edges.add(currRel);
                if (!ids.contains(relation.getCompany().getId())) {
                    ids.add(relation.getCompany().getId());
                    Nodes currNode = new Nodes();
                    Map<String, Object> properties2 = getPropertyMap(relation.getCompany());
                    currNode.setId(relation.getCompany().getId());
                    currNode.setProperties(properties2);
                    nodes.add(currNode);
                }
            }
        }
        doubleReturn doubleReturn = new doubleReturn(nodes, edges);
        return doubleReturn;
    }


}
