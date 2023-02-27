package com.example.new_project_challenge_15.entity;

import com.example.new_project_challenge_15.entity.rels.*;
import org.springframework.data.neo4j.core.schema.*;

import java.util.List;

@Node("COMPANY")
public class Company extends Nodee{
//    @Id
//    @GeneratedValue
//    private Long id;
    private String PersonID;
    @Property("ИИН/БИН")
    private String IINBIN;
    @Property("Тип")
    private String Type;
    private String Label;
    @Property("Наименование")
    private String Name;
    private String Source;
    @Property("Бухгалтер")
    private String Buhgalter;
    @Property("НДС")
    private String NDS;
    @Property("Приказ о снятии с регистрационного учета")
    private String PRIKAZ_O_SNYATYA;
    @Property("Бездействующие ЮЛ")
    private String BEZDEYSTVIA_UL;
    @Property("Статус ОПГ")
    private String STATUS_OPG;
    @Property("Блок ЭСФ")
    private String BLOCK_ESF;
    @Property("Статья ЕРДР")
    private String STATYA_ERDR;
    @Property("Статус ЕРДР")
    private String STATUS_ERDR;
    @Property("Орган регистрации")
    private String ORGAN_REGISTER;
    @Property("ФПГ")
    private String FPG;
    @Property("Направлено в")
    private String Napravlenio_V;
    @Property("Лицензия")
    private String License;
    @Property("Статус участника МФЦА")
    private String Status_Uchastnika_MFCA;
    @Property("Номер сделки")
    private String Nomer_sdelki;
    @Property("Уникальный ID сделки")
    private String Unique_id;
    @Relationship(type="DFO_AFF_UL", direction = Relationship.Direction.OUTGOING)
    private List<DFO_AFF_UL> dfo_aff_ul;
    @Relationship(type="DIRECTOR_CUR", direction = Relationship.Direction.OUTGOING)
    private List<DIRECTOR_CUR> directorCur;
    @Relationship(type="DIRECTOR_HIST", direction = Relationship.Direction.OUTGOING)
    private List<DIRECTOR_HIST> directorHist;
    @Relationship(type="ESF_100", direction = Relationship.Direction.OUTGOING)
    private List<ESF_100> esf100;

    @Relationship(type="ESF_10and100", direction = Relationship.Direction.OUTGOING)
    private List<ESF_10and100> esf_10and100;

    @Relationship(type = "ESF_10and50", direction = Relationship.Direction.OUTGOING)
    private List<ESF_10and50> esf10and50s;

    @Relationship(type = "ESF_50and100", direction = Relationship.Direction.OUTGOING)
    private List<ESF_50and100> esf50and100s;
    @Relationship(type = "ESF_5and10", direction = Relationship.Direction.OUTGOING)
    private List<ESF_5and10> esf5and10s;

    @Relationship(type = "FOUNDER_CUR", direction = Relationship.Direction.OUTGOING)
    private List<FOUNDER_CUR> founderCurs;

//    @Relationship(type = "FOUNDER_CUR_TP", direction = Relationship.Direction.OUTGOING)
//    private List<FOUNDER_CUR_TP> founderCurTps;
//
//    public List<FOUNDER_CUR_TP> getFounderCurTps() {
//        return founderCurTps;
//    }
//
//    public void setFounderCurTps(List<FOUNDER_CUR_TP> founderCurTps) {
//        this.founderCurTps = founderCurTps;
//    }

    public List<FOUNDER_CUR> getFounderCurs() {
        return founderCurs;
    }

    public void setFounderCurs(List<FOUNDER_CUR> founderCurs) {
        this.founderCurs = founderCurs;
    }

    public void setEsf5and10s(List<ESF_5and10> esf5and10s) {
        this.esf5and10s = esf5and10s;
    }

    public List<ESF_5and10> getEsf5and10s() {
        return esf5and10s;
    }


    public void setEsf50and100s(List<ESF_50and100> esf50and100s) {
        this.esf50and100s = esf50and100s;
    }

    public List<ESF_50and100> getEsf50and100s() {
        return esf50and100s;
    }

    public List<ESF_10and50> getEsf10and50s() {
        return esf10and50s;
    }

    public void setEsf10and50s(List<ESF_10and50> esf10and50s) {
        this.esf10and50s = esf10and50s;
    }

    public List<ESF_10and100> getEsf_10and100() {
        return esf_10and100;
    }

    public void setEsf_10and100(List<ESF_10and100> esf_10and100) {
        this.esf_10and100 = esf_10and100;
    }

