package com.example.new_project_challenge_15.entity.rels;

import com.example.new_project_challenge_15.entity.Persons;
import org.springframework.data.neo4j.core.schema.*;

@RelationshipProperties
@Node
public class SUDIM {
    @Id
    @GeneratedValue
    public Long id;
    public String Label;
    public String Source;
    @Property("Вид связи")
    public String Vid_svyaziey;
    @Property("Дата начала заключения")
    public String data_nachalo;
    @Property("Дата конца заключения")
    public String data_konca;
    @Property("Статья")
    public String statya;
    @TargetNode
    private Persons person;

    public String getData_nachalo() {
        return data_nachalo;
    }

    public void setData_nachalo(String data_nachalo) {
        this.data_nachalo = data_nachalo;
    }

    public String getData_konca() {
        return data_konca;
    }

    public void setData_konca(String data_konca) {
        this.data_konca = data_konca;
    }

    public String getStatya() {
        return statya;
    }

    public void setStatya(String statya) {
        this.statya = statya;
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

    public Persons getPerson() {
        return person;
    }

    public void setPerson(Persons person) {
        this.person = person;
    }
}
