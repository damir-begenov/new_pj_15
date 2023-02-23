package com.example.new_project_challenge_15.entity;

import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Property;

@Node("Address")
public class Address {
    @Id
    @GeneratedValue
    private Long id;
    private String PersonID;
    @Property("Код страны")
    private String Kod_Strani;

    @Property("Код области")
    private String Kod_oblasti;
    @Property("Код района")
    private String Kod_rayona;
    @Property("РКА")

    private String PKA;
    private String Label;
    private String Source;
    @Property("Адрес прописки")

    private String Adress_propiski;
    @Property("Город")

    private String Gorod;
    @Property("Улица")

    private String Ulica;
    @Property("Строение")

    private String Stroenie;
    @Property("Корпус")

    private String Korpus;
    @Property("Область")

    private String Oblast;
    @Property("Район")

    private String Rayon;
    @Property("Тип адреса")

    private String Type_adresa;
    @Property("Квартира")

    private String Kvartira;
    @Property("IP адрес")

    private String IP_address;
    @Property("Дом")

    private String Dom;
    @Property("Населенный пункт")

    private String Naselenni_punct;
    @Property("Участок")

    private String Uchastok;
    @Property("Доп. 1")

    private String Dop_1;
    @Property("Доп. 3")

    private String Dop_3;
    @Property("Кадастровый номер")

    private String Kadastr_nomer;
    @Property("Описание")

    private String Opisanie;
    @Property("Тип строения")

    private String type_stroenie;
    @Property("Доп. 2")

    private String Dop_2;


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

    public String getKod_Strani() {
        return Kod_Strani;
    }

    public void setKod_Strani(String kod_Strani) {
        Kod_Strani = kod_Strani;
    }

    public String getKod_oblasti() {
        return Kod_oblasti;
    }

    public void setKod_oblasti(String kod_oblasti) {
        Kod_oblasti = kod_oblasti;
    }

    public String getKod_rayona() {
        return Kod_rayona;
    }

    public void setKod_rayona(String kod_rayona) {
        Kod_rayona = kod_rayona;
    }

    public String getPKA() {
        return PKA;
    }

    public void setPKA(String PKA) {
        this.PKA = PKA;
    }

    public String getLabel() {
        return Label;
    }

    public void setLabel(String label) {
        Label = label;
    }

    public String getSource() {
        return Source;
    }

    public void setSource(String source) {
        Source = source;
    }

    public String getAdress_propiski() {
        return Adress_propiski;
    }

    public void setAdress_propiski(String adress_propiski) {
        Adress_propiski = adress_propiski;
    }

    public String getGorod() {
        return Gorod;
    }

    public void setGorod(String gorod) {
        Gorod = gorod;
    }

    public String getUlica() {
        return Ulica;
    }

    public void setUlica(String ulica) {
        Ulica = ulica;
    }

    public String getStroenie() {
        return Stroenie;
    }

    public void setStroenie(String stroenie) {
        Stroenie = stroenie;
    }

    public String getKorpus() {
        return Korpus;
    }

    public void setKorpus(String korpus) {
        Korpus = korpus;
    }

    public String getOblast() {
        return Oblast;
    }

    public void setOblast(String oblast) {
        Oblast = oblast;
    }

    public String getRayon() {
        return Rayon;
    }

    public void setRayon(String rayon) {
        Rayon = rayon;
    }

    public String getType_adresa() {
        return Type_adresa;
    }

    public void setType_adresa(String type_adresa) {
        Type_adresa = type_adresa;
    }

    public String getKvartira() {
        return Kvartira;
    }

    public void setKvartira(String kvartira) {
        Kvartira = kvartira;
    }

    public String getIP_address() {
        return IP_address;
    }

    public void setIP_address(String IP_address) {
        this.IP_address = IP_address;
    }

    public String getDom() {
        return Dom;
    }

    public void setDom(String dom) {
        Dom = dom;
    }

    public String getNaselenni_punct() {
        return Naselenni_punct;
    }

    public void setNaselenni_punct(String naselenni_punct) {
        Naselenni_punct = naselenni_punct;
    }

    public String getUchastok() {
        return Uchastok;
    }

    public void setUchastok(String uchastok) {
        Uchastok = uchastok;
    }

    public String getDop_1() {
        return Dop_1;
    }

    public void setDop_1(String dop_1) {
        Dop_1 = dop_1;
    }

    public String getDop_3() {
        return Dop_3;
    }

    public void setDop_3(String dop_3) {
        Dop_3 = dop_3;
    }

    public String getKadastr_nomer() {
        return Kadastr_nomer;
    }

    public void setKadastr_nomer(String kadastr_nomer) {
        Kadastr_nomer = kadastr_nomer;
    }

    public String getOpisanie() {
        return Opisanie;
    }

    public void setOpisanie(String opisanie) {
        Opisanie = opisanie;
    }

    public String getType_stroenie() {
        return type_stroenie;
    }

    public void setType_stroenie(String type_stroenie) {
        this.type_stroenie = type_stroenie;
    }

    public String getDop_2() {
        return Dop_2;
    }

    public void setDop_2(String dop_2) {
        Dop_2 = dop_2;
    }

    @Override
    public String toString() {
        return "Address{" +
                "id=" + id +
                ", PersonID='" + PersonID + '\'' +
                ", Kod_Strani='" + Kod_Strani + '\'' +
                ", Kod_oblasti='" + Kod_oblasti + '\'' +
                ", Kod_rayona='" + Kod_rayona + '\'' +
                ", PKA='" + PKA + '\'' +
                ", Label='" + Label + '\'' +
                ", Source='" + Source + '\'' +
                ", Adress_propiski='" + Adress_propiski + '\'' +
                ", Gorod='" + Gorod + '\'' +
                ", Ulica='" + Ulica + '\'' +
                ", Stroenie='" + Stroenie + '\'' +
                ", Korpus='" + Korpus + '\'' +
                ", Oblast='" + Oblast + '\'' +
                ", Rayon='" + Rayon + '\'' +
                ", Type_adresa='" + Type_adresa + '\'' +
                ", Kvartira='" + Kvartira + '\'' +
                ", IP_address='" + IP_address + '\'' +
                ", Dom='" + Dom + '\'' +
                ", Naselenni_punct='" + Naselenni_punct + '\'' +
                ", Uchastok='" + Uchastok + '\'' +
                ", Dop_1='" + Dop_1 + '\'' +
                ", Dop_3='" + Dop_3 + '\'' +
                ", Kadastr_nomer='" + Kadastr_nomer + '\'' +
                ", Opisanie='" + Opisanie + '\'' +
                ", type_stroenie='" + type_stroenie + '\'' +
                ", Dop_2='" + Dop_2 + '\'' +
                '}';
    }
}