    public List<ESF_100> getEsf100() {
        return esf100;
    }

    public void setEsf100(List<ESF_100> esf100) {
        this.esf100 = esf100;
    }

    public List<DIRECTOR_HIST> getDirectorHist() {
        return directorHist;
    }

    public void setDirectorHist(List<DIRECTOR_HIST> directorHist) {
        this.directorHist = directorHist;
    }

    public String getPersonID() {
        return PersonID;
    }

    public void setPersonID(String personID) {
        PersonID = personID;
    }

    public List<DIRECTOR_CUR> getDirectorCur() {
        return directorCur;
    }

    public void setDirectorCur(List<DIRECTOR_CUR> directorCur) {
        this.directorCur = directorCur;
    }

    public List<DFO_AFF_UL> getDfo_aff_ul() {
        return dfo_aff_ul;
    }

    public void setDfo_aff_ul(List<DFO_AFF_UL> dfo_aff_ul) {
        this.dfo_aff_ul = dfo_aff_ul;
    }

//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }

    public String getIINBIN() {
        return IINBIN;
    }

    public void setIINBIN(String IINBIN) {
        this.IINBIN = IINBIN;
    }

    public String getType() {
        return Type;
    }

    public void setType(String type) {
        Type = type;
    }

    public String getLabel() {
        return Label;
    }

    public void setLabel(String label) {
        Label = label;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getSource() {
        return Source;
    }

    public void setSource(String source) {
        Source = source;
    }

    public String getBuhgalter() {
        return Buhgalter;
    }

    public void setBuhgalter(String buhgalter) {
        Buhgalter = buhgalter;
    }

    public String getNDS() {
        return NDS;
    }

    public void setNDS(String NDS) {
        this.NDS = NDS;
    }

    public String getPRIKAZ_O_SNYATYA() {
        return PRIKAZ_O_SNYATYA;
    }

    public void setPRIKAZ_O_SNYATYA(String PRIKAZ_O_SNYATYA) {
        this.PRIKAZ_O_SNYATYA = PRIKAZ_O_SNYATYA;
    }

    public String getBEZDEYSTVIA_UL() {
        return BEZDEYSTVIA_UL;
    }

    public void setBEZDEYSTVIA_UL(String BEZDEYSTVIA_UL) {
        this.BEZDEYSTVIA_UL = BEZDEYSTVIA_UL;
    }

    public String getSTATUS_OPG() {
        return STATUS_OPG;
    }

    public void setSTATUS_OPG(String STATUS_OPG) {
        this.STATUS_OPG = STATUS_OPG;
    }

    public String getBLOCK_ESF() {
        return BLOCK_ESF;
    }

    public void setBLOCK_ESF(String BLOCK_ESF) {
        this.BLOCK_ESF = BLOCK_ESF;
    }

    public String getSTATYA_ERDR() {
        return STATYA_ERDR;
    }

    public void setSTATYA_ERDR(String STATYA_ERDR) {
        this.STATYA_ERDR = STATYA_ERDR;
    }

    public String getSTATUS_ERDR() {
        return STATUS_ERDR;
    }

    public void setSTATUS_ERDR(String STATUS_ERDR) {
        this.STATUS_ERDR = STATUS_ERDR;
    }

    public String getORGAN_REGISTER() {
        return ORGAN_REGISTER;
    }

    public void setORGAN_REGISTER(String ORGAN_REGISTER) {
        this.ORGAN_REGISTER = ORGAN_REGISTER;
    }

    public String getFPG() {
        return FPG;
    }

    public void setFPG(String FPG) {
        this.FPG = FPG;
    }

    public String getNapravlenio_V() {
        return Napravlenio_V;
    }

    public void setNapravlenio_V(String napravlenio_V) {
        Napravlenio_V = napravlenio_V;
    }

    public String getLicense() {
        return License;
    }

    public void setLicense(String license) {
        License = license;
    }

    public String getStatus_Uchastnika_MFCA() {
        return Status_Uchastnika_MFCA;
    }

    public void setStatus_Uchastnika_MFCA(String status_Uchastnika_MFCA) {
        Status_Uchastnika_MFCA = status_Uchastnika_MFCA;
    }

    public String getNomer_sdelki() {
        return Nomer_sdelki;
    }

    public void setNomer_sdelki(String nomer_sdelki) {
        Nomer_sdelki = nomer_sdelki;
    }

    public String getUnique_id() {
        return Unique_id;
    }

    public void setUnique_id(String unique_id) {
        Unique_id = unique_id;
    }

}
