package com.example.new_project_challenge_15.entity.rels;

import com.example.new_project_challenge_15.entity.Persons;
import org.springframework.data.neo4j.core.schema.*;

@RelationshipProperties
@Node
public class DIRECTOR_HIST {
    @Id
    @GeneratedValue
    private Long id;
    private String Label;
    private String Source;
    @Property("Вид связи")
    private String Vid_svyaziey;
    @Property("БИН/ИИН работадателя")
    private String IINBIN_rabotadatelya;
    @Property("Дата начала")
    private String data_nachalo;
    @Property("Дата окончания")
    private String data_oconchanya;
    @Property("ИИН")
    private String IIN;
    @Property("Наименование типа должности на русском")
    private String naimenovanie_tipa_dolzhnosty;
    @TargetNode
    private Persons person;

    public Persons getPerson() {
        return person;
    }

    public void setPerson(Persons person) {
        this.person = person;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getVid_svyaziey() {
        return Vid_svyaziey;
    }

    public void setVid_svyaziey(String vid_svyaziey) {
        Vid_svyaziey = vid_svyaziey;
    }

    public String getIINBIN_rabotadatelya() {
        return IINBIN_rabotadatelya;
    }

    public void setIINBIN_rabotadatelya(String IINBIN_rabotadatelya) {
        this.IINBIN_rabotadatelya = IINBIN_rabotadatelya;
    }

    public String getData_nachalo() {
        return data_nachalo;
    }

    public void setData_nachalo(String data_nachalo) {
        this.data_nachalo = data_nachalo;
    }

    public String getData_oconchanya() {
        return data_oconchanya;
    }

    public void setData_oconchanya(String data_oconchanya) {
        this.data_oconchanya = data_oconchanya;
    }

    public String getIIN() {
        return IIN;
    }

    public void setIIN(String IIN) {
        this.IIN = IIN;
    }

    public String getNaimenovanie_tipa_dolzhnosty() {
        return naimenovanie_tipa_dolzhnosty;
    }

    public void setNaimenovanie_tipa_dolzhnosty(String naimenovanie_tipa_dolzhnosty) {
        this.naimenovanie_tipa_dolzhnosty = naimenovanie_tipa_dolzhnosty;
    }
}
