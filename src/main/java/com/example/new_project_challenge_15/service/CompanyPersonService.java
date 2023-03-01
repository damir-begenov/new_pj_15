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
public class CompanyPersonService {

    @Autowired
    newPersonService personRepo;

    @Autowired
    newCompanyRepo companyRepo;
    @Autowired

    newPhotoService newPhotoService;

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

//    private List<propertiesModel> collectPerosonProperties(Persons person) {
//        List<propertiesModel> properties = new ArrayList<>();
//        propertiesModel property = new propertiesModel();
//        property.setName("PersonID");
//        property.setValue(person.getPersonID());
//        properties.add(property);
//        property.setName("Data_birth");
//        property.setValue(person.getData_reshenya());
//        properties.add(property);
//        property.setName("Familia");
//        property.setValue(person.getFamilia());
//        properties.add(property);
//        property.setName("Orchestvo");
//        property.setValue(person.getOtchestvo());
//        properties.add(property);
//        property.setName("FIO");
//        property.setValue(person.getFIO());
//        properties.add(property);
//        property.setName("Source");
//        property.setValue(person.getSource());
//        properties.add(property);
//        property.setName("Label");
//        property.setValue(person.getLabel());
//        properties.add(property);
//        property.setName("IIN");
//        property.setValue(person.getIIN());
//        properties.add(property);
//        property.setName("Status_death");
//        property.setValue(person.getDeath_Status());
//        properties.add(property);
//        property.setName("MedOrg");
//        property.setValue(person.getMed_org());
//        properties.add(property);
//        property.setName("Status_Minzdrav");
//        property.setValue(person.getStatus_Minzdrav());
//        properties.add(property);
//        property.setName("Status_KUIS");
//        property.setValue(person.getStatus_KUIS());
//        properties.add(property);
//        property.setName("Pristavanie");
//        property.setValue(person.getPristavanie());
//        properties.add(property);
//        property.setName("Data_reshenya");
//        property.setValue(person.getData_reshenya());
//        properties.add(property);
//        property.setName("Razmer_Shtrafa");
//        property.setValue(person.getRazmer_Shtrafa());
//        properties.add(property);
//        property.setName("Organ_pravanarushenya");
//        property.setValue(person.getOrgan_pravanarushenya());
//        properties.add(property);
//        property.setName("");
//        property.setValue();
//        properties.add(property);
//        property.setName();
//        property.setValue();
//        properties.add(property);
//        property.setName();
//        property.setValue();
//        properties.add(property);
//        property.setName();
//        property.setValue();
//        properties.add(property);
//        property.setName();
//        property.setValue();
//        properties.add(property);
//        property.setName();
//        property.setValue();
//        properties.add(property);
//        property.setName();
//        property.setValue();
//        properties.add(property);
//    }

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
            List<com.example.new_project_challenge_15.entity.rels.FPG> FPG = object.getFpgs();
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
            for (ESF_5and10 relation: ESF_5and10) {
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
        }
        for (Persons object: personsList) {
            if (!ids.contains(object.getId())) {
                ids.add(object.getId());
                Nodes currNode = new Nodes();
                Map<String, Object> properties = getPropertyMap(object);
                currNode.setId(object.getId());
                currNode.setPhotoDbf(newPhotoService.getPhotoByIIN(object.getIIN()));
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
            for (ESF_5and10 relation: ESF_5and10) {
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
        }
        doubleReturn doubleReturn = new doubleReturn(nodes, edges);
        return doubleReturn;
    }

    public doubleReturn Test() {
        List<Persons> personsList = personRepo.getPersons();
        List<Company> companies = companyRepo.getCompany();
        doubleReturn doubleReturn = ConstructDoubleReturn(personsList, companies);
        return doubleReturn;
    }
}
