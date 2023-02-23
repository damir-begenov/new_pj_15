package com.example.new_project_challenge_15.entity;

import org.springframework.data.neo4j.core.schema.*;
import org.springframework.security.core.parameters.P;

@Node("Person")
public class Persons {
    @Id
    @GeneratedValue
    private Long id;
    private String PersonID;
    @Property("Дата рождения")
    private String Data_Rozhdenya;
    @Property("Фамилия")
    private String Familia;
    @Property("Отчество")
    private String Otchestvo;
    @Property("ФИО")
    private String FIO;
    private String Source;
    private String Label;
    @Property("ИИН")
    private String IIN;
    @Property("Статус смерти")
    private String Death_Status;
    @Property("Мед. Орг.")
    private String Med_org;
    @Property("Стату Минздрав")
    private String Status_Minzdrav;
    @Property("Статус КУИС")

    private String Status_KUIS;
    @Property("Приставание в общественных местах")
    private String Pristavanie;
    @Property("Дата решения")
    private String Data_reshenya;
    @Property("Размер наложенного штрафа")
    private String Razmer_Shtrafa;
    @Property("Орган, выявивший правонарушение")
    private String Organ_pravanarushenya;
    @Property("Статья")
    private String Statya;
    @Property("Информация ПФР")
    private String PFR_Info;
    @Property("Аудитор")
    private String Autditor;
    @Property("Нотариус")
    private String Notarius;
    @Property("Адвокат")
    private String Advocat;
    @Property("Частный судебный исполнитель")
    private String Sud_ispolnitel;
    @Property("GLK")
    private String GLK;
    @Property("Пропавший без вести")
    private String Propal;
    @Property("Дата смерти:")
    private String Date_of_Death;
    @Property("RIP_date:")
    private String RIP_date;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPersonID() {
        return PersonID;
    }

    public void setPersonID(String personID) {
        PersonID = personID;
    }

    public String getData_Rozhdenya() {
        return Data_Rozhdenya;
    }

    public void setData_Rozhdenya(String data_Rozhdenya) {
        Data_Rozhdenya = data_Rozhdenya;
    }

    public String getFamilia() {
        return Familia;
    }

    public void setFamilia(String familia) {
        Familia = familia;
    }

    public String getOtchestvo() {
        return Otchestvo;
    }

    public void setOtchestvo(String otchestvo) {
        Otchestvo = otchestvo;
    }

    public String getFIO() {
        return FIO;
    }

    public void setFIO(String FIO) {
        this.FIO = FIO;
    }

    public String getSource() {
        return Source;
    }

    public void setSource(String source) {
        Source = source;
    }

    public String getLabel() {
        return Label;
    }

    public void setLabel(String label) {
        Label = label;
    }

    public String getIIN() {
        return IIN;
    }

    public void setIIN(String IIN) {
        this.IIN = IIN;
    }

    public String getDeath_Status() {
        return Death_Status;
    }

    public void setDeath_Status(String death_Status) {
        Death_Status = death_Status;
    }

    public String getMed_org() {
        return Med_org;
    }

    public void setMed_org(String med_org) {
        Med_org = med_org;
    }

    public String getStatus_Minzdrav() {
        return Status_Minzdrav;
    }

    public void setStatus_Minzdrav(String status_Minzdrav) {
        Status_Minzdrav = status_Minzdrav;
    }

    public String getStatus_KUIS() {
        return Status_KUIS;
    }

    public void setStatus_KUIS(String status_KUIS) {
        Status_KUIS = status_KUIS;
    }

    public String getPristavanie() {
        return Pristavanie;
    }

    public void setPristavanie(String pristavanie) {
        Pristavanie = pristavanie;
    }

    public String getData_reshenya() {
        return Data_reshenya;
    }

    public void setData_reshenya(String data_reshenya) {
        Data_reshenya = data_reshenya;
    }

    public String getRazmer_Shtrafa() {
        return Razmer_Shtrafa;
    }

    public void setRazmer_Shtrafa(String razmer_Shtrafa) {
        Razmer_Shtrafa = razmer_Shtrafa;
    }

    public String getOrgan_pravanarushenya() {
        return Organ_pravanarushenya;
    }

    public void setOrgan_pravanarushenya(String organ_pravanarushenya) {
        Organ_pravanarushenya = organ_pravanarushenya;
    }

    public String getStatya() {
        return Statya;
    }

    public void setStatya(String statya) {
        Statya = statya;
    }

    public String getPFR_Info() {
        return PFR_Info;
    }

    public void setPFR_Info(String PFR_Info) {
        this.PFR_Info = PFR_Info;
    }

    public String getAutditor() {
        return Autditor;
    }

    public void setAutditor(String autditor) {
        Autditor = autditor;
    }

    public String getNotarius() {
        return Notarius;
    }

    public void setNotarius(String notarius) {
        Notarius = notarius;
    }

    public String getAdvocat() {
        return Advocat;
    }

    public void setAdvocat(String advocat) {
        Advocat = advocat;
    }

    public String getSud_ispolnitel() {
        return Sud_ispolnitel;
    }

    public void setSud_ispolnitel(String sud_ispolnitel) {
        Sud_ispolnitel = sud_ispolnitel;
    }

    public String getGLK() {
        return GLK;
    }

    public void setGLK(String GLK) {
        this.GLK = GLK;
    }

    public String getPropal() {
        return Propal;
    }

    public void setPropal(String propal) {
        Propal = propal;
    }

    public String getDate_of_Death() {
        return Date_of_Death;
    }

    public void setDate_of_Death(String date_of_Death) {
        Date_of_Death = date_of_Death;
    }

    public String getRIP_date() {
        return RIP_date;
    }

    public void setRIP_date(String RIP_date) {
        this.RIP_date = RIP_date;
    }

    @Override
    public String toString() {
        return "Persons{" +
                "id=" + id +
                ", PersonID='" + PersonID + '\'' +
                ", Data_Rozhdenya='" + Data_Rozhdenya + '\'' +
                ", Familia='" + Familia + '\'' +
                ", Otchestvo='" + Otchestvo + '\'' +
                ", FIO='" + FIO + '\'' +
                ", Source='" + Source + '\'' +
                ", Label='" + Label + '\'' +
                ", IIN='" + IIN + '\'' +
                ", Death_Status='" + Death_Status + '\'' +
                ", Med_org='" + Med_org + '\'' +
                ", Status_Minzdrav='" + Status_Minzdrav + '\'' +
                ", Status_KUIS='" + Status_KUIS + '\'' +
                ", Pristavanie='" + Pristavanie + '\'' +
                ", Data_reshenya='" + Data_reshenya + '\'' +
                ", Razmer_Shtrafa='" + Razmer_Shtrafa + '\'' +
                ", Organ_pravanarushenya='" + Organ_pravanarushenya + '\'' +
                ", Statya='" + Statya + '\'' +
                ", PFR_Info='" + PFR_Info + '\'' +
                ", Autditor='" + Autditor + '\'' +
                ", Notarius='" + Notarius + '\'' +
                ", Advocat='" + Advocat + '\'' +
                ", Sud_ispolnitel='" + Sud_ispolnitel + '\'' +
                ", GLK='" + GLK + '\'' +
                ", Propal='" + Propal + '\'' +
                ", Date_of_Death='" + Date_of_Death + '\'' +
                ", RIP_date='" + RIP_date + '\'' +
                '}';
    }
}
